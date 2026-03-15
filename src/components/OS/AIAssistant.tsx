"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Cpu, Send, Sparkles, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Role = 'user' | 'ai';
interface Msg { role: Role; text: string; typing?: boolean }

// ── Knowledge Base ───────────────────────────────────────────────────────
const KB: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/\b(who|about|introduc|tell me|yourself)\b/i],
    answer: `I'm Purbashis Behera — a Software Engineer specialised in **LLMs, RAG systems, and distributed AI**. I have 2+ years of experience building production-grade AI applications — from system design to AWS deployment. My core focus is making language models reliable, scalable, and actually useful in the real world.`,
  },
  {
    patterns: [/\b(rag|retriev|augment|retrieval.augmented|knowledge.base|document.search)\b/i],
    answer: `My RAG architecture uses a **hybrid retrieval strategy** — combining dense semantic search (FAISS + sentence-transformers) with sparse BM25 retrieval, fused using a weighted interpolation. This reduces hallucinations by ~35%. The pipeline runs on FastAPI and handles chunking → embedding → indexing → retrieval → generation end-to-end, deployed on AWS with CI/CD.`,
  },
  {
    patterns: [/\b(project|built|made|work|develop|creat)\b/i],
    answer: `My 3 flagship projects:\n\n1. **Enterprise RAG Knowledge Assistant** — LangChain + FAISS + PostgreSQL hybrid retrieval at enterprise scale. -35% hallucination rate.\n\n2. **Healthcare NLP Classification** — HuggingFace transformer pipeline achieving 91% accuracy on medical text classification.\n\n3. **LLM Fine-tuning Pipeline** — LoRA-based domain adaptation using HuggingFace PEFT, complete with structured evaluation workflows.`,
  },
  {
    patterns: [/\b(tech|stack|skill|language|tool|framework|use|technolog)\b/i],
    answer: `Core stack:\n- **Languages**: Python (expert), SQL, Go, C++\n- **AI/ML**: LLMs, RAG, Prompt Engineering, LoRA fine-tuning, Embeddings\n- **Frameworks**: LangChain, LangGraph, LlamaIndex, FastAPI, HuggingFace\n- **Vector DBs**: FAISS, Chroma, Pinecone, Weaviate\n- **Cloud**: AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD`,
  },
  {
    patterns: [/\b(llm|large.language|gpt|llama|mistral|fine.tun|lora|peft)\b/i],
    answer: `I work with **LLMs at both the prompt and weight level**. I've built production inference pipelines using GPT-4 and LLaMA-3, and implemented LoRA/QLoRA fine-tuning via HuggingFace PEFT for domain-specific adaptation. I also work with LangGraph for stateful agent flows and use Ragas for automated RAG evaluation.`,
  },
  {
    patterns: [/\b(experienc|work|job|company|tikiot|tickiot|employ|career)\b/i],
    answer: `Work history:\n\n**tickIoT Inc** (Nov 2023 – Oct 2025) — Software Engineer, Gen AI & Analytics. Built 3 production LLM/RAG systems on AWS, reduced hallucination rates by ~35%, designed scalable FastAPI microservices.\n\n**Freelance AI Consultant** (Aug 2025 – Present) — Building LLM chatbot and RAG solutions for startups, LoRA fine-tuning, hybrid retrieval system design.`,
  },
  {
    patterns: [/\b(contact|email|phone|reach|hire|linkedin|github)\b/i],
    answer: `You can reach Purbashis at:\n- 📧 **purbashis31@gmail.com**\n- 📱 **+91-8327705613**\n- 💼 **linkedin.com/in/purbashis-behera**\n- 🐙 **github.com/Purbashis**\n\nHe's open to freelance, full-time, and consulting roles in AI engineering.`,
  },
  {
    patterns: [/\b(educati|degree|study|university|college|bachelor|btech)\b/i],
    answer: `Purbashis holds a **B.Tech in Computer Science & Engineering** with specialisation in AI & ML systems. Key coursework includes Algorithms, Machine Learning, Deep Learning, Distributed Systems, and Database Management.`,
  },
  {
    patterns: [/\b(aws|cloud|deploy|docker|kubernetes|k8s|devops|ci.?cd)\b/i],
    answer: `On the infrastructure side, he deploys AI services on **AWS** using EC2, S3, and Lambda. Applications are containerised with **Docker**, orchestrated with **Kubernetes**, and shipped via automated **CI/CD pipelines** with monitoring dashboards.`,
  },
];

function getReply(q: string): string {
  for (const entry of KB) {
    if (entry.patterns.some(p => p.test(q))) {
      return entry.answer;
    }
  }
  return `That's a great question! I can tell you about Purbashis's **RAG architecture**, **projects**, **tech stack**, **work experience**, or **contact details**. Just ask naturally — e.g. "Tell me about his RAG architecture" or "What projects has he built?"`;
}

// ── Typing bubble component ──────────────────────────────────────────────
function TypingBubble() {
  return (
    <div className="flex gap-1 items-center px-3 py-2">
      {[0, 1, 2].map(i => (
        <span key={i} className="w-2 h-2 rounded-full bg-[#00f0ff]/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  );
}

const SUGGESTIONS = [
  "Explain his RAG architecture",
  "What projects has he built?",
  "What's his tech stack?",
  "How can I contact him?",
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', text: `**Purbashis AI** online 🚀\n\nI'm an AI assistant built from Purbashis's portfolio data. Ask me anything about his work, skills, or projects!` },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInput('');
    setIsTyping(true);

    // Simulate realistic AI "thinking" delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: getReply(q) }]);
    }, 800 + Math.random() * 600);
  };

  // Render text with **bold** markdown
  const renderText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: '#00f0ff', fontWeight: 600 }}>{part}</strong>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="w-80 rounded-2xl overflow-hidden flex flex-col border border-white/10"
            style={{ maxHeight: 520, background: '#06060e', boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,240,255,0.08)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, rgba(0,240,255,0.08), rgba(176,38,255,0.08))' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00f0ff]/30 to-[#b026ff]/30 border border-[#00f0ff]/40 flex items-center justify-center">
                  <Cpu size={15} className="text-[#00f0ff]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-sans)' }}>Purbashis AI</div>
                  <div className="text-[10px] text-[#00f0ff] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse inline-block" />
                    Online · Powered by RAG
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)}>
                <X size={14} className="text-gray-500 hover:text-white transition-colors" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'ai' ? 'bg-gradient-to-tr from-[#00f0ff]/20 to-[#b026ff]/20 border border-[#00f0ff]/30' : 'bg-[#b026ff]/20 border border-[#b026ff]/40'}`}>
                    {m.role === 'ai' ? <Bot size={13} className="text-[#00f0ff]" /> : <User size={13} className="text-[#b026ff]" />}
                  </div>
                  {/* Bubble */}
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-xl text-[11px] leading-relaxed whitespace-pre-line"
                    style={m.role === 'ai'
                      ? { background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.12)', color: '#d1d5db', fontFamily: 'var(--font-sans)' }
                      : { background: 'rgba(176,38,255,0.12)', border: '1px solid rgba(176,38,255,0.2)', color: '#e5e7eb', fontFamily: 'var(--font-sans)' }
                    }
                  >
                    {m.role === 'ai' ? renderText(m.text) : m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00f0ff]/20 to-[#b026ff]/20 border border-[#00f0ff]/30 flex items-center justify-center">
                    <Bot size={13} className="text-[#00f0ff]" />
                  </div>
                  <div className="px-2 py-1 rounded-xl" style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.12)' }}>
                    <TypingBubble />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length < 3 && (
              <div className="flex flex-wrap gap-1.5 px-3 pb-2 flex-shrink-0">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-t border-white/10 flex-shrink-0">
              <input
                ref={inputRef}
                className="flex-1 bg-transparent outline-none text-[11px] text-gray-200 placeholder-gray-600"
                style={{ fontFamily: 'var(--font-sans)' }}
                placeholder="Ask anything about Purbashis…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                autoComplete="off"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim()}
                className="p-1.5 rounded-lg transition-all disabled:opacity-30"
                style={{ background: input.trim() ? 'rgba(0,240,255,0.2)' : 'transparent', border: '1px solid rgba(0,240,255,0.2)' }}
              >
                <Send size={12} className="text-[#00f0ff]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button — large, pulsing, unmissable */}
      <div className="relative">
        {/* Pulsing ring */}
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'transparent', border: '2px solid rgba(176,38,255,0.6)' }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <motion.button
          onClick={() => { setOpen(o => !o); setTimeout(() => inputRef.current?.focus(), 200); }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.93 }}
          className="w-16 h-16 rounded-full flex flex-col items-center justify-center gap-0.5 relative z-10"
          style={{
            background: open
              ? 'linear-gradient(135deg, #00f0ff, #b026ff)'
              : 'linear-gradient(135deg, rgba(0,240,255,0.35), rgba(176,38,255,0.5))',
            border: '2px solid rgba(176,38,255,0.7)',
            boxShadow: open
              ? '0 0 40px rgba(0,240,255,0.6), 0 0 80px rgba(176,38,255,0.4)'
              : '0 0 24px rgba(176,38,255,0.7), 0 0 48px rgba(0,240,255,0.25)',
          }}
        >
          <Sparkles size={24} className="text-white" style={{ filter: 'drop-shadow(0 0 6px #fff)' }} />
          <span className="text-[9px] font-bold text-white/80 tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>AI</span>
        </motion.button>
      </div>
    </div>
  );
}
