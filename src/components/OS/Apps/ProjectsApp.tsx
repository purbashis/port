"use client";

import React from 'react';
import { Github, ExternalLink, Eye } from 'lucide-react';

const PROJECTS = [
  {
    title: "Enterprise RAG Knowledge Assistant",
    description: "Scalable Retrieval Augmented Generation system using LangChain, FAISS, and PostgreSQL hybrid retrieval for enterprise document search.",
    features: ["Vector search", "Semantic retrieval", "FastAPI inference", "AWS deployment"],
    tech: ["LangChain", "FAISS", "PostgreSQL", "FastAPI", "AWS"],
    color: "#00f0ff",
    stat: "~35% hallucination reduction",
  },
  {
    title: "Healthcare NLP Classification",
    description: "Machine learning pipeline using transformer embeddings and supervised models achieving 91% classification accuracy on medical records.",
    features: ["Transformer embeddings", "Supervised classification", "91% accuracy", "HIPAA-aware pipeline"],
    tech: ["HuggingFace", "Scikit-learn", "Python", "FastAPI"],
    color: "#b026ff",
    stat: "91% accuracy",
  },
  {
    title: "LLM Fine-tuning Pipeline",
    description: "LoRA-based fine-tuning system for domain-specific language model adaptation with structured evaluation workflows.",
    features: ["LoRA fine-tuning", "Evaluation workflows", "Hugging Face PEFT", "Custom datasets"],
    tech: ["HuggingFace PEFT", "PyTorch", "LoRA", "Python"],
    color: "#00f0ff",
    stat: "Custom domain LLM",
  },
];

export default function ProjectsApp() {
  return (
    <div className="p-5 space-y-5 font-mono">
      {PROJECTS.map((p, i) => (
        <div
          key={i}
          className="rounded-xl border p-5 transition-all hover:shadow-lg"
          style={{ borderColor: p.color + '30', background: `${p.color}08` }}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-bold text-white leading-tight">{p.title}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ml-2"
              style={{ color: p.color, borderColor: p.color + '50', background: p.color + '15' }}>
              {p.stat}
            </span>
          </div>

          <p className="text-gray-400 text-sm mb-3 leading-relaxed">{p.description}</p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {p.features.map((f, fi) => (
              <span key={fi} className="text-[11px] px-2 py-1 rounded border border-white/10 bg-white/5 text-gray-300">{f}</span>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {p.tech.map((t, ti) => (
              <span key={ti} className="text-[11px] px-2 py-1 rounded font-bold"
                style={{ color: p.color, background: p.color + '15', border: `1px solid ${p.color}30` }}>
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {[
              { label: "View Architecture", icon: Eye },
              { label: "View Code", icon: Github },
              { label: "Live Demo", icon: ExternalLink },
            ].map((btn, bi) => (
              <button key={bi}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all">
                <btn.icon size={12} />
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
