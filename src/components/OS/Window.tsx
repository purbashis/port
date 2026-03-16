"use client";

import { motion } from 'framer-motion';
import { Minus, X } from 'lucide-react';
import React from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

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
  const isMobile = useIsMobile();

  return (
    <motion.div
      drag={!isMobile}
      dragMomentum={false}
      dragElastic={0}
      initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.88, x: defaultPos.x, y: defaultPos.y }}
      animate={{ opacity: 1, scale: 1, x: isMobile ? 0 : undefined, y: isMobile ? 0 : undefined }}
      exit={{ opacity: 0, scale: isMobile ? 1 : 0.88, y: isMobile ? 50 : undefined }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      onMouseDown={onFocus}
      style={{
        zIndex,
        position: 'absolute',
        top: 0,
        left: isMobile ? 0 : 90,
        right: isMobile ? 0 : undefined,
        bottom: isMobile ? 0 : undefined,
        width: isMobile ? '100%' : undefined,
        height: isMobile ? '100%' : undefined,
        boxShadow: isMobile ? 'none' : `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${accentColor}20, 0 0 40px ${accentColor}10`,
      }}
      className={isMobile ? "flex flex-col bg-[#04040a]" : "w-[700px] max-w-[calc(100vw-130px)] rounded-2xl overflow-hidden flex flex-col"}
    >
      {/* ── Title Bar ── */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-grab active:cursor-grabbing flex-shrink-0 select-none"
        style={{
          background: isMobile 
            ? `linear-gradient(90deg, ${accentColor}25 0%, rgba(5,5,15,0.98) 100%)`
            : `linear-gradient(90deg, ${accentColor}18 0%, rgba(5,5,12,0.95) 60%, rgba(176,38,255,0.08) 100%)`,
          borderBottom: `1px solid ${accentColor}30`,
          backdropFilter: isMobile ? 'none' : 'blur(24px)',
        }}
      >
        {/* Traffic lights - hidden on mobile for cleaner look or just close button */}
        {!isMobile && (
          <>
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
          </>
        )}

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
        <button onClick={onClose} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
          <X size={18} style={{ color: accentColor }} />
        </button>
      </div>

      {/* ── Content ── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          background: isMobile ? 'transparent' : 'rgba(4, 4, 10, 0.92)',
          backdropFilter: isMobile ? 'none' : 'blur(20px)',
          borderLeft: isMobile ? 'none' : `1px solid ${accentColor}10`,
          borderRight: isMobile ? 'none' : `1px solid ${accentColor}10`,
          borderBottom: isMobile ? 'none' : `1px solid ${accentColor}10`,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
