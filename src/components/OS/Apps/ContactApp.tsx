"use client";

import React from 'react';
import { Mail, Phone, Linkedin, Github, Download } from 'lucide-react';

export default function ContactApp() {
  return (
    <div className="p-6 font-mono space-y-5">
      <div className="text-[#00f0ff] font-bold text-sm mb-4">── Contact Details ──────────────</div>

      {[
        { label: "Name",  value: "Purbashis Behera",       icon: null },
        { label: "Email", value: "purbashis31@gmail.com",  icon: Mail },
        { label: "Phone", value: "+91-8327705613",          icon: Phone },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 text-sm">
          <span className="text-gray-500 w-16">{item.label}:</span>
          <span className="text-gray-200 flex items-center gap-2">
            {item.icon && <item.icon size={14} className="text-[#00f0ff]" />}
            {item.value}
          </span>
        </div>
      ))}

      <div className="border-t border-white/10 pt-4 space-y-3">
        <div className="text-[#b026ff] font-bold text-xs mb-3 tracking-widest">── ACTIONS</div>
        {[
          { label: "Open LinkedIn",    icon: Linkedin, href: "https://linkedin.com/in/purbashis-behera", color: "#00f0ff" },
          { label: "Open GitHub",      icon: Github,   href: "https://github.com/Purbashis",            color: "#b026ff" },
          { label: "Download Resume",  icon: Download, href: "#",                                        color: "#00f0ff" },
        ].map((btn, i) => (
          <a
            key={i}
            href={btn.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-300 hover:text-white group"
            style={{ borderColor: btn.color + '20' }}
          >
            <btn.icon size={16} style={{ color: btn.color }} className="group-hover:scale-110 transition-transform" />
            {btn.label}
          </a>
        ))}
      </div>
    </div>
  );
}
