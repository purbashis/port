"use client";

import React from 'react';
import { motion } from 'framer-motion';

const JOBS = [
  {
    role: "Software Engineer – Generative AI & Analytics",
    company: "tickIoT Inc",
    period: "Nov 2023 – Oct 2025",
    color: "#00f0ff",
    highlights: [
      "Built 3 production-grade LLM and RAG applications end-to-end, from system design to AWS deployment.",
      "Architected RAG pipelines using LangChain and FAISS with hybrid retrieval, reducing hallucination by ~35%.",
      "Designed Python microservices using FastAPI for scalable LLM inference REST APIs.",
      "Deployed containerized AI services on AWS using Docker and CI/CD with monitoring dashboards.",
    ],
  },
  {
    role: "Freelance AI Consultant",
    company: "Independent",
    period: "Aug 2025 – Present",
    color: "#b026ff",
    highlights: [
      "Developing end-to-end LLM chatbot systems and RAG-based solutions for startups.",
      "Implemented LLM fine-tuning (LoRA) and structured evaluation workflows.",
      "Designed PostgreSQL-backed hybrid retrieval systems with vector embeddings.",
    ],
  },
];

export default function ExperienceApp() {
  return (
    <div className="p-5 font-mono space-y-6">
      {JOBS.map((job, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          className="rounded-xl border p-5"
          style={{ borderColor: job.color + '30', background: job.color + '06' }}
        >
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-bold text-white text-sm">{job.role}</h3>
              <p className="text-xs" style={{ color: job.color }}>{job.company}</p>
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0 ml-3 mt-1">{job.period}</span>
          </div>

          <ul className="mt-3 space-y-2">
            {job.highlights.map((h, hi) => (
              <li key={hi} className="flex gap-2 text-xs text-gray-300 leading-relaxed">
                <span style={{ color: job.color }} className="flex-shrink-0 mt-0.5">▸</span>
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
