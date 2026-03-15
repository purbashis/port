"use client";

import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

const SECTIONS = [
  {
    heading: "Summary",
    content: "Software Engineer with 2+ years of experience building production-grade LLM-powered systems and scalable Python microservices. Strong background in RAG, LLM fine-tuning, data vectorization, and hybrid semantic retrieval.",
    color: "#00f0ff",
  },
  {
    heading: "Experience",
    content: "Software Engineer – tickIoT Inc (2023–2025) · Freelance AI Consultant (2025–Present)",
    color: "#b026ff",
  },
  {
    heading: "Education",
    content: "B.Tech – Computer Science & Engineering",
    color: "#00f0ff",
  },
  {
    heading: "Key Skills",
    content: "Python · LLMs · RAG · LangChain · FastAPI · Vector DBs · AWS · Docker · HuggingFace · Prompt Engineering",
    color: "#b026ff",
  },
];

export default function ResumeApp() {
  return (
    <div className="p-6 font-mono space-y-5">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-white font-bold text-lg">Purbashis Behera</h2>
          <p className="text-[#00f0ff] text-xs tracking-wide">Software Engineer | Python | LLMs | RAG | Distributed AI Systems</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00f0ff]/30 to-[#b026ff]/30 border border-white/20 flex items-center justify-center">
          <FileText size={22} className="text-[#00f0ff]" />
        </div>
      </div>

      <div className="space-y-4">
        {SECTIONS.map((s, i) => (
          <div key={i} className="border-l-2 pl-3" style={{ borderColor: s.color }}>
            <div className="text-xs font-bold mb-1" style={{ color: s.color }}>{s.heading}</div>
            <div className="text-gray-300 text-xs leading-relaxed">{s.content}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-4 flex gap-3">
        <a href="#" className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] text-sm hover:bg-[#00f0ff]/20 transition-all">
          <Download size={14} /> Download PDF
        </a>
        <a href="#" className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-all">
          <ExternalLink size={14} /> View Online
        </a>
      </div>
    </div>
  );
}
