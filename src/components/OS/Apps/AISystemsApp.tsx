"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown, GitBranch, GitMerge, Layers, Zap,
  Database, ChevronRight, Activity, Cpu, Brain,
  Share2, FlaskConical, Workflow, Sigma, Network
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────
type TabId = 'rag' | 'langgraph' | 'ml';

// ─── RAG Tab ─────────────────────────────────────────────────────────────────
const RAG_STEPS = [
  {
    id: 1, icon: Layers, label: "Document Ingestion",
    detail: "PDFs, HTML, Markdown, Databases",
    color: "#9aa0a6", code: "loader = PyPDFLoader(path)\ndocs = loader.load()",
  },
  {
    id: 2, icon: Sigma, label: "Semantic Chunking",
    detail: "512-token splits with 64-token overlap",
    color: "#00c8ff", code: "splitter = RecursiveCharacterTextSplitter(\n  chunk_size=512, chunk_overlap=64\n)",
  },
  {
    id: 3, icon: Brain, label: "Embedding Generation",
    detail: "sentence-transformers / OpenAI Ada-002 → 768-dim vectors",
    color: "#00f0ff", code: "embeddings = HuggingFaceEmbeddings(\n  model=\"sentence-transformers/all-MiniLM-L6-v2\"\n)",
  },
  {
    id: 4, icon: Database, label: "Vector Index",
    detail: "FAISS L2 index + PostgreSQL BM25 fallback",
    color: "#5ad4ff", code: "vectorstore = FAISS.from_documents(\n  docs, embeddings\n)\nvectorstore.save_local(\"index\")",
  },
  {
    id: 5, icon: GitMerge, label: "Hybrid Retrieval",
    detail: "α·dense + (1−α)·BM25 with MMR re-ranking",
    color: "#b026ff", code: "retriever = EnsembleRetriever(\n  retrievers=[bm25, faiss],\n  weights=[0.4, 0.6]\n)",
  },
  {
    id: 6, icon: Cpu, label: "LLM Generation",
    detail: "GPT-4 / LLaMA-3 with injected context & citations",
    color: "#d170ff", code: "chain = RetrievalQA.from_chain_type(\n  llm=ChatOpenAI(model=\"gpt-4\"),\n  retriever=retriever\n)",
  },
  {
    id: 7, icon: Activity, label: "Grounded Response",
    detail: "Source-attributed answer with Ragas eval scoring",
    color: "#00f0ff", code: "# Ragas eval\nresult = evaluate(dataset,\n  metrics=[faithfulness, answer_relevancy]\n)",
  },
];

function RagTab() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">
        Click any step to see the code behind it
      </p>
      {RAG_STEPS.map((step, i) => {
        const isOpen = active === step.id;
        const Icon = step.icon;
        return (
          <div key={step.id}>
            <motion.button
              onClick={() => setActive(isOpen ? null : step.id)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all relative overflow-hidden group"
              style={{
                background: isOpen ? step.color + '18' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isOpen ? step.color + '55' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {/* Animated shine on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${step.color}08, transparent)` }} />

              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: step.color + '20', color: step.color }}>
                <Icon size={17} strokeWidth={1.8} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono" style={{ color: step.color + 'aa' }}>
                    {String(step.id).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-bold text-gray-100">{step.label}</span>
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5 truncate">{step.detail}</div>
              </div>

              <ChevronRight
                size={14}
                className="text-gray-600 flex-shrink-0 transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(90deg)' : 'none', color: isOpen ? step.color : undefined }}
              />
            </motion.button>

            {/* Code snippet expand */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="ml-3 mr-0 mb-1 mt-1 rounded-xl p-4 border"
                    style={{ background: '#0a0a1a', borderColor: step.color + '30' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 opacity-60" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-60" />
                      <div className="w-2 h-2 rounded-full bg-green-500 opacity-60" />
                      <span className="text-[9px] text-gray-600 ml-1 font-mono">python</span>
                    </div>
                    <pre className="text-[11px] font-mono leading-5 overflow-x-auto"
                      style={{ color: step.color }}>
                      {step.code}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Arrow connector */}
            {i < RAG_STEPS.length - 1 && (
              <div className="flex justify-start ml-7 my-0.5">
                <ArrowDown size={13} className="opacity-20" style={{ color: step.color }} />
              </div>
            )}
          </div>
        );
      })}

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-3 pt-4">
        {[
          { label: "Hallucination ↓", value: "~35%", color: "#00f0ff" },
          { label: "Precision@5",     value: "0.91",  color: "#b026ff" },
          { label: "Latency",         value: "<1.2s", color: "#00ff41" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-3 text-center border border-white/8 bg-white/4 relative overflow-hidden group"
            style={{ borderColor: s.color + '25' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ background: s.color }} />
            <div className="text-base font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="text-gray-600 text-[9px] uppercase tracking-wider mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LangGraph Tab ───────────────────────────────────────────────────────────
const GRAPH_NODES = [
  { id: "user", label: "User Input", desc: "Query arrives at the agent entry point", color: "#9aa0a6", x: 50, type: "entry" },
  { id: "planner", label: "Planner Node", desc: "LLM decides next action via ReAct reasoning", color: "#b026ff", type: "llm" },
  { id: "seq_tool", label: "Sequential Tools", desc: "Tool A → Tool B (linear order): search, read, summarise", color: "#d170ff", type: "sequential" },
  { id: "parallel", label: "Parallel Fan-out", desc: "Multiple tools fire simultaneously, results merged", color: "#00c8ff", type: "parallel" },
  { id: "router", label: "Conditional Router", desc: "LLM evaluates result quality & decides: retry | escalate | respond", color: "#ff6a40", type: "conditional" },
  { id: "memory", label: "State / Memory", desc: "Checkpoint graph state — supports long multi-turn sessions", color: "#00ff41", type: "state" },
  { id: "output", label: "Final Response", desc: "Formatted, grounded answer streamed to user", color: "#00f0ff", type: "output" },
];

const TYPE_BADGE: Record<string, { label: string; color: string }> = {
  entry:       { label: "ENTRY",      color: "#9aa0a6" },
  llm:         { label: "LLM NODE",   color: "#b026ff" },
  sequential:  { label: "SEQUENTIAL", color: "#d170ff" },
  parallel:    { label: "PARALLEL",   color: "#00c8ff" },
  conditional: { label: "CONDITION",  color: "#ff6a40" },
  state:       { label: "STATE",      color: "#00ff41" },
  output:      { label: "OUTPUT",     color: "#00f0ff" },
};

const GRAPH_CODE = `from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated

class AgentState(TypedDict):
    messages: list
    next_action: str
    memory: dict

graph = StateGraph(AgentState)

# Add nodes
graph.add_node("planner",  planner_node)
graph.add_node("tools",    tool_executor)
graph.add_node("critic",   critic_node)
graph.add_node("responder",responder_node)

# Sequential edges
graph.add_edge("planner", "tools")
graph.add_edge("tools",   "critic")

# Conditional routing
graph.add_conditional_edges("critic", should_respond, {
  "retry":   "planner",   # loop back
  "respond": "responder", # final answer
})

graph.set_entry_point("planner")
app = graph.compile(checkpointer=memory)`;

function LanggraphTab() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-3">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
        Stateful Multi-Actor Agent — Click nodes to inspect
      </p>

      {/* Visual flow */}
      <div className="space-y-1.5">
        {GRAPH_NODES.map((node, i) => {
          const badge = TYPE_BADGE[node.type];
          const isActive = activeNode === node.id;
          return (
            <div key={node.id}>
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setActiveNode(isActive ? null : node.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all group relative overflow-hidden"
                style={{
                  background: isActive ? node.color + '15' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? node.color + '60' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                {/* Pulsing orb */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative"
                  style={{ background: node.color + '20', border: `1px solid ${node.color}50` }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: node.color, boxShadow: `0 0 6px ${node.color}` }} />
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1px solid ${node.color}` }}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-gray-100">{node.label}</span>
                    <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full tracking-wider"
                      style={{ background: badge.color + '20', color: badge.color, border: `1px solid ${badge.color}35` }}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5 truncate">{node.desc}</div>
                </div>

                <ChevronRight size={14} className="flex-shrink-0 transition-transform duration-300"
                  style={{ transform: isActive ? 'rotate(90deg)' : 'none', color: isActive ? node.color : '#555' }} />
              </motion.button>

              {/* Expanded details */}
              <AnimatePresence>
                {isActive && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="ml-4 mt-1 mb-1 p-3 rounded-xl border text-[10px] font-mono"
                      style={{ background: '#080815', borderColor: node.color + '30', color: node.color + 'cc' }}>
                      <div className="font-bold mb-1" style={{ color: node.color }}>Node: {node.label}</div>
                      <div className="text-gray-400 mb-2">{node.desc}</div>
                      {node.type === 'parallel' && (
                        <div>
                          <div className="text-gray-500">Runs concurrently:</div>
                          <div>  ├─ web_search_tool(query)</div>
                          <div>  ├─ rag_retriever(query)</div>
                          <div>  └─ calculator_tool(query)</div>
                        </div>
                      )}
                      {node.type === 'sequential' && (
                        <div>
                          <div className="text-gray-500">Step-by-step chain:</div>
                          <div>  1. search_tool → results</div>
                          <div>  2. read_tool(results[0])</div>
                          <div>  3. summarise_tool(text)</div>
                        </div>
                      )}
                      {node.type === 'conditional' && (
                        <div>
                          <div className="text-gray-500">Routing logic:</div>
                          <div>  if confidence &gt; 0.8 → "respond"</div>
                          <div>  if needs_more_context → "retry"</div>
                          <div>  else → "escalate"</div>
                        </div>
                      )}
                      {node.type === 'state' && (
                        <div>
                          <div className="text-gray-500">Persisted state:</div>
                          <div>  messages: list[BaseMessage]</div>
                          <div>  memory: {"{ short_term, episodic }"}</div>
                          <div>  tool_calls: list[ToolCall]</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Arrow between nodes */}
              {i < GRAPH_NODES.length - 1 && (
                <div className="flex ml-6 my-0.5">
                  <ArrowDown size={12} className="opacity-20" style={{ color: node.color }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Code toggle */}
      <div className="mt-4">
        <button
          onClick={() => setShowCode(v => !v)}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-white/8 text-left transition-all hover:bg-white/5"
          style={{ borderColor: showCode ? '#b026ff55' : undefined }}
        >
          <div className="flex items-center gap-2">
            <Workflow size={14} className="text-[#b026ff]" />
            <span className="text-xs font-bold text-gray-300">LangGraph Build Code</span>
          </div>
          <span className="text-[10px] text-gray-600">{showCode ? 'hide' : 'show'} code</span>
        </button>
        <AnimatePresence>
          {showCode && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <div className="mt-1 p-4 rounded-xl border border-[#b026ff30]" style={{ background: '#07070f' }}>
                <div className="flex items-center gap-2 mb-3">
                  {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                    <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                  ))}
                  <span className="text-[9px] text-gray-600 font-mono ml-1">langgraph_agent.py</span>
                </div>
                <pre className="text-[10px] font-mono leading-5 text-[#b026ff] overflow-x-auto whitespace-pre">
                  {GRAPH_CODE}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── ML Tab ──────────────────────────────────────────────────────────────────
const ML_SECTIONS = [
  {
    title: "Fine-Tuning Pipeline (LoRA / QLoRA)",
    icon: Zap,
    color: "#ff6af0",
    desc: "Domain adaptation of foundation models using Parameter-Efficient Fine-Tuning",
    steps: [
      { label: "Base Model",     detail: "LLaMA-3 / Mistral loaded in 4-bit quantised mode (BitsAndBytes)" },
      { label: "LoRA Config",    detail: "rank=16, alpha=32, target_modules=['q_proj','v_proj']" },
      { label: "Dataset",        detail: "Instruction-tuned JSONL dataset with train/eval splits" },
      { label: "Training",       detail: "SFTTrainer + gradient accumulation, fp16, cosine LR schedule" },
      { label: "Eval & Merge",   detail: "ROUGE / BERTScore eval → merge adapter → push to HuggingFace Hub" },
    ],
    code: `model = AutoModelForCausalLM.from_pretrained(\n  "meta-llama/Meta-Llama-3-8B",\n  load_in_4bit=True\n)\nmodel = get_peft_model(model, LoraConfig(\n  r=16, lora_alpha=32,\n  target_modules=["q_proj", "v_proj"]\n))`,
  },
  {
    title: "Healthcare NLP Classifier",
    icon: FlaskConical,
    color: "#00ff99",
    desc: "91% accuracy transformer-based medical text classification",
    steps: [
      { label: "Data Pipeline",   detail: "MIMIC-III inspired dataset — tokenised with BiomedBERT tokenizer" },
      { label: "Embeddings",      detail: "CLS token embeddings extracted from last hidden layer (768-dim)" },
      { label: "Classifier Head", detail: "Linear(768 → 256 → num_labels) with dropout=0.3" },
      { label: "Training",        detail: "AdamW, lr=2e-5, warmup_steps=100, 10 epochs" },
      { label: "Results",         detail: "F1=0.91, Precision=0.90, Recall=0.92 on held-out test set" },
    ],
    code: `model = AutoModelForSequenceClassification.from_pretrained(\n  "dmis-lab/biobert-base-cased-v1.1",\n  num_labels=len(label_map)\n)\ntrainer = Trainer(\n  model=model, args=training_args,\n  compute_metrics=compute_metrics\n)`,
  },
  {
    title: "Evaluation & Monitoring",
    icon: Activity,
    color: "#ffd700",
    desc: "Production-grade RAG and agent evaluation frameworks",
    steps: [
      { label: "Ragas",       detail: "Faithfulness, Answer Relevancy, Context Recall metrics" },
      { label: "LangSmith",   detail: "Trace every LLM call, tools, latency and token usage" },
      { label: "W&B",         detail: "Training curves, hyperparameter sweeps, model registry" },
      { label: "Prometheus",  detail: "API latency, error rates, throughput dashboards on AWS" },
    ],
    code: `from ragas import evaluate\nfrom ragas.metrics import (\n  faithfulness, answer_relevancy,\n  context_recall, context_precision\n)\nresult = evaluate(\n  dataset,\n  metrics=[faithfulness, answer_relevancy]\n)`,
  },
];

function MLTab() {
  const [activeSection, setActiveSection] = useState<number | null>(0);
  const [showCode, setShowCode] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
        ML pipelines powering the AI systems
      </p>

      {ML_SECTIONS.map((sec, si) => {
        const Icon = sec.icon;
        const isOpen = activeSection === si;
        return (
          <div key={si} className="rounded-xl border overflow-hidden transition-all"
            style={{ borderColor: isOpen ? sec.color + '50' : 'rgba(255,255,255,0.06)' }}>
            {/* Header */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.1 }}
              onClick={() => setActiveSection(isOpen ? null : si)}
              className="w-full flex items-center gap-3 p-4 text-left"
              style={{ background: isOpen ? sec.color + '10' : 'rgba(255,255,255,0.02)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: sec.color + '20', color: sec.color }}>
                <Icon size={19} strokeWidth={1.6} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-100">{sec.title}</div>
                <div className="text-[10px] text-gray-500 mt-0.5 truncate">{sec.desc}</div>
              </div>
              <ChevronRight size={14} className="flex-shrink-0 transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(90deg)' : 'none', color: isOpen ? sec.color : '#555' }} />
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}
                  exit={{ height: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                  <div className="px-4 pb-4 space-y-2">
                    {/* Steps */}
                    <div className="space-y-1.5">
                      {sec.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3 text-[11px]">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] mt-0.5"
                            style={{ background: sec.color + '25', color: sec.color }}>
                            {i + 1}
                          </div>
                          <div>
                            <span className="font-bold text-gray-200">{step.label}</span>
                            <span className="text-gray-500 ml-1.5">{step.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Code toggle */}
                    <button
                      onClick={() => setShowCode(showCode === si ? null : si)}
                      className="flex items-center gap-2 mt-3 text-[10px] font-mono px-3 py-1.5 rounded-lg border transition-all hover:bg-white/5"
                      style={{ borderColor: sec.color + '30', color: sec.color }}>
                      <Share2 size={11} />
                      {showCode === si ? 'hide code' : 'show implementation'}
                    </button>

                    <AnimatePresence>
                      {showCode === si && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className="p-4 rounded-xl border mt-1" style={{ background: '#07070f', borderColor: sec.color + '30' }}>
                            <div className="flex items-center gap-2 mb-3">
                              {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                                <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                              ))}
                              <span className="text-[9px] text-gray-600 font-mono ml-1">python</span>
                            </div>
                            <pre className="text-[10px] font-mono leading-5 overflow-x-auto whitespace-pre"
                              style={{ color: sec.color }}>
                              {sec.code}
                            </pre>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const TABS: { id: TabId; label: string; sublabel: string; icon: React.ElementType; color: string }[] = [
  { id: 'rag',       label: 'RAG',       sublabel: 'LangChain · FAISS',   icon: Database,  color: '#00f0ff' },
  { id: 'langgraph', label: 'LangGraph', sublabel: 'Agents · Workflows',  icon: Network,   color: '#b026ff' },
  { id: 'ml',        label: 'ML Stack',  sublabel: 'LoRA · Eval · NLP',   icon: Brain,     color: '#ff6af0' },
];

export default function AISystemsApp() {
  const [tab, setTab] = useState<TabId>('rag');
  const activeTab = TABS.find(t => t.id === tab)!;

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'var(--font-mono)' }}>

      {/* ── Tab Bar ── */}
      <div className="flex gap-1 px-4 pt-4 pb-0 flex-shrink-0">
        {TABS.map(t => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <motion.button
              key={t.id}
              onClick={() => setTab(t.id)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-left relative flex-1 transition-all"
              style={{
                background: isActive ? `${t.color}15` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? t.color + '60' : 'rgba(255,255,255,0.06)'}`,
                borderBottom: isActive ? `1px solid ${t.color}15` : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Active underline */}
              {isActive && (
                <motion.div
                  layoutId="tabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: t.color }}
                />
              )}
              <Icon size={14} style={{ color: isActive ? t.color : '#555', flexShrink: 0 }} />
              <div className="min-w-0">
                <div className="text-[11px] font-bold leading-tight"
                  style={{ color: isActive ? t.color : '#777' }}>
                  {t.label}
                </div>
                <div className="text-[8px] text-gray-600 leading-tight truncate">{t.sublabel}</div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* ── Tab Content border ── */}
      <div className="mx-4 border-b" style={{ borderColor: activeTab.color + '30' }} />

      {/* ── Tab Body ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {tab === 'rag'       && <RagTab />}
            {tab === 'langgraph' && <LanggraphTab />}
            {tab === 'ml'        && <MLTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
