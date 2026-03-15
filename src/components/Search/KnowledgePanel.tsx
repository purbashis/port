import React from 'react';
import { ExternalLink, Share2, MoreVertical, Sparkles } from 'lucide-react';
import { RESUME } from '@/lib/data';

export default function KnowledgePanel() {
  return (
    <div className="glass-panel border-white/10 rounded-2xl p-0 overflow-hidden w-full max-w-[360px] ml-10 hidden lg:block pb-6 relative group bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      {/* Background glow animated */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#b026ff]/10 rounded-full blur-3xl -z-10 group-hover:bg-[#b026ff]/20 transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00f0ff]/10 rounded-full blur-3xl -z-10 group-hover:bg-[#00f0ff]/20 transition-colors duration-500"></div>

      <div className="flex justify-between items-center px-5 py-4 border-b border-white/10 mb-3 bg-[#0a0a0f]/60 backdrop-blur-sm">
        <h2 className="text-[20px] font-medium text-gray-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#b026ff]" />
          Entity Overview
        </h2>
        <div className="flex gap-2 text-gray-400">
          <button className="hover:bg-white/10 p-2 rounded-full transition-colors hover:text-[#00f0ff]"><Share2 size={18} /></button>
          <button className="hover:bg-white/10 p-2 rounded-full transition-colors hover:text-[#00f0ff]"><MoreVertical size={18} /></button>
        </div>
      </div>
      
      <div className="px-5">
        <div className="flex gap-2 mb-5 h-[140px] overflow-hidden rounded-xl">
          <div className="bg-gradient-to-br from-[#00f0ff]/20 to-[#b026ff]/20 backdrop-blur-md flex-[2] relative h-full flex justify-center items-center text-[#b026ff]/50 font-bold tracking-widest border border-[#00f0ff]/30 shadow-inner">
            [HOLOGRAPHIC_AVATAR]
          </div>
          <div className="flex-[1] flex flex-col gap-2 h-full">
            <div className="bg-gradient-to-tr from-cyan-900/30 to-blue-900/30 backdrop-blur-md h-full w-full rounded-lg border border-white/10"></div>
            <div className="bg-gradient-to-tr from-purple-900/30 to-pink-900/30 backdrop-blur-md h-full w-full rounded-lg border border-white/10"></div>
          </div>
        </div>

        <h2 className="text-[28px] font-medium text-gray-100 mb-1 leading-tight tracking-tight">{RESUME.name}</h2>
        <div className="text-[14px] font-medium text-[#00f0ff] mb-5 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">{RESUME.title}</div>

        <div className="text-[14px] text-gray-300 leading-[1.6] mb-5 bg-[#0a0a0f]/60 p-3 rounded-lg border border-white/10">
          {RESUME.summary}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-5">
          <div className="flex items-center text-[14px]">
            <span className="font-medium text-gray-400 w-24">Neural Links:</span>
            <div className="flex gap-3">
              <a href={`https://${RESUME.linkedin}`} className="flex items-center gap-1.5 text-gray-300 hover:text-[#00f0ff] transition-colors font-medium bg-white/5 px-2 py-1 rounded-md border border-white/10 hover:border-[#00f0ff]/50" target="_blank" rel="noreferrer">
                <div className="w-5 h-5 bg-[#00f0ff]/20 rounded flex items-center justify-center text-[10px] font-bold text-[#00f0ff]">in</div>
                <span>LinkedIn</span>
              </a>
              <a href={`https://${RESUME.github}`} className="flex items-center gap-1.5 text-gray-300 hover:text-[#b026ff] transition-colors font-medium bg-white/5 px-2 py-1 rounded-md border border-white/10 hover:border-[#b026ff]/50" target="_blank" rel="noreferrer">
                <div className="w-5 h-5 bg-gray-700/50 rounded flex items-center justify-center text-[10px] font-bold text-gray-300">gh</div>
                <span>GitHub</span>
              </a>
            </div>
          </div>
          <div className="flex items-center text-[14px] mt-1">
            <span className="font-medium text-gray-400 w-24">Comms:</span>
            <a href={`mailto:${RESUME.email}`} className="text-[#00f0ff] hover:text-[#b026ff] transition-colors font-medium bg-[#00f0ff]/10 px-2 py-1 rounded-md border border-[#00f0ff]/20 w-full truncate">{RESUME.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

