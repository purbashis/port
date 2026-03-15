"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  defaultPos: { x: number; y: number };
  zIndex: number;
  accentColor?: string;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
}

export default function Window({
  title, children, defaultPos, zIndex, accentColor = '#00f0ff',
  onClose, onMinimize, onFocus
}: WindowProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.88, x: defaultPos.x, y: defaultPos.y }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      onMouseDown={onFocus}
      style={{
        zIndex,
        position: 'absolute',
        top: 0,
        left: 90, // offset for the sidebar
        boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${accentColor}20, 0 0 40px ${accentColor}10`,
      }}
      className="w-[700px] max-w-[calc(100vw-130px)] rounded-2xl overflow-hidden flex flex-col"
    >
      {/* ── Title Bar ── */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-grab active:cursor-grabbing flex-shrink-0 select-none"
        style={{
          background: `linear-gradient(90deg, ${accentColor}18 0%, rgba(5,5,12,0.95) 60%, rgba(176,38,255,0.08) 100%)`,
          borderBottom: `1px solid ${accentColor}25`,
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Traffic lights */}
        <button
          onClick={onClose}
          className="w-3.5 h-3.5 rounded-full flex-shrink-0 group transition-all"
          style={{ background: 'linear-gradient(135deg, #ff5f57, #e03030)', boxShadow: '0 0 6px rgba(255,95,87,0.5)' }}
        >
          <X size={8} className="text-red-900/0 group-hover:text-red-900 m-auto" />
        </button>
        <button
          onClick={onMinimize}
          className="w-3.5 h-3.5 rounded-full flex-shrink-0 group transition-all"
          style={{ background: 'linear-gradient(135deg, #febc2e, #e0a010)', boxShadow: '0 0 6px rgba(254,188,46,0.5)' }}
        >
          <Minus size={8} className="text-yellow-900/0 group-hover:text-yellow-900 m-auto" />
        </button>
        <div
          className="w-3.5 h-3.5 rounded-full flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #28c840, #18a030)', boxShadow: '0 0 6px rgba(40,200,64,0.5)' }}
        />

        {/* Window title */}
        <div className="flex-1 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }} />
          <span
            className="text-sm font-semibold tracking-wider"
            style={{ color: accentColor, fontFamily: 'var(--font-sans)', textShadow: `0 0 10px ${accentColor}60` }}
          >
            {title.toUpperCase()}
          </span>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }} />
        </div>

        {/* Close X */}
        <button onClick={onClose} className="flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity">
          <X size={14} style={{ color: accentColor }} />
        </button>
      </div>

      {/* ── Content ── */}
      <div
        className="overflow-y-auto"
        style={{
          maxHeight: '72vh',
          background: 'rgba(4, 4, 10, 0.92)',
          backdropFilter: 'blur(20px)',
          borderLeft: `1px solid ${accentColor}10`,
          borderRight: `1px solid ${accentColor}10`,
          borderBottom: `1px solid ${accentColor}10`,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
