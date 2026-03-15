"use client";

import React from 'react';

const SKILL_GROUPS = [
  {
    category: "Languages",
    color: "#00f0ff",
    skills: [
      { name: "Python",  level: 95 },
      { name: "Go",      level: 65 },
      { name: "SQL",     level: 85 },
      { name: "C++",     level: 55 },
    ],
  },
  {
    category: "AI & ML",
    color: "#b026ff",
    skills: [
      { name: "LLMs",             level: 92 },
      { name: "RAG Systems",      level: 95 },
      { name: "Prompt Engineering", level: 88 },
      { name: "Embeddings",       level: 90 },
      { name: "Vector Search",    level: 87 },
    ],
  },
  {
    category: "Frameworks",
    color: "#00f0ff",
    skills: [
      { name: "LangChain",   level: 93 },
      { name: "LangGraph",   level: 80 },
      { name: "LlamaIndex",  level: 78 },
      { name: "FastAPI",     level: 91 },
      { name: "HuggingFace", level: 88 },
    ],
  },
  {
    category: "Databases & Cloud",
    color: "#b026ff",
    skills: [
      { name: "PostgreSQL",   level: 85 },
      { name: "FAISS / Chroma", level: 90 },
      { name: "AWS EC2 / S3", level: 80 },
      { name: "Docker / K8s", level: 75 },
    ],
  },
];

export default function SkillsApp() {
  return (
    <div className="p-5 font-mono space-y-6">
      {SKILL_GROUPS.map((group, i) => (
        <div key={i}>
          <h3 className="text-xs font-bold mb-3 tracking-widest" style={{ color: group.color }}>
            ── {group.category.toUpperCase()}
          </h3>
          <div className="space-y-3">
            {group.skills.map((skill, si) => (
              <div key={si}>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>{skill.name}</span>
                  <span style={{ color: group.color }}>{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${group.color}, ${group.color}80)`,
                      boxShadow: `0 0 8px ${group.color}60`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
