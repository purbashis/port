"use client";

import { AnimatePresence, motion } from 'framer-motion';
import {
  BrainCircuit, Clock4,
  FileUser,
  FolderGit2,
  MessageSquareText,
  ScrollText,
  Sparkles,
  TerminalSquare
} from 'lucide-react';
import React, { useCallback, useEffect, useReducer, useState } from 'react';

// Fix TypeScript module resolution by ensuring files are imported with exact paths
import AIAssistant from './AIAssistant';
import AISystemsApp from './Apps/AISystemsApp';
import ContactApp from './Apps/ContactApp';
import ExperienceApp from './Apps/ExperienceApp';
import FullDetailsApp from './Apps/FullDetailsApp';
import ProjectsApp from './Apps/ProjectsApp';
import ResumeApp from './Apps/ResumeApp';
import SkillsApp from './Apps/SkillsApp';
import TerminalApp from './Apps/TerminalApp';
import Window from './Window';
import { useIsMobile } from '../../hooks/useIsMobile';

// ── App Registry ──────────────────────────────────────────────────────────
type AppId = 'projects' | 'ai' | 'experience' | 'skills' | 'resume' | 'contact' | 'terminal' | 'fulldetails';

interface AppDef {
  id: AppId;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  gradient: string;
  defaultPos: { x: number; y: number };
  component: React.ElementType;
}

const APPS: AppDef[] = [
  {
    id: 'fulldetails', label: 'Full Details', sublabel: 'Resume',
    icon: ScrollText,
    color: '#f0c040', glow: 'rgba(240,192,64,0.55)', gradient: 'linear-gradient(135deg,#f0c04030,#f0c04008)',
    defaultPos: { x: 110, y: 50 }, component: FullDetailsApp,
  },
  {
    id: 'projects', label: 'Projects', sublabel: '3 systems',
    icon: FolderGit2,
    color: '#00f0ff', glow: 'rgba(0,240,255,0.55)', gradient: 'linear-gradient(135deg,#00f0ff30,#00f0ff08)',
    defaultPos: { x: 370, y: 50 }, component: ProjectsApp,
  },
  {
    id: 'ai', label: 'AI Systems', sublabel: 'RAG·LangGraph·ML',
    icon: BrainCircuit,
    color: '#b026ff', glow: 'rgba(176,38,255,0.55)', gradient: 'linear-gradient(135deg,#b026ff30,#b026ff08)',
    defaultPos: { x: 630, y: 50 }, component: AISystemsApp,
  },
  {
    id: 'experience', label: 'Experience', sublabel: '2+ years',
    icon: Clock4,
    color: '#00d4ff', glow: 'rgba(0,212,255,0.55)', gradient: 'linear-gradient(135deg,#00d4ff30,#00d4ff08)',
    defaultPos: { x: 110, y: 300 }, component: ExperienceApp,
  },
  {
    id: 'skills', label: 'Skills', sublabel: 'LLMs/RAG',
    icon: Sparkles,
    color: '#ff6af0', glow: 'rgba(255,106,240,0.55)', gradient: 'linear-gradient(135deg,#ff6af030,#ff6af008)',
    defaultPos: { x: 370, y: 300 }, component: SkillsApp,
  },
  {
    id: 'contact', label: 'Contact', sublabel: 'Hire me',
    icon: MessageSquareText,
    color: '#a0ff60', glow: 'rgba(160,255,96,0.55)', gradient: 'linear-gradient(135deg,#a0ff6030,#a0ff6008)',
    defaultPos: { x: 630, y: 300 }, component: ContactApp,
  },
  {
    id: 'resume', label: 'Resume', sublabel: 'Download',
    icon: FileUser,
    color: '#ff9040', glow: 'rgba(255,144,64,0.55)', gradient: 'linear-gradient(135deg,#ff904030,#ff904008)',
    defaultPos: { x: 110, y: 550 }, component: ResumeApp,
  },
  {
    id: 'terminal', label: 'Terminal', sublabel: 'root@ai',
    icon: TerminalSquare,
    color: '#00ff41', glow: 'rgba(0,255,65,0.55)', gradient: 'linear-gradient(135deg,#00ff4130,#00ff4108)',
    defaultPos: { x: 370, y: 550 }, component: TerminalApp,
  },
];

// ── Window State ──────────────────────────────────────────────────────────
interface WinState { id: AppId; zIndex: number; minimized: boolean }
type Action =
  | { type: 'OPEN'; id: AppId }
  | { type: 'CLOSE'; id: AppId }
  | { type: 'FOCUS'; id: AppId }
  | { type: 'MINIMIZE'; id: AppId };

function reducer(state: WinState[], action: Action): WinState[] {
  const maxZ = state.length > 0 ? Math.max(...state.map(s => s.zIndex)) : 10;
  switch (action.type) {
    case 'OPEN': {
      if (state.find(s => s.id === action.id))
        return state.map(s => s.id === action.id ? { ...s, minimized: false, zIndex: maxZ + 1 } : s);
      return [...state, { id: action.id, zIndex: maxZ + 1, minimized: false }];
    }
    case 'CLOSE': return state.filter(s => s.id !== action.id);
    case 'FOCUS': return state.map(s => s.id === action.id ? { ...s, zIndex: maxZ + 1 } : s);
    case 'MINIMIZE': return state.map(s => s.id === action.id ? { ...s, minimized: true } : s);
    default: return state;
  }
}

// ── Animated Background ──────────────────────────────────────────────────
function DesktopBackground() {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0" style={{ background: isMobile ? '#020205' : 'radial-gradient(ellipse 100% 70% at 50% 10%, #080018 0%, #040412 55%, #000 100%)' }} />

      {/* Animated orbs - simplified/disabled for mobile performance */}
      {!isMobile && (
        <>
          <motion.div className="absolute rounded-full"
            style={{ width: 800, height: 800, top: -300, left: -250, background: 'radial-gradient(circle, rgba(0,240,255,0.14) 0%, transparent 70%)', filter: 'blur(60px)' }}
            animate={{ x: [0, 80, 0], y: [0, 50, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full"
            style={{ width: 700, height: 700, bottom: -200, right: -200, background: 'radial-gradient(circle, rgba(176,38,255,0.16) 0%, transparent 70%)', filter: 'blur(60px)' }}
            animate={{ x: [0, -60, 0], y: [0, -70, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />
          <motion.div className="absolute rounded-full"
            style={{ width: 500, height: 500, top: '30%', right: '20%', background: 'radial-gradient(circle, rgba(240,192,64,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }}
            animate={{ x: [0, 60, -40, 0], y: [0, -50, 40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 8 }} />
        </>
      )}

      {/* Grid - invisible on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0" style={{
          opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(0,240,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,1) 1px,transparent 1px)',
          backgroundSize: '65px 65px',
        }} />
      )}
      {/* Horizon line */}
      <div className="absolute left-0 right-0" style={{ top: '38%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,240,255,0.15),rgba(176,38,255,0.15),transparent)', opacity: isMobile ? 0.3 : 1 }} />

      {/* Corner brackets */}
      {([
        { pos: { top: isMobile ? 55 : 44, left: isMobile ? 12 : 100 } as React.CSSProperties, bt: true,  bb: false, bl: true,  br: false },
        { pos: { top: isMobile ? 55 : 44, right: 16 } as React.CSSProperties, bt: true,  bb: false, bl: false, br: true  },
        { pos: { bottom: 56, left: isMobile ? 12 : 100 } as React.CSSProperties, bt: false, bb: true,  bl: true,  br: false },
        { pos: { bottom: 56, right: 16 } as React.CSSProperties, bt: false, bb: true,  bl: false, br: true  },
      ] as const).map((c, i) => (
        <div key={i} className="absolute w-6 h-6 opacity-25" style={{
          ...c.pos,
          borderTop:    c.bt ? '1.5px solid #00f0ff' : undefined,
          borderBottom: c.bb ? '1.5px solid #00f0ff' : undefined,
          borderLeft:   c.bl ? '1.5px solid #00f0ff' : undefined,
          borderRight:  c.br ? '1.5px solid #00f0ff' : undefined,
        }} />
      ))}
    </div>
  );
}

// ── Desktop ───────────────────────────────────────────────────────────────
export default function Desktop() {
  const isMobile = useIsMobile();
  const [windows, dispatch] = useReducer(reducer, []);
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const open = useCallback((id: AppId) => dispatch({ type: 'OPEN', id }), []);
  const close = useCallback((id: AppId) => dispatch({ type: 'CLOSE', id }), []);
  const focus = useCallback((id: AppId) => dispatch({ type: 'FOCUS', id }), []);
  const minimize = useCallback((id: AppId) => dispatch({ type: 'MINIMIZE', id }), []);

  const taskbarApps = APPS.filter(a => windows.find(w => w.id === a.id));

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden select-none" style={{ fontFamily: 'var(--font-sans)' }}>

      {/* ── Top Bar ──────────────────────────────────────── */}
      <div className="h-11 flex items-center justify-between px-4 flex-shrink-0 z-50 relative"
        style={{ background: 'rgba(5,5,18,0.92)', borderBottom: '1px solid rgba(0,240,255,0.14)', backdropFilter: isMobile ? 'none' : 'blur(24px)' }}>

        {/* Left */}
        <div className="flex items-center gap-3">
          {!isMobile && (
            <div className="flex gap-1.5">
              {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}80` }} />)}
            </div>
          )}
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-black tracking-[0.18em]`}
            style={{ fontFamily: 'var(--font-mono)', background: 'linear-gradient(90deg,#00f0ff,#b026ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {isMobile ? 'PURBASHIS OS' : 'PURBASHIS OS v1.0'}
          </span>
        </div>

        {/* Center - hidden on mobile */}
        {!isMobile && (
          <div className="flex items-center gap-2 text-[10px]" style={{ fontFamily: 'var(--font-mono)' }}>
            {[
              { label: '● ONLINE', bg: 'rgba(0,255,65,0.12)', border: 'rgba(0,255,65,0.35)', color: '#00ff41' },
            ].map(pill => (
              <span key={pill.label} className="px-2.5 py-1 rounded-full" style={{ background: pill.bg, border: `1px solid ${pill.border}`, color: pill.color }}>
                {pill.label}
              </span>
            ))}
          </div>
        )}

        {/* Right - clock */}
        <div suppressHydrationWarning className="text-[10px] px-3 py-1.5 rounded-full font-mono"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(0,240,255,0.6)', background: 'rgba(0,240,255,0.07)', border: '1px solid rgba(0,240,255,0.15)' }}>
          {clock}
        </div>
      </div>

      {/* ── Desktop Area ─────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">
        <DesktopBackground />

        {/* Watermark - adjusted for mobile */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none ${isMobile ? 'px-6' : 'pl-[100px]'}`}>
          <div className="text-center">
            <div className={`font-black tracking-tighter leading-none ${isMobile ? 'text-[4.5rem]' : 'text-[clamp(3rem,9vw,8rem)]'}`}
              style={{ background: 'linear-gradient(135deg,rgba(0,240,255,0.06),rgba(176,38,255,0.05))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              PURBASHIS
            </div>
            <div className="text-[11px] tracking-[0.45em] mt-2" style={{ color: 'rgba(0,240,255,0.1)', fontFamily: 'var(--font-mono)' }}>
              AI · LLMs · RAG · DISTRIBUTED SYSTEMS
            </div>
          </div>
        </div>

        {/* ── Icon Area (Sidebar vs Grid) ────────────────── */}
        <div className={isMobile 
          ? "absolute top-11 bottom-12 left-0 right-0 p-6 z-10 grid grid-cols-3 gap-4 content-start overflow-y-auto"
          : "absolute top-0 bottom-0 left-0 flex flex-col items-center justify-center gap-1 py-4 z-10 w-[96px]"
        }
          style={{ 
            background: isMobile ? 'transparent' : 'linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.2),rgba(0,0,0,0.35))', 
            backdropFilter: isMobile ? 'none' : 'blur(16px)', 
            borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.06)' 
          }}>

          {APPS.map((app, i) => {
            const isOpen = !!windows.find(w => w.id === app.id);
            return (
              <motion.button key={app.id} onClick={() => open(app.id)}
                className={`flex flex-col items-center gap-1 group relative cursor-pointer ${isMobile ? 'w-full' : 'w-full py-2.5 px-1.5'}`}
                whileHover={isMobile ? {} : { scale: 1.08, x: 3 }}
                whileTap={{ scale: 0.94 }}
                initial={{ opacity: 0, x: isMobile ? 0 : -24, y: isMobile ? 20 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                {/* Active indicator bar - Desktop only */}
                {!isMobile && isOpen && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-r-full"
                    style={{ background: app.color, boxShadow: `0 0 8px ${app.color}` }} />
                )}

                {/* Icon box */}
                <div className={`${isMobile ? 'w-16 h-16' : 'w-12 h-12'} rounded-2xl flex items-center justify-center relative transition-all duration-250`}
                  style={{ 
                    background: app.gradient, 
                    border: `1px solid ${app.color}${isMobile ? '45' : '35'}`,
                    boxShadow: isMobile && isOpen ? `0 0 15px ${app.glow}` : 'none'
                  }}>
                  <app.icon size={isMobile ? 28 : 22} style={{ color: app.color, filter: `drop-shadow(0 0 5px ${app.color})` }} />
                </div>

                {/* Labels */}
                <span className={`${isMobile ? 'text-[10px]' : 'text-[9px]'} font-semibold tracking-wide text-center leading-tight`}
                  style={{ color: app.color, opacity: (isOpen || isMobile) ? 1 : 0.65, fontFamily: 'var(--font-sans)' }}>
                  {app.label}
                </span>
                {!isMobile && (
                  <span className="text-[8px] text-center" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>
                    {app.sublabel}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* ── Windows ──────────────────────────────────── */}
        <AnimatePresence>
          {windows.map((ws, _i, arr) => {
            if (ws.minimized) return null;
            // On mobile, only show the top-most unminimized window to prevent clipping and performance issues
            const unminimizedWindows = arr.filter(w => !w.minimized);
            const maxZ = unminimizedWindows.length > 0 ? Math.max(...unminimizedWindows.map(w => w.zIndex)) : -1;
            if (isMobile && ws.zIndex < maxZ) return null;

            const def = APPS.find(a => a.id === ws.id)!;
            return (
              <Window key={ws.id} title={def.label} defaultPos={def.defaultPos}
                zIndex={ws.zIndex} accentColor={def.color}
                onFocus={() => focus(ws.id)} onClose={() => close(ws.id)} onMinimize={() => minimize(ws.id)}>
                <def.component />
              </Window>
            );
          })}
        </AnimatePresence>

        {/* ── AI Assistant ─────────────────────────────── */}
        <AIAssistant />
      </div>

      {/* ── Taskbar ──────────────────────────────────── */}
      <div className="h-12 flex items-center gap-2 px-4 flex-shrink-0 z-50 overflow-x-auto"
        style={{ background: 'rgba(4,4,18,0.95)', borderTop: '1px solid rgba(0,240,255,0.1)', backdropFilter: isMobile ? 'none' : 'blur(24px)' }}>
        {!isMobile && <span className="text-[9px] mr-2 flex-shrink-0" style={{ color: 'rgba(0,240,255,0.3)', fontFamily: 'var(--font-mono)' }}>▸ ACTIVE</span>}
        
        {taskbarApps.length === 0 ? (
          <span className="text-[10px] opacity-40 ml-2" style={{ fontFamily: 'var(--font-mono)' }}>
            {isMobile ? 'OS Ready' : 'Click an icon to launch an app'}
          </span>
        ) : (
          taskbarApps.map(app => {
            const ws = windows.find(w => w.id === app.id)!;
            return (
              <motion.button key={app.id} onClick={() => ws.minimized ? open(app.id) : minimize(app.id)}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] flex-shrink-0 transition-all font-medium"
                style={{ 
                  background: ws.minimized ? 'rgba(255,255,255,0.04)' : `${app.color}14`, 
                  border: `1px solid ${ws.minimized ? 'rgba(255,255,255,0.08)' : app.color + '42'}`, 
                  color: ws.minimized ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.85)', 
                  fontFamily: 'var(--font-sans)' 
                }}>
                <app.icon size={12} style={{ color: app.color }} />
                {!isMobile && app.label}
              </motion.button>
            );
          })
        )}
        
        <div className="ml-auto flex-shrink-0 text-[10px] font-mono" style={{ color: 'rgba(0,240,255,0.3)' }}>
          {isMobile ? 'PB' : 'Python · LLMs · RAG · AWS'}
        </div>
      </div>
    </div>
  );
}
