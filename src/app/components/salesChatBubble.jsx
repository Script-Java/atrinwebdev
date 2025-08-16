'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SalesChatBubble() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [unread, setUnread] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [msgs, setMsgs] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('salesbot_msgs');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [
      { role: 'assistant', content: "Hey! I’m your AI sales assistant. Ask about pricing, timelines, or how we can help—happy to guide you." }
    ];
  });

  // ---- Lead capture state ----
  const [lead, setLead] = useState({ name: '', email: '', phone: '', message: '' });
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [awaitingConsent, setAwaitingConsent] = useState(false);

  // Simple validators
  const emailRe = /([a-z0-9._%+-]+)@([a-z0-9.-]+)\.([a-z]{2,})/i;
  const phoneRe = /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/;
  const nameHintRe = /\b(?:i am|i’m|im|my name is)\s+([A-Za-z][\w\s.'-]{1,40})/i;

  function normalizePhoneUS(s = '') {
    const digits = (s.match(/\d/g) || []).join('');
    if (digits.length === 10) return `+1${digits}`;
    if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
    return s.trim();
  }

  function extractLeadFields(text) {
    return {
      email: text.match(emailRe)?.[0] || '',
      phone: text.match(phoneRe)?.[0] || '',
      name: text.match(nameHintRe)?.[1]?.trim() || ''
    };
  }

  async function sendLeadToEmail({ name, email, phone, message }) {
    const meta = {
      path: typeof window !== 'undefined' ? window.location.pathname : '',
      ua: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    };
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message, source: 'chat-bubble', meta, company: '' }) // honeypot empty
    });
    const j = await res.json();
    return j?.ok === true;
  }

  // ---- UI helpers ----
  const cloudMessages = ['💬 Got questions?', '🚀 Need a quick quote?', '📈 Want more leads?', '🕐 We reply fast'];
  const [cloudIndex, setCloudIndex] = useState(0);
  const inputRef = useRef(null);

  // Auto-scroll refs
  const messagesWrapRef = useRef(null);
  const messagesEndRef = useRef(null);
  const scrollToBottom = (smooth = true) => {
    // use the marker if available
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
      return;
    }
    // fallback: scroll the container itself
    if (messagesWrapRef.current) {
      messagesWrapRef.current.scrollTop = messagesWrapRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    try { localStorage.setItem('salesbot_msgs', JSON.stringify(msgs)); } catch {}
  }, [msgs]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom(false); // jump to bottom on open
      }, 50);
    }
  }, [open]);

  useEffect(() => {
    if (open) return;
    const id = setInterval(() => setCloudIndex(i => (i + 1) % cloudMessages.length), 3000);
    return () => clearInterval(id);
  }, [open]);

  // Auto-scroll whenever messages, busy, or form visibility changes
  useEffect(() => {
    if (open) scrollToBottom(true);
  }, [msgs, busy, showLeadForm, open]);

  async function sendMessage(e) {
    e?.preventDefault?.();
    const q = input.trim();
    if (!q || busy) return;

    // append user msg
    setMsgs(m => [...m, { role: 'user', content: q }]);
    setInput('');
    // quick scroll after adding your own message
    setTimeout(() => scrollToBottom(true), 0);

    // Try to extract lead fields from the message
    const found = extractLeadFields(q);
    const draft = { ...lead };
    if (found.name && !draft.name) draft.name = found.name;
    if (found.email && !draft.email) draft.email = found.email.toLowerCase();
    if (found.phone && !draft.phone) draft.phone = normalizePhoneUS(found.phone);
    setLead(draft);

    // If we captured something but still missing fields, ask for the rest
    const missing = ['name', 'email', 'phone'].filter(k => !draft[k]);
    if ((found.name || found.email || found.phone) && missing.length) {
      setMsgs(m => [...m, { role: 'assistant', content: `Thanks! Got ${found.name ? 'name' : ''}${found.name && (found.email||found.phone) ? ', ' : ''}${found.email ? 'email' : ''}${found.email && found.phone ? ', ' : ''}${found.phone ? 'phone' : ''}. Could I also get your ${missing.join(' & ')} to complete your request?` }]);
      return;
    }

    // If we have all fields and haven't asked yet, ask for consent to send
    if (draft.name && draft.email && draft.phone && !awaitingConsent) {
      setAwaitingConsent(true);
      setMsgs(m => [...m, { role: 'assistant', content: `Perfect — I have Name: ${draft.name}, Email: ${draft.email}, Phone: ${draft.phone}. Want me to send this to our team so we can follow up? Reply "yes" to confirm.` }]);
      return;
    }

    // Otherwise, proceed with normal AI reply
    setBusy(true);
    try {
      const r = await fetch('/api/salesbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, history })
      });
      const data = await r.json();
      const reply = data?.reply || 'Sorry, something went wrong.';
      setMsgs(m => [...m, { role: 'assistant', content: reply }]);
      setHistory(h => [...h, { role: 'user', content: q }, { role: 'assistant', content: reply }]);
      if (!open) setUnread(true);
    } catch {
      setMsgs(m => [...m, { role: 'assistant', content: 'Network hiccup—mind asking once more?' }]);
    } finally {
      setBusy(false);
    }
  }

  // Listen for "yes" after consent prompt
  useEffect(() => {
    if (!awaitingConsent) return;
    const last = msgs[msgs.length - 1];
    if (!last || last.role !== 'user') return;
    const text = last.content.trim().toLowerCase();
    const positives = ['yes','y','sure','ok','okay','please do','confirm','go ahead'];
    if (positives.includes(text)) {
      (async () => {
        const success = await sendLeadToEmail(lead);
        setAwaitingConsent(false);
        setMsgs(m => [...m, {
          role: 'assistant',
          content: success
            ? "Got it — your details are in our inbox. We’ll follow up shortly. Want a quick estimate while you’re here?"
            : "Thanks! I couldn’t submit that automatically just now. You can try again or use the ‘Leave details’ form below."
        }]);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgs, awaitingConsent]);

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) sendMessage(e);
  }

  function clearChat() {
    const initialMsg = { role: 'assistant', content: "Hey! I’m your AI sales assistant. Ask about pricing, timelines, or how we can help—happy to guide you." };
    setMsgs([initialMsg]);
    setHistory([]);
    setLead({ name: '', email: '', phone: '', message: '' });
    setAwaitingConsent(false);
    try { localStorage.removeItem('salesbot_msgs'); } catch {}
    // ensure the cleared view is at bottom (i.e., shows the greeting)
    setTimeout(() => scrollToBottom(false), 0);
  }

  const cloudVariants = {
    hidden: { y: 8, scale: 0.96, opacity: 0 },
    visible: { y: 0, scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 26 } },
    exit: { y: 8, scale: 0.98, opacity: 0, transition: { duration: 0.18 } }
  };

  const panelVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 26 } },
    exit: { y: 12, opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
      {/* Chat bubble + cloud */}
      <div className="fixed z-[60] bottom-5 right-5 flex flex-col items-end gap-2 pointer-events-none">
        {/* Cloud above bubble */}
        <AnimatePresence>
          {!open && (
            <motion.button
              key="speech-cloud"
              type="button"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cloudVariants}
              onClick={() => setOpen(true)}
              className="pointer-events-auto relative max-w-[260px] bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-50 px-4 py-2 rounded-2xl shadow-lg border border-black/10 dark:border-white/10 text-sm font-medium"
            >
              {cloudMessages[cloudIndex]}
              <span className="absolute -bottom-2 right-6 w-3 h-3 bg-white dark:bg-neutral-900 rotate-45 border-b border-r border-black/10 dark:border-white/10" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Round chat bubble button */}
        <motion.button
          onClick={() => setOpen(o => !o)}
          className="pointer-events-auto relative h-16 w-16 flex items-center justify-center rounded-full text-white shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300/40
                     bg-[radial-gradient(120%_120%_at_30%_30%,#8b5cf6_0%,#2563eb_45%,#0ea5e9_100%)]"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Chat icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4.5 1.3 1.3-4.5A7.92 7.92 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" />
          </svg>

          {/* Unread badge */}
          <AnimatePresence>
            {unread && (
              <motion.span
                key="unread"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-rose-500 ring-2 ring-white"
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            className="fixed z-[60] bottom-24 right-5 w-[360px] max-w-[92vw] h-[560px] bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-100 rounded-2xl shadow-2xl border border-black/10 dark:border-white/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 text-white flex items-center justify-between">
              <div className="font-semibold">Chat with us</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowLeadForm(v => !v)}
                  className="text-xs bg-white/20 px-2 py-1 rounded-lg hover:bg-white/30"
                >
                  {showLeadForm ? 'Hide form' : 'Leave details'}
                </button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearChat}
                  className="text-xs bg-white/20 px-2 py-1 rounded-lg hover:bg-white/30"
                >
                  Clear
                </motion.button>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="opacity-90 hover:opacity-100"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div ref={messagesWrapRef} className="flex-1 overflow-y-auto p-3 space-y-2">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className={m.role === 'user' ? 'text-right' : 'text-left'}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800'
                    }`}
                  >
                    {m.content}
                  </span>
                </motion.div>
              ))}
              {busy && <div className="text-xs opacity-70">Thinking…</div>}
              {/* auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Lead mini-form (collapsible) */}
            {showLeadForm && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!lead.name || !emailRe.test(lead.email)) {
                    setMsgs(m => [...m, { role: 'assistant', content: 'Please add your name and a valid email so we can follow up.' }]);
                    return;
                  }
                  const success = await sendLeadToEmail({ ...lead, phone: normalizePhoneUS(lead.phone) });
                  setMsgs(m => [...m, {
                    role: 'assistant',
                    content: success
                      ? "Thanks — your details are in our inbox. We’ll reach out shortly!"
                      : "Hmm, couldn’t submit right now. Mind trying again in a moment?"
                  }]);
                  if (success) setShowLeadForm(false);
                }}
                className="px-3 pb-2 space-y-2 border-t border-black/10 dark:border-white/10"
              >
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <input className="border rounded px-2 py-2 bg-white dark:bg-neutral-900" placeholder="Full name" value={lead.name} onChange={e => setLead(l => ({ ...l, name: e.target.value }))} />
                  <input className="border rounded px-2 py-2 bg-white dark:bg-neutral-900" placeholder="Email" value={lead.email} onChange={e => setLead(l => ({ ...l, email: e.target.value }))} />
                  <input className="border rounded px-2 py-2 bg-white dark:bg-neutral-900" placeholder="Phone (optional)" value={lead.phone} onChange={e => setLead(l => ({ ...l, phone: e.target.value }))} />
                  <input className="border rounded px-2 py-2 col-span-2 bg-white dark:bg-neutral-900" placeholder="What do you need?" value={lead.message} onChange={e => setLead(l => ({ ...l, message: e.target.value }))} />
                </div>
                <div className="flex justify-end">
                  <button className="px-3 py-2 rounded bg-black text-white">Send</button>
                </div>
              </form>
            )}

            {/* Input */}
            <form onSubmit={sendMessage} className="p-3 border-t border-black/10 dark:border-white/10">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type your question..."
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-900"
                />
                <motion.button
                  type="submit"
                  disabled={busy || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl text-white disabled:opacity-50 shadow-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                >
                  Send
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
