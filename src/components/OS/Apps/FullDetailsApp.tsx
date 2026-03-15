"use client";

import { motion } from 'framer-motion';
import {
  Briefcase,
  Cpu,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  User,
  Zap
} from 'lucide-react';
import React from 'react';

// ── Full resume data from Purbashis Behera's CV ──────────────────────────

const Section = ({ icon: Icon, title, color, children }: { icon: React.ElementType; title: string; color: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-4 pb-2" style={{ borderBottom: `1px solid ${color}30` }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
        <Icon size={16} style={{ color }} />
      </div>
      <h2 className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color, fontFamily: 'var(--font-mono)' }}>{title}</h2>
    </div>
    {children}
  </div>
);

const Badge = ({ text, color = '#00f0ff' }: { text: string; color?: string }) => (
  <span
    className="inline-block text-[10px] px-2 py-0.5 rounded-full mr-1.5 mb-1.5 font-medium"
    style={{ background: `${color}14`, border: `1px solid ${color}35`, color: `${color}dd`, fontFamily: 'var(--font-sans)' }}
  >
    {text}
  </span>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="text-xs leading-relaxed pl-4 mb-1.5 relative" style={{ color: 'rgba(200,210,230,0.75)', fontFamily: 'var(--font-sans)' }}>
    <span className="absolute left-0" style={{ color: '#00f0ff' }}>▸</span>
    {children}
  </li>
);

export default function FullDetailsApp() {
  return (
    <div className="p-6 overflow-y-auto" style={{ fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 pb-6 relative"
        style={{ borderBottom: '1px solid rgba(0,240,255,0.12)' }}
      >
        {/* Avatar placeholder */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(176,38,255,0.2))', border: '2px solid rgba(0,240,255,0.4)', boxShadow: '0 0 30px rgba(0,240,255,0.2)' }}>
          <User size={36} style={{ color: '#00f0ff' }} />
        </div>

        <h1 className="text-2xl font-black tracking-wide text-white mb-1">Purbashis Behera</h1>
        <p className="text-sm mb-3" style={{ color: 'rgba(0,240,255,0.7)', fontFamily: 'var(--font-mono)' }}>
          Software Engineer · Python · LLMs · RAG · Distributed AI Systems
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px]" style={{ color: 'rgba(180,190,210,0.7)' }}>
          <a href="tel:+918327705613" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
            <Phone size={11} style={{ color: '#00f0ff' }} /> +91-8327705613
          </a>
          <a href="mailto:purbashis31@gmail.com" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
            <Mail size={11} style={{ color: '#b026ff' }} /> purbashis31@gmail.com
          </a>
          <a href="https://linkedin.com/in/purbashis-behera" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
            <Linkedin size={11} style={{ color: '#0A66C2' }} /> linkedin.com/in/purbashis-behera
          </a>
          <a href="https://github.com/Purbashis" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors">
            <Github size={11} style={{ color: '#fff' }} /> github.com/purbashis
          </a>
        </div>
      </motion.div>

      {/* ── Summary ── */}
      <Section icon={User} title="Summary" color="#00f0ff">
        <p className="text-xs leading-6" style={{ color: 'rgba(200,210,230,0.8)' }}>
          Software Engineer with <strong style={{ color: '#00f0ff' }}>2+ years</strong> of experience building production‑grade LLM‑powered systems and scalable Python microservices. Strong background in <strong style={{ color: '#b026ff' }}>Retrieval‑Augmented Generation (RAG)</strong>, LLM fine‑tuning, data vectorization, and hybrid semantic retrieval using PostgreSQL and vector databases. Experienced in deploying distributed AI services on <strong style={{ color: '#00f0ff' }}>AWS</strong> with Docker and CI/CD. Focused on building reliable, high‑performance, and maintainable AI infrastructure.
        </p>
      </Section>

      {/* ── Technical Skills ── */}
      <Section icon={Cpu} title="Technical Expertise" color="#b026ff">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {[
            { 
              category: 'AI & Machine Learning',
              color: '#00f0ff',
              skills: [
                { name: 'LLMs & RAG', level: 95 },
                { name: 'Fine-tuning (LoRA)', level: 88 },
                { name: 'Vector DBs (FAISS)', level: 92 },
                { name: 'NLP Transformers', level: 90 },
              ]
            },
            { 
              category: 'Engineering & Systems',
              color: '#b026ff',
              skills: [
                { name: 'Python (Expert)', level: 96 },
                { name: 'FastAPI / Microservices', level: 92 },
                { name: 'AWS (Cloud)', level: 85 },
                { name: 'Docker / CI/CD', level: 88 },
              ]
            }
          ].map(cat => (
            <div key={cat.category} className="space-y-4">
              <h3 className="text-[10px] font-black tracking-widest uppercase opacity-50 mb-4" style={{ color: cat.color }}>{cat.category}</h3>
              {cat.skills.map(skill => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-gray-300">{skill.name}</span>
                    <span style={{ color: cat.color, fontFamily: 'var(--font-mono)' }}>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                      className="h-full rounded-full relative" 
                      style={{ background: `linear-gradient(90deg, ${cat.color}80, ${cat.color})`, boxShadow: `0 0 10px ${cat.color}40` }}
                    >
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white/20"
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Secondary Skills Tag Cloud */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">Additional Stack</div>
          <div className="flex flex-wrap gap-2">
            {['LangChain', 'LangGraph', 'LlamaIndex', 'HuggingFace', 'PostgreSQL', 'GO', 'SQL', 'Kubernetes', 'REST APIs', 'Monitoring'].map(s => (
              <Badge key={s} text={s} color="#ff6af0" />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Experience ── */}
      <Section icon={Briefcase} title="Experience" color="#00f0ff">
        {/* tickIoT */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="mb-6 pl-4 relative" style={{ borderLeft: '2px solid rgba(0,240,255,0.3)' }}>
          <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1" style={{ background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }} />
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <div>
              <h3 className="text-sm font-bold text-white">Software Engineer I — Generative AI & Analytics</h3>
              <p className="text-xs" style={{ color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>tickIoT Inc</p>
            </div>
            <div className="text-right">
              <p className="text-[11px]" style={{ color: 'rgba(180,190,210,0.6)', fontFamily: 'var(--font-mono)' }}>Nov 2023 – Oct 2025</p>
              <p className="text-[11px]" style={{ color: 'rgba(180,190,210,0.4)' }}>Remote (USA)</p>
            </div>
          </div>
          <ul>
            <Bullet>Built 3 production-grade LLM and RAG applications end-to-end, from system design to AWS deployment, serving enterprise analytics workflows.</Bullet>
            <Bullet>Architected optimized RAG pipelines using LangChain and FAISS with hybrid retrieval (vector + PostgreSQL filtering), reducing hallucination rate by <strong style={{ color: '#00f0ff' }}>~35%</strong>.</Bullet>
            <Bullet>Designed Python microservices using FastAPI to expose LLM inference as scalable REST APIs handling concurrent requests.</Bullet>
            <Bullet>Implemented data vectorization pipelines, embedding storage, and semantic search infrastructure.</Bullet>
            <Bullet>Deployed containerized AI services on AWS (EC2/ECS) using Docker and CI/CD; implemented monitoring dashboards tracking latency and reliability.</Bullet>
            <Bullet>Collaborated cross-functionally to convert business requirements into scalable AI systems.</Bullet>
          </ul>
        </motion.div>

        {/* Freelance */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="mb-2 pl-4 relative" style={{ borderLeft: '2px solid rgba(176,38,255,0.3)' }}>
          <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1" style={{ background: '#b026ff', boxShadow: '0 0 8px #b026ff' }} />
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <div>
              <h3 className="text-sm font-bold text-white">Freelance Generative AI Consultant</h3>
              <p className="text-xs" style={{ color: '#b026ff', fontFamily: 'var(--font-mono)' }}>Independent · Remote</p>
            </div>
            <p className="text-[11px]" style={{ color: 'rgba(180,190,210,0.6)', fontFamily: 'var(--font-mono)' }}>Aug 2025 – Present</p>
          </div>
          <ul>
            <Bullet>Developed end-to-end LLM chatbot systems and RAG-based solutions for startups using modular Python architecture.</Bullet>
            <Bullet>Implemented LLM fine-tuning (LoRA) and structured evaluation workflows to improve domain-specific accuracy.</Bullet>
            <Bullet>Designed PostgreSQL-backed hybrid retrieval systems integrating structured metadata with vector embeddings.</Bullet>
          </ul>
        </motion.div>
      </Section>

      {/* ── Selected Projects ── */}
      <Section icon={Zap} title="Selected Projects" color="#ff6af0">
        {[
          {
            name: 'Enterprise RAG Knowledge Assistant',
            year: '2025',
            color: '#00f0ff',
            badge: '-40% Hallucination',
            bullets: [
              'Designed scalable RAG system using LangChain, OpenAI APIs, and FAISS for enterprise document search.',
              'Built hybrid semantic retrieval with PostgreSQL metadata filtering.',
              'Exposed inference via FastAPI; deployed Dockerized services on AWS with CI/CD automation.',
              'Reduced hallucination rate by 40% through optimized retrieval configuration and prompt engineering.',
            ],
          },
          {
            name: 'LLM-Powered Healthcare NLP System',
            year: '2025',
            color: '#b026ff',
            badge: '91% Accuracy',
            bullets: [
              'Built NLP pipeline combining transformer embeddings with supervised ML classifiers achieving 91% accuracy.',
              'Implemented clustering and classification models using Scikit-learn.',
              'Developed evaluation, latency monitoring, and modular architecture for production-style reliability.',
            ],
          },
        ].map((proj, i) => (
          <motion.div key={proj.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            className="mb-5 p-4 rounded-xl" style={{ background: `${proj.color}08`, border: `1px solid ${proj.color}25` }}>
            <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
              <h3 className="text-sm font-bold" style={{ color: proj.color }}>{proj.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${proj.color}22`, color: proj.color, border: `1px solid ${proj.color}50` }}>
                  {proj.badge}
                </span>
                <span className="text-[10px]" style={{ color: 'rgba(180,190,210,0.5)', fontFamily: 'var(--font-mono)' }}>{proj.year}</span>
              </div>
            </div>
            <ul>{proj.bullets.map((b, j) => <Bullet key={j}>{b}</Bullet>)}</ul>
          </motion.div>
        ))}
      </Section>

      {/* ── Education ── */}
      <Section icon={GraduationCap} title="Education" color="#00ff41">
        {[
          {
            degree: 'Master of Computer Applications (MCA)',
            inst: 'Institute of Management & Information Technology',
            period: '2020 – 2023',
            grade: 'CGPA: 8.86 / 10',
            color: '#00f0ff',
          },
          {
            degree: 'Bachelor of Science in Information Technology',
            inst: 'Centurion University of Technology and Management',
            period: '2017 – 2020',
            grade: 'CGPA: 9.05 / 10',
            color: '#b026ff',
          },
        ].map((edu, i) => (
          <motion.div key={edu.degree} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
            className="flex justify-between items-start mb-4 pb-4 gap-3" style={{ borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div>
              <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
              <p className="text-[11px] mt-0.5" style={{ color: edu.color, fontFamily: 'var(--font-mono)' }}>{edu.inst}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[11px]" style={{ color: 'rgba(180,190,210,0.6)', fontFamily: 'var(--font-mono)' }}>{edu.period}</p>
              <p className="text-[11px] font-bold mt-0.5" style={{ color: '#00ff41' }}>{edu.grade}</p>
            </div>
          </motion.div>
        ))}
      </Section>

    </div>
  );
}
