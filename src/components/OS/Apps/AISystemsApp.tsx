"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const PIPELINE_STEPS = [
  { label: "Documents",      desc: "Raw PDFs, text files, databases",        color: "#9aa0a6" },
  { label: "Chunking",       desc: "Split into semantic passages",            color: "#00c8ff" },
  { label: "Embeddings",     desc: "sentence-transformers / OpenAI Ada",      color: "#00f0ff" },
  { label: "Vector DB",      desc: "FAISS / Chroma / Pinecone index",         color: "#5ad4ff" },
  { label: "Retriever",      desc: "Hybrid BM25 + semantic search",           color: "#b026ff" },
  { label: "LLM",            desc: "GPT-4 / LLaMA-3 with context window",     color: "#d170ff" },
  { label: "Answer",         desc: "Grounded, cited response to user",        color: "#00f0ff" },
];

export default function AISystemsApp() {
  return (
    <div className="p-6 font-mono space-y-8">
      <div>
        <h2 className="text-[#00f0ff] font-bold mb-1 text-base">RAG Pipeline Architecture</h2>
        <p className="text-gray-500 text-xs mb-6">Retrieval Augmented Generation — end-to-end data flow</p>

        {/* Animated Pipeline */}
        <div className="flex flex-col gap-2">
          {PIPELINE_STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div
                  className="w-36 text-center py-2 px-3 rounded-lg text-sm font-bold flex-shrink-0"
                  style={{ color: step.color, background: step.color + '18', border: `1px solid ${step.color}40` }}
                >
                  {step.label}
                </div>
                <p className="text-gray-400 text-xs">{step.desc}</p>
              </motion.div>

              {i < PIPELINE_STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.05 }}
                  className="flex items-center ml-14"
                >
                  <ArrowRight size={16} className="text-[#00f0ff]/40 animate-pulse" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Hallucination ↓", value: "~35%",  color: "#00f0ff" },
          { label: "Accuracy",         value: "91%",   color: "#b026ff" },
          { label: "Latency",          value: "<1.2s", color: "#00f0ff" },
        ].map((stat, i) => (
          <div key={i} className="rounded-lg p-3 text-center border border-white/10 bg-white/5">
            <div className="text-xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-gray-500 text-[10px]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
