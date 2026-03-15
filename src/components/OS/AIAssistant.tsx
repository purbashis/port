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
            className="w-80 rounded-2xl overflow-hidden flex flex-col border border-white/10 relative"
            style={{ 
              maxHeight: 520, 
              background: 'rgba(6, 6, 14, 0.75)', 
              backdropFilter: 'blur(32px)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,240,255,0.1), inset 0 0 30px rgba(0,240,255,0.03)' 
            }}
          >
            {/* Neural Web Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300f0ff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0 relative z-10"
              style={{ background: 'linear-gradient(90deg, rgba(0,240,255,0.12), rgba(176,38,255,0.12))' }}>
              <div className="flex items-center gap-2">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00f0ff]/30 to-[#b026ff]/30 border border-[#00f0ff]/40 flex items-center justify-center">
                  <Cpu size={15} className="text-[#00f0ff]" />
                </motion.div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>Purbashis AI</div>
                  <div className="text-[10px] text-[#00f0ff] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41] animate-pulse inline-block" />
                    Neural Core Online
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                <X size={14} className="text-gray-500 hover:text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === 'ai' ? -10 : 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  key={i} 
                  className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} relative z-10`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'ai' ? 'bg-gradient-to-tr from-[#00f0ff]/20 to-[#b026ff]/20 border border-[#00f0ff]/30' : 'bg-[#b026ff]/20 border border-[#b026ff]/40'}`}>
                    {m.role === 'ai' ? <Bot size={13} className="text-[#00f0ff]" /> : <User size={13} className="text-[#b026ff]" />}
                  </div>
                  {/* Bubble */}
                  <div
                    className="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[11px] leading-relaxed whitespace-pre-line relative overflow-hidden group"
                    style={m.role === 'ai'
                      ? { background: 'rgba(0,240,255,0.07)', border: '1px solid rgba(0,240,255,0.15)', color: '#d1d5db', fontFamily: 'var(--font-sans)', boxShadow: 'inset 0 0 12px rgba(0,240,255,0.03)' }
                      : { background: 'rgba(176,38,255,0.12)', border: '1px solid rgba(176,38,255,0.25)', color: '#e5e7eb', fontFamily: 'var(--font-sans)' }
                    }
                  >
                    {m.role === 'ai' && (
                      <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                      />
                    )}
                    {m.role === 'ai' ? renderText(m.text) : m.text}
                  </div>
                </motion.div>
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
          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.92 }}
          className="w-16 h-16 rounded-full flex flex-col items-center justify-center gap-0.5 relative z-10 overflow-hidden"
          style={{
            background: open
              ? 'linear-gradient(135deg, #00f0ff, #b026ff)'
              : 'linear-gradient(135deg, rgba(10, 10, 30, 0.8), rgba(20, 10, 40, 0.8))',
            border: '2px solid rgba(0, 240, 255, 0.4)',
            boxShadow: open
              ? '0 0 50px rgba(0,240,255,0.7), 0 0 100px rgba(176,38,255,0.5), inset 0 0 20px rgba(255,255,255,0.3)'
              : '0 0 30px rgba(0,240,255,0.3), 0 0 60px rgba(176,38,255,0.15), inset 0 0 10px rgba(0,240,255,0.1)',
            backdropFilter: 'blur(12px)'
          }}
        >
          {!open && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff]/10 to-[#b026ff]/10"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}
          <circle cx="8" cy="8" r="8" fill="red" />
          <Sparkles size={ open ? 24 : 26 } className="text-white relative z-10" style={{ filter: 'drop-shadow(0 0 8px #fff)' }} />
          {!open && <span className="text-[9px] font-black text-[#00f0ff] tracking-[0.2em] relative z-10" style={{ fontFamily: 'var(--font-mono)' }}>AI</span>}
        </motion.button>
      </div>
    </div>
  );
}
