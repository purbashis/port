"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Cpu, Send, Sparkles, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

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
  const isMobile = useIsMobile();
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

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: getReply(q) }]);
    }, 800 + Math.random() * 600);
  };

  const renderText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: '#00f0ff', fontWeight: 600 }}>{part}</strong>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <div className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'} z-[200] flex flex-col items-end gap-3`}>
      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={isMobile ? { opacity: 0, y: 100 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { opacity: 0, y: 100 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className={`${isMobile ? 'fixed inset-0 rounded-none' : 'w-80 rounded-2xl'} overflow-hidden flex flex-col border border-white/10 relative`}
            style={{ 
              maxHeight: isMobile ? '100%' : 520, 
              background: isMobile ? '#06060e' : 'rgba(6, 6, 14, 0.75)', 
              backdropFilter: isMobile ? 'none' : 'blur(32px)',
              boxShadow: isMobile ? 'none' : '0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,240,255,0.1), inset 0 0 30px rgba(0,240,255,0.03)' 
            }}
          >
            {/* Neural Web Background - Hidden on mobile for performance */}
            {!isMobile && (
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300f0ff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />
            )}

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 flex-shrink-0 relative z-10"
              style={{ background: 'linear-gradient(90deg, rgba(0,240,255,0.12), rgba(176,38,255,0.12))' }}>
              <div className="flex items-center gap-2">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00f0ff]/30 to-[#b026ff]/30 border border-[#00f0ff]/40 flex items-center justify-center">
                  <Cpu size={18} className="text-[#00f0ff]" />
                </motion.div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>Purbashis AI</div>
                  <div className="text-[10px] text-[#00f0ff] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={i} 
                  className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} relative z-10`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'ai' ? 'bg-[#00f0ff]/20 border border-[#00f0ff]/30' : 'bg-[#b026ff]/20 border border-[#b026ff]/40'}`}>
                    {m.role === 'ai' ? <Bot size={15} className="text-[#00f0ff]" /> : <User size={15} className="text-[#b026ff]" />}
                  </div>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line relative overflow-hidden ${m.role === 'ai' ? 'rounded-tl-none' : 'rounded-tr-none'}`}
                    style={m.role === 'ai'
                      ? { background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.15)', color: '#e5e7eb' }
                      : { background: 'rgba(176,38,255,0.15)', border: '1px solid rgba(176,38,255,0.25)', color: '#fff' }
                    }
                  >
                    {!isMobile && m.role === 'ai' && (
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
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/30 flex items-center justify-center">
                    <Bot size={15} className="text-[#00f0ff]" />
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                    <TypingBubble />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length < 4 && (
              <div className="flex flex-wrap gap-2 px-4 pb-3 flex-shrink-0">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 active:bg-[#00f0ff]/20 transition-all font-medium"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input - Sticky on mobile */}
            <div className={`p-4 border-t border-white/10 bg-[#060612] ${isMobile ? 'pb-8' : ''}`}>
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 border border-white/5">
                <input
                  ref={inputRef}
                  className="flex-1 bg-transparent outline-none text-[13px] text-gray-200"
                  placeholder="Ask about Purbashis..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send(input)}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim()}
                  className="p-2 rounded-lg transition-all disabled:opacity-30"
                  style={{ background: input.trim() ? 'rgba(0,240,255,0.2)' : 'transparent' }}
                >
                  <Send size={16} className="text-[#00f0ff]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'transparent', border: '2px solid rgba(176,38,255,0.6)' }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <motion.button
          onClick={() => { setOpen(o => !o); if (!open) setTimeout(() => inputRef.current?.focus(), 200); }}
          whileHover={isMobile ? {} : { scale: 1.1, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.92 }}
          className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16'} rounded-full flex flex-col items-center justify-center relative z-10`}
          style={{
            background: open ? 'linear-gradient(135deg, #00f0ff, #b026ff)' : '#0a0a1e',
            border: '2px solid rgba(0, 240, 255, 0.4)',
            boxShadow: open ? '0 0 40px rgba(0,240,255,0.6)' : '0 0 20px rgba(176,38,255,0.2)'
          }}
        >
          <Sparkles size={isMobile ? 22 : 24} className="text-white relative z-10" />
          {!open && !isMobile && <span className="text-[9px] font-black text-[#00f0ff] tracking-[0.2em] relative z-10 mt-0.5">AI</span>}
        </motion.button>
      </div>
    </div>
  );
}
