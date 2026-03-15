import React from 'react';
import Link from 'next/link';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';

interface SearchResultProps {
  title: string;
  url: string;
  displayUrl: string;
  description: string;
  date?: string;
  sitelinks?: { title: string; url: string }[];
}

export default function SearchResult({ title, url, displayUrl, description, date, sitelinks }: SearchResultProps) {
  // Try to parse tech from description if applicable
  const techMatch = description.match(/Technologies: (.*?)\./);
  const tech = techMatch ? techMatch[1].split(', ') : [];
  let displayDescription = description;
  if (techMatch) {
    displayDescription = description.replace(/ Technologies: .*?\./, '');
  }

  return (
    <div className="mb-6 max-w-[692px] group">
      <div className="glass-panel p-5 rounded-xl border border-white/10 hover:border-[#00f0ff]/50 hover:shadow-[0_8px_32px_rgba(0,240,255,0.15)] transition-all duration-300 relative overflow-hidden bg-black/40 backdrop-blur-md">
        
        {/* Subtle glowing edge effect on hover */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00f0ff] to-[#b026ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <Link href={url} className="block no-underline">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f0ff]/20 to-[#b026ff]/30 flex items-center justify-center border border-[#00f0ff]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)] group-hover:scale-105 transition-transform">
              <span className="text-sm font-bold text-[#00f0ff]">P</span>
            </div>
            <div>
              <div className="text-[14px] text-gray-200 leading-tight flex items-center gap-1 font-medium">
                Purbashis Behera
              </div>
              <div className="text-[12px] text-[#9aa0a6] leading-tight truncate font-mono tracking-tight">
                {displayUrl}
              </div>
            </div>
          </div>
          <h3 className="text-[20px] text-blue-400 group-hover:text-[#00f0ff] transition-colors font-medium leading-tight mb-2 flex items-center gap-2 drop-shadow-sm group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
            {title}
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#00f0ff] -translate-x-2 group-hover:translate-x-0 transform duration-300" />
          </h3>
        </Link>
        
        <div className="text-[14px] leading-[1.6] text-gray-300 mt-2">
          {date && <span className="text-[#b026ff] mr-2 font-medium bg-[#b026ff]/10 px-2 py-0.5 rounded-sm border border-[#b026ff]/20">{date}</span>}
          <span>{displayDescription}</span>
        </div>

        {tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tech.map((t, idx) => (
              <span key={idx} className="text-[11px] font-mono text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-1 rounded border border-[#00f0ff]/30">
                {t}
              </span>
            ))}
          </div>
        )}

        {sitelinks && sitelinks.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-3 pt-4 border-t border-white/10">
            {sitelinks.map((link, idx) => {
              const isGithub = link.title.toLowerCase().includes('github') || link.title.toLowerCase().includes('code');
              const Icon = isGithub ? Github : ExternalLink;
              
              return (
                <Link 
                  key={idx} 
                  href={link.url} 
                  className="inline-flex items-center gap-1.5 text-[13px] text-gray-300 hover:text-[#00f0ff] font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 hover:border-[#00f0ff]/50 transition-all shadow-sm hover:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
