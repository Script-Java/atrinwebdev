// pages/api/salesbot.js — EDGE RUNTIME (serverless)
export const config = { runtime: 'edge' };

/* ---------------- TF-IDF-ish retrieval ---------------- */
function tokenize(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
}
function buildIndex(docs) {
  const N = docs.length;
  const df = new Map();
  const tokensByDoc = docs.map(d => tokenize(d.text || ''));
  tokensByDoc.forEach(tokens => {
    const u = Array.from(new Set(tokens));
    u.forEach(t => df.set(t, (df.get(t) || 0) + 1));
  });
  const idf = (t) => Math.log(1 + N / ((df.get(t) || 0) + 1));
  const vectors = tokensByDoc.map(tokens => {
    const tf = new Map();
    tokens.forEach(t => tf.set(t, (tf.get(t) || 0) + 1));
    const vec = new Map();
    tf.forEach((c, t) => vec.set(t, c * idf(t)));
    let norm = 0;
    vec.forEach(v => { norm += v * v; });
    return { vec, norm: Math.sqrt(norm) || 1 };
  });
  return { vectors, df, N };
}
function cosine(a, b) {
  let dot = 0;
  a.forEach((av, k) => { const bv = b.get(k); if (bv) dot += av * bv; });
  return dot;
}
function topK(docs, index, query, k = 4) {
  const qtoks = tokenize(query);
  if (!qtoks.length || !index?.vectors?.length) return [];
  const qvec = new Map();
  qtoks.forEach(t => {
    const w = Math.log(1 + index.N / ((index.df.get(t) || 0) + 1));
    qvec.set(t, (qvec.get(t) || 0) + w);
  });
  let qn = 0; qvec.forEach(v => { qn += v * v; }); qn = Math.sqrt(qn) || 1;

  const scored = index.vectors.map((dv, i) => {
    const sim = cosine(qvec, dv.vec) / (qn * (dv.norm || 1));
    return { i, sim };
  });
  scored.sort((a, b) => b.sim - a.sim);
  return scored.slice(0, k).map(s => docs[s.i]);
}

/* ---------------- Utilities ---------------- */
async function fetchKB(origin) {
  const url = `${origin.replace(/\/+$/,'')}/business_kb.json`;
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) throw new Error(`KB fetch failed: ${r.status}`);
  const data = await r.json();
  if (!Array.isArray(data)) throw new Error('KB not an array');
  return data;
}

async function llmCall(messages) {
  const base  = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
  const key   = process.env.GROQ_API_KEY || '';
  const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
  if (!key) throw new Error('Missing GROQ_API_KEY');

  const resp = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
      max_tokens: 600,
    }),
  });
  if (!resp.ok) throw new Error(await resp.text());
  const data = await resp.json();
  return data?.choices?.[0]?.message?.content?.trim() || '';
}

/* ---------------- Handler ---------------- */
export default async function handler(req) {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Use POST' }), { status: 405, headers: { 'content-type': 'application/json' } });
    }

    const body = await req.json().catch(() => ({}));
    const question = typeof body?.question === 'string' ? body.question : '';
    const userHistory = Array.isArray(body?.history) ? body.history : [];

    if (!question) {
      return new Response(JSON.stringify({ error: 'Missing question' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    // Derive origin robustly in Edge
    const url = new URL(req.url);
    const origin = `${url.protocol}//${url.host}`;

    // Fetch KB & build context
    let kb = [];
    try { kb = await fetchKB(origin); } catch (e) { /* fall back to empty context */ }
    const idx = kb.length ? buildIndex(kb) : null;
    const ctxDocs = kb.length ? topK(kb, idx, question, 4) : [];
    const context = ctxDocs.map(d => `(${d.title}) ${d.text}`).join('\n\n');

    /* -------- Policy: lead capture + no guessing -------- */
    const policy = `
POLICIES (follow strictly):
- You cannot collect or save personal details from chat. If a user wants to share contact info, instruct them to click the “Leave details” button and submit the form.
- Do not infer or guess facts not in the context. If the knowledge base doesn’t include an answer, say you don’t have that information and offer next steps (book a discovery call or click “Leave details”).
- Keep responses concise (4–8 sentences) and include ONE clear CTA (e.g., “Click **Leave details** to share your info” or “Book a free consult”).
- If the user types contact info, remind them that for privacy and accuracy, they must use the “Leave details” form.
`.trim();

    const system = `
You are a concise, trustworthy AI SALES ASSISTANT for **AtrinWebDev**, a Texas-based web/SEO agency.
Tone: friendly, confident, outcome-focused, low-jargon.

${policy}

Use only the CONTEXT below. If something isn’t in context, say you don’t know and propose next steps.

CONTEXT:
${context || '(no relevant context matched)'}
`.trim();

    // Trim history to last few turns to avoid prompt bloat / injection
    const safeHistory = userHistory
      .filter(m => m && typeof m.role === 'string' && typeof m.content === 'string')
      .slice(-8);

    const messages = [
      { role: 'system', content: system },
      ...safeHistory,
      { role: 'user', content: question }
    ];

    // If no context found, gently bias the reply
    if (!context) {
      messages.push({
        role: 'system',
        content: 'No matching context was found. Politely say you do not have that information and suggest clicking “Leave details” or booking a discovery call.'
      });
    }

    const reply = await llmCall(messages);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}
