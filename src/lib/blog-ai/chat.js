// lib/ai/chat.js
export async function chat(messages, {
  model = process.env.GROQ_MODEL,
  temperature = 0.7,
} = {}) {
  const res = await fetch(`${process.env.GROQ_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({ model, temperature, messages }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Groq API error ${res.status}: ${t}`);
  }
  const json = await res.json();
  return json.choices?.[0]?.message?.content?.trim() || "";
}
