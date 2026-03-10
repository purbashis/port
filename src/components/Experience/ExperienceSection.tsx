import { RESUME } from "@/lib/data";
import OrnateCard from "../shared/OrnateCard";
import SectionHeader from "../shared/SectionHeader";

export default function ExperienceSection() {
    return (
        <section id="experience" className="py-24 relative z-10">
            <div className="container mx-auto px-6">
                <SectionHeader title="CHRONICLES OF BATTLE" />

                <div className="max-w-4xl mx-auto space-y-12">
                    {RESUME.experience.map((exp, index) => (
                        <OrnateCard key={index} hoverEffect={true} className="relative">
                            {exp.active && (
                                <div className="absolute -top-3 -right-3 md:-right-6 md:-top-4">
                                    <span className="inline-flex items-center px-3 py-1 bg-void border border-[#4ade80]/50 text-[#4ade80] text-xs font-mono tracking-widest shadow-[0_0_10px_rgba(74,222,128,0.2)] animate-pulse rounded-sm">
                                        ACTIVE
                                    </span>
                                </div>
                            )}

                            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ember/20 pb-4">
                                <div>
                                    <h3 className="text-2xl font-cinzel text-ember drop-shadow-[0_0_5px_rgba(200,150,62,0.4)]">
                                        {exp.company}
                                    </h3>
                                    <p className="font-crimson text-grace text-lg italic mt-1">{exp.role}</p>
                                </div>
                                <div className="text-left md:text-right font-mono text-sm text-text-dim">
                                    <p>{exp.period}</p>
                                    <p className="mt-1">{exp.location}</p>
                                </div>
                            </div>

                            <ul className="space-y-4">
                                {exp.highlights.map((highlight, i) => (
                                    <li key={i} className="flex items-start text-text-main font-crimson text-lg leading-relaxed">
                                        <span className="text-ember mr-3 mt-1 opacity-70 flex-shrink-0 font-serif">❖</span>
                                        <span>
                                            {highlight.includes("35%") ? (
                                                <>
                                                    Architected RAG pipelines using LangChain and FAISS with hybrid retrieval, reducing hallucination by <span className="inline-block px-2 py-0.5 mx-1 border border-ember text-grace font-mono text-sm bg-void shadow-[0_0_10px_rgba(240,192,96,0.2)]">~35%</span>
                                                </>
                                            ) : highlight.includes("3 production-grade") ? (
                                                <>
                                                    Built <span className="inline-block px-1.5 py-0.5 mx-1 border border-ember/50 text-grace font-mono text-sm bg-void">3</span> production-grade LLM and RAG applications end-to-end, from system design to AWS deployment
                                                </>
                                            ) : (
                                                highlight
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </OrnateCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
