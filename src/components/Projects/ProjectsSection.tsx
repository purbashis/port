import { RESUME } from "@/lib/data";
import GlowButton from "../shared/GlowButton";
import OrnateCard from "../shared/OrnateCard";
import SectionHeader from "../shared/SectionHeader";

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-24 relative z-10 min-h-screen">
            <div className="container mx-auto px-6">
                <SectionHeader title="LEGENDARY ARTIFACTS" subtitle="Fragments of scattered logic, bound by code" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
                    {RESUME.projects.map((project, index) => (
                        <OrnateCard
                            key={index}
                            hoverEffect={true}
                            className="flex flex-col group overflow-hidden"
                        >
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-grace/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-cinzel text-ember drop-shadow-[0_0_8px_rgba(200,150,62,0.5)] leading-tight group-hover:text-grace transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className={`inline-block mt-2 font-mono text-xs px-2 py-0.5 border ${project.rarity === 'LEGENDARY' ? 'border-amber-500/50 text-amber-500 bg-amber-900/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'border-purple-500/50 text-purple-400 bg-purple-900/20 shadow-[0_0_10px_rgba(168,85,247,0.2)]'}`}>
                                        [ {project.rarity} ]
                                    </span>
                                </div>
                                <span className="text-text-dim font-mono text-sm">{project.year}</span>
                            </div>

                            <div className="flex-grow">
                                <p className="font-crimson text-lg text-text-main italic leading-relaxed border-l border-ember/30 pl-4 py-2 bg-gradient-to-r from-ember/5 to-transparent">
                                    &quot;{project.description}&quot;
                                </p>

                                <div className="mt-8">
                                    <h4 className="font-cinzel text-sm text-text-dim mb-3 uppercase tracking-widest">Incantations & Runes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="font-mono text-xs text-ember/80 px-2 py-1 border border-ember/10 bg-void/50 rounded-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-ember/10 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-grace shadow-[0_0_8px_rgba(240,192,96,0.8)] animate-pulse" />
                                    <span className="font-cinzel text-sm text-text-main tracking-wider">{project.stat}</span>
                                </div>

                                <div className="flex gap-4 w-full md:w-auto">
                                    <GlowButton href={project.link} className="py-2 text-xs flex-1 md:flex-none">
                                        [ Demo ]
                                    </GlowButton>
                                    <GlowButton href={project.link} className="py-2 text-xs flex-1 md:flex-none bg-void border-stone">
                                        [ Code ]
                                    </GlowButton>
                                </div>
                            </div>
                        </OrnateCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
