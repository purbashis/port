"use client";

import React, { useState, useRef, useEffect } from 'react';

type Line = { type: 'system' | 'input' | 'output' | 'error' | 'success'; text: string };

const COMMANDS: Record<string, { lines: string[]; type?: 'output' | 'error' | 'success' }> = {
  help: {
    lines: [
      "┌─────────────────────────────────────────────────────┐",
      "│          PURBASHIS OS — COMMAND REFERENCE           │",
      "├──────────────┬──────────────────────────────────────┤",
      "│  about       │  Full profile summary                │",
      "│  projects    │  List all major projects             │",
      "│  skills      │  Display tech stack                  │",
      "│  experience  │  Work history                        │",
      "│  education   │  Academic background                 │",
      "│  contact     │  Display contact details             │",
      "│  github      │  Link to GitHub profile              │",
      "│  ai-stack    │  Show AI/ML toolchain                │",
      "│  rag         │  Explain RAG architecture            │",
      "│  status      │  System diagnostics                  │",
      "│  whoami      │  Identity module                     │",
      "│  clear       │  Clear terminal                      │",
      "└──────────────┴──────────────────────────────────────┘",
    ],
  },
  about: {
    lines: [
      "╔═══════════════════════════════════════════════════════╗",
      "║              ENTITY: PURBASHIS BEHERA                ║",
      "╚═══════════════════════════════════════════════════════╝",
      "",
      "  Role     :  Software Engineer — AI & Backend Systems",
      "  Focus    :  LLMs · RAG Pipelines · Distributed AI",
      "  Exp      :  2+ years production AI system engineering",
      "  Location :  India",
      "  Status   :  Available for freelance / full-time roles",
      "",
      "  Summary  :  Purbashis builds production-grade LLM systems",
      "              with a focus on RAG, semantic retrieval, and",
      "              scalable Python microservices on AWS.",
      "",
      "  Key wins :  ~35% hallucination reduction via hybrid RAG",
      "              91% NLP classification accuracy achieved",
      "              3 end-to-end AI products shipped to production",
    ],
  },
  whoami: {
    lines: [
      "purbashis@ai-workstation:~$ whoami",
      "  UID  : purbashis-behera",
      "  ROLE : Software Engineer (AI / ML)",
      "  SHELL: /bin/python3-ai",
      "  HOME : /systems/ai/distributed",
    ],
  },
  projects: {
    lines: [
      "── PROJECTS ─────────────────────────────────────────────",
      "",
      "  [1] Enterprise RAG Knowledge Assistant",
      "      Stack : LangChain · FAISS · PostgreSQL · FastAPI · AWS",
      "      Impact: ~35% hallucination reduction, enterprise-scale",
      "      Status: Production",
      "",
      "  [2] Healthcare NLP Classification System",
      "      Stack : HuggingFace Transformers · Scikit-learn · FastAPI",
      "      Impact: 91% classification accuracy on medical text",
      "      Status: Production",
      "",
      "  [3] LLM Fine-tuning Pipeline",
      "      Stack : HuggingFace PEFT · LoRA · PyTorch · Python",
      "      Impact: Domain-specific LLM adaptation for clients",
      "      Status: Active",
      "",
      "  Run 'rag' for a deep-dive into the RAG architecture.",
    ],
  },
  rag: {
    lines: [
      "── RAG ARCHITECTURE ─────────────────────────────────────",
      "",
      "  Documents                                              ",
      "    ↓  [chunked into semantic passages — 512 tokens]    ",
      "  Embeddings  (sentence-transformers / OpenAI Ada-002)  ",
      "    ↓  [L2 normalised, projected to 768-dim space]      ",
      "  Vector DB   (FAISS index + PostgreSQL BM25 fallback)  ",
      "    ↓  [hybrid retrieval: α·semantic + (1−α)·BM25]     ",
      "  Retriever   (top-k=5 passages, MMR re-ranking)        ",
      "    ↓  [context window packed, citations injected]      ",
      "  LLM         (GPT-4 / LLaMA-3 with system prompt)     ",
      "    ↓  [grounded generation, no hallucination zone]     ",
      "  Answer      (cited, source-attributed response)       ",
      "",
      "  Metrics : Latency <1.2s | Hallucination ↓35% | P@5: 0.91",
    ],
  },
  skills: {
    lines: [
      "── TECH STACK ───────────────────────────────────────────",
      "",
      "  Languages  : Python ████████████░  95%",
      "               SQL    ████████░░░░░  82%",
      "               Go     ████████░░░░░  65%",
      "               C++    ██████░░░░░░░  55%",
      "",
      "  AI & ML    : LLMs · RAG · Prompt Engineering",
      "               Embeddings · Vector Search · LoRA fine-tuning",
      "",
      "  Frameworks : LangChain · LangGraph · LlamaIndex",
      "               FastAPI · HuggingFace · PyTorch",
      "",
      "  Databases  : PostgreSQL · FAISS · Chroma · Pinecone · Weaviate",
      "",
      "  Cloud/DevOps: AWS (EC2, S3, Lambda) · Docker · Kubernetes · CI/CD",
    ],
  },
  "ai-stack": {
    lines: [
      "── AI TOOLCHAIN ─────────────────────────────────────────",
      "",
      "  Orchestration : LangChain · LangGraph · LlamaIndex",
      "  Models        : GPT-4 · LLaMA-3 · Mistral · Claude",
      "  Fine-tuning   : LoRA / QLoRA · HuggingFace PEFT",
      "  Embeddings    : OpenAI Ada-002 · sentence-transformers",
      "  Vector DBs    : FAISS · Chroma · Pinecone · Weaviate",
      "  Serving       : FastAPI · vLLM · TGI · BentoML",
      "  Eval          : Ragas · ARES · custom eval pipelines",
      "  Monitoring    : LangSmith · Weights & Biases",
    ],
  },
  experience: {
    lines: [
      "── WORK HISTORY ─────────────────────────────────────────",
      "",
      "  [2023-11 → 2025-10]  tickIoT Inc",
      "  Software Engineer – Generative AI & Analytics",
      "",
      "    ▸ Built 3 production LLM/RAG apps end-to-end on AWS",
      "    ▸ RAG pipeline w/ LangChain + FAISS: -35% hallucination",
      "    ▸ FastAPI microservices for scalable LLM inference",
      "    ▸ Containerised on AWS via Docker + CI/CD pipelines",
      "",
      "  [2025-08 → Present]  Freelance AI Consultant",
      "",
      "    ▸ End-to-end LLM chatbot + RAG solutions for startups",
      "    ▸ LoRA fine-tuning with structured eval workflows",
      "    ▸ PostgreSQL hybrid retrieval with vector embeddings",
    ],
  },
  education: {
    lines: [
      "── EDUCATION ────────────────────────────────────────────",
      "",
      "  B.Tech — Computer Science & Engineering",
      "  Specialisation: AI & Machine Learning systems",
      "",
      "  Key coursework:",
      "    · Algorithms & Data Structures",
      "    · Machine Learning & Deep Learning",
      "    · Distributed Systems",
      "    · Database Management Systems",
    ],
  },
  contact: {
    lines: [
      "── CONTACT ──────────────────────────────────────────────",
      "",
      "  Name    : Purbashis Behera",
      "  Email   : purbashis31@gmail.com",
      "  Phone   : +91-8327705613",
      "  GitHub  : github.com/Purbashis",
      "  LinkedIn: linkedin.com/in/purbashis-behera",
      "",
      "  → Available for: Freelance · Full-time · Consulting",
    ],
  },
  github: {
    lines: [
      "  Opening GitHub profile in system browser…",
      "  → https://github.com/Purbashis",
      "  Repository count: 25+ | Stars: ⭐ Growing",
    ],
    type: 'success',
  },
  status: {
    lines: [
      "── SYSTEM STATUS ────────────────────────────────────────",
      "",
      "  AI Core      [●●●●●●●●●●] ONLINE",
      "  RAG Pipeline [●●●●●●●●●●] ACTIVE",
      "  Vector DB    [●●●●●●●●●●] 12,847 vectors loaded",
      "  LLM Engine   [●●●●●●●●●●] GPT-4 / LLaMA-3 ready",
      "  GitHub API   [●●●●●●●●●●] Connected",
      "  Uptime       : 99.98%",
      "  Last deploy  : 2025-03-15",
    ],
  },
};

const BOOT_SYSTEM_LINES: Line[] = [
  { type: 'system', text: '┌──────────────────────────────────────────────────┐' },
  { type: 'system', text: '│        PURBASHIS OS v1.0 — TERMINAL              │' },
  { type: 'system', text: '│        AI Engineering Workstation Interface       │' },
  { type: 'system', text: '└──────────────────────────────────────────────────┘' },
  { type: 'system', text: '' },
  { type: 'output', text: '[SYS] AI Core initialised — uptime: 00:00:01' },
  { type: 'output', text: '[NET] GitHub API endpoint reachable' },
  { type: 'output', text: '[DB]  Vector index loaded — 12,847 embeddings' },
  { type: 'output', text: '[LLM] Context: 128k tokens — GPT-4 + LLaMA-3 ready' },
  { type: 'output', text: '[RAG] Hybrid retriever online (BM25 + semantic)' },
  { type: 'output', text: '' },
  { type: 'success', text: 'All systems operational. Type "help" to begin.' },
  { type: 'output', text: '' },
];

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>(BOOT_SYSTEM_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [{ type: 'input', text: `purbashis@os:~$ ${cmd}` }];

    if (trimmed === 'clear') {
      setLines(BOOT_SYSTEM_LINES);
      return;
    }

    const response = COMMANDS[trimmed];
    if (response) {
      response.lines.forEach(t =>
        newLines.push({ type: response.type ?? 'output', text: t })
      );
    } else if (trimmed === '') {
      // skip
    } else {
      newLines.push({ type: 'error', text: `bash: ${trimmed}: command not found` });
      newLines.push({ type: 'output', text: 'Type "help" for available commands.' });
    }

    newLines.push({ type: 'output', text: '' });
    setLines(prev => [...prev, ...newLines]);
    setHistory(prev => [cmd, ...prev]);
    setHistIdx(-1);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')       { run(input); setInput(''); }
    else if (e.key === 'ArrowUp') {
      const newIdx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(newIdx);
      setInput(history[newIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx]);
    }
  };

  const lineColor = (type: Line['type']) => {
    switch (type) {
      case 'input':   return '#00ff41';
      case 'system':  return 'rgba(0,255,65,0.4)';
      case 'success': return '#00ff41';
      case 'error':   return '#ff4444';
      case 'output':  return 'rgba(0,255,65,0.75)';
    }
  };

  return (
    <div
      className="min-h-[420px] flex flex-col relative"
      style={{ background: '#000', cursor: 'text' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scanline effect */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.012) 2px, rgba(0,255,65,0.012) 4px)',
        }}
      />

      {/* Output area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0.5 z-20">
        {lines.map((l, i) => (
          <div
            key={i}
            className="text-xs leading-5 whitespace-pre"
            style={{
              fontFamily: 'var(--font-mono)',
              color: lineColor(l.type),
              textShadow: l.type === 'success' ? '0 0 8px #00ff41' :
                          l.type === 'input'   ? '0 0 5px #00ff41' : 'none',
              fontWeight: l.type === 'input' || l.type === 'system' ? 600 : 400,
            }}
          >
            {l.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div
        className="flex items-center gap-0 px-4 py-3 border-t z-20 flex-shrink-0"
        style={{ borderColor: 'rgba(0,255,65,0.15)' }}
      >
        <span style={{ color: '#00ff41', fontFamily: 'var(--font-mono)', fontSize: 12, textShadow: '0 0 8px #00ff41', flexShrink: 0 }}>
          purbashis@os:~$&nbsp;
        </span>
        <input
          ref={inputRef}
          autoFocus
          className="flex-1 bg-transparent outline-none text-xs"
          style={{
            fontFamily: 'var(--font-mono)',
            color: '#00ff41',
            caretColor: '#00ff41',
            textShadow: '0 0 5px #00ff41',
          }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="type a command…"
          spellCheck={false}
          autoComplete="off"
        />
        <span
          style={{
            width: 8, height: 14, background: '#00ff41',
            display: 'inline-block', marginLeft: 1,
            animation: 'blink 1s step-end infinite',
            boxShadow: '0 0 6px #00ff41',
          }}
        />
      </div>
    </div>
  );
}
