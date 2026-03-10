import { RESUME } from "@/lib/data";

export default function Footer() {
    return (
        <footer className="relative z-10 py-12 border-t border-ember/10 bg-void mt-12">
            <div className="container mx-auto px-6 flex flex-col items-center">

                <div className="mb-8">
                    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="opacity-60">
                        <path d="M0 10h20M40 10h20M25 10l5-5 5 5-5 5-5-5z" stroke="#c8963e" strokeWidth="1" />
                    </svg>
                </div>

                <p className="font-cinzel text-sm text-text-dim tracking-widest uppercase text-center mb-6">
                    © {new Date().getFullYear()} {RESUME.name} — May the grace of gold guide thee.
                </p>

                <div className="flex gap-6 mb-8">
                    <a href={`https://${RESUME.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-grace transition-colors p-2 border border-transparent hover:border-ember/30 hover:bg-stone rounded-full">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                    <a href={`https://${RESUME.github}`} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-grace transition-colors p-2 border border-transparent hover:border-ember/30 hover:bg-stone rounded-full">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </div>

                <a
                    href="#top"
                    className="group flex flex-col items-center gap-2 text-ember hover:text-grace transition-all duration-300 transform hover:-translate-y-2"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="rotate-180 drop-shadow-[0_0_5px_rgba(200,150,62,0.5)]">
                        <path d="M12 21V3M5 10l7-7 7 7" />
                    </svg>
                </a>

            </div>
        </footer>
    );
}
