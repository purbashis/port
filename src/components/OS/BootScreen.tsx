"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_SEQUENCE = [
  { prefix: "[BIOS]",   text: "Purbashis Neural BIOS v4.2.1 — POST check passed",          delay: 0    },
  { prefix: "[CPU]",    text: "8-Core AI inference engine detected @ 4.2 GHz",              delay: 300  },
  { prefix: "[RAM]",    text: "64 GB LPDDR5 — ECC enabled — all banks healthy",             delay: 550  },
  { prefix: "[GPU]",    text: "NVIDIA A100 80 GB — CUDA 12.4 — Tensor Cores online",        delay: 800  },
  { prefix: "[DISK]",   text: "NVMe 4 TB — Read: 7.4 GB/s — Knowledge partition mounted",  delay: 1050 },
  { prefix: "[NET]",    text: "Quantum-secure link established — latency: 0.3 ms",           delay: 1300 },
  { prefix: "[AI]",     text: "Loading neural embeddings… 12,847 vectors indexed",          delay: 1600 },
  { prefix: "[RAG]",    text: "Hybrid retriever online — BM25 + semantic fusion active",    delay: 1900 },
  { prefix: "[LLM]",   text: "Context window: 128k tokens — temperature: 0.7",             delay: 2150 },
  { prefix: "[ENV]",    text: "Mounting /home/purbashis — workspace ready",                 delay: 2400 },
  { prefix: "[SYS]",    text: "All subsystems nominal — starting desktop environment…",     delay: 2700 },
  { prefix: "[OK]",     text: "Booting PURBASHIS OS v1.0 ▎",                                delay: 3100, final: true },
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_SEQUENCE.forEach((_, idx) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, idx]);
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, BOOT_SEQUENCE[idx].delay);
      timers.push(t);
    });

    // Start fade-out after final message + 1.2 s
    const finalDelay = BOOT_SEQUENCE[BOOT_SEQUENCE.length - 1].delay + 1200;
    const doneTimer = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 600);
    }, finalDelay);
    timers.push(doneTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[999] bg-black flex flex-col overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)',
            }}
          />

          {/* Header strip */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#00ff41]/20 flex-shrink-0">
            <span className="text-[#00ff41] text-sm font-bold tracking-widest" style={{ fontFamily: 'var(--font-mono)', textShadow: '0 0 10px #00ff41' }}>
              PURBASHIS OS v1.0
            </span>
            <span suppressHydrationWarning className="text-[#00ff41]/50 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
              NEURAL BOOT SEQUENCE — {new Date().toLocaleDateString()}
            </span>
          </div>

          {/* Boot log */}
          <div className="flex-1 overflow-y-auto p-6 space-y-1">
            {BOOT_SEQUENCE.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: visibleLines.includes(idx) ? 1 : 0, x: visibleLines.includes(idx) ? 0 : -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 text-xs leading-5"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span
                  className="flex-shrink-0 w-16 text-right"
                  style={{
                    color: line.final ? '#00ff41' : line.prefix === '[AI]' || line.prefix === '[RAG]' || line.prefix === '[LLM]' ? '#00d4ff' : 'rgba(0,255,65,0.55)',
                    textShadow: line.final ? '0 0 10px #00ff41' : 'none',
                  }}
                >
                  {line.prefix}
                </span>
                <span
                  style={{
                    color: line.final ? '#00ff41' : 'rgba(0,255,65,0.85)',
                    textShadow: line.final ? '0 0 8px #00ff41' : 'none',
                    fontWeight: line.final ? 700 : 400,
                  }}
                >
                  {line.text}
                  {line.final && visibleLines.includes(idx) && (
                    <span style={{ animation: 'blink 1s step-end infinite', marginLeft: 2 }}>█</span>
                  )}
                </span>
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Progress bar */}
          <div className="px-6 py-4 border-t border-[#00ff41]/20 flex-shrink-0">
            <div className="flex justify-between text-[10px] mb-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(0,255,65,0.5)' }}>
              <span>SYSTEM INITIALISATION</span>
              <span>{Math.round((visibleLines.length / BOOT_SEQUENCE.length) * 100)}%</span>
            </div>
            <div className="h-1 bg-[#00ff41]/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #00ff41, #00d4ff)', boxShadow: '0 0 8px #00ff41' }}
                animate={{ width: `${(visibleLines.length / BOOT_SEQUENCE.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
