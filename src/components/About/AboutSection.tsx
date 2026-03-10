import { RESUME } from "@/lib/data";
import OrnateCard from "../shared/OrnateCard";
import SectionHeader from "../shared/SectionHeader";

export default function AboutSection() {
    return (
        <section id="about" className="py-24 relative z-10">
            <div className="container mx-auto px-6">
                <SectionHeader title="LORE OF THE ENGINEER" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <p className="font-crimson text-lg md:text-xl leading-relaxed text-text-main/90">
                            <span className="float-left text-7xl font-cinzel text-ember drop-shadow-[0_0_15px_rgba(200,150,62,0.6)] leading-none pr-3 pt-2">
                                A
                            </span>
                            seasoned Tarnished of the digital realms, {RESUME.name} wanders the expanse of distributed systems and machine cognition. Bearing 2+ years of battle-hardened experience, he has forged production-grade LLM systems, summoned RAG pipelines of great power, and deployed them across the AWS cloud — a vast and unforgiving land.
                        </p>
                        <p className="font-crimson text-lg md:text-xl leading-relaxed text-text-dim mt-6 italic">
                            "His code is forged in Python, tested in the fires of production, and polished with the precision of a master smith."
                        </p>
                    </div>

                    <div className="lg:col-span-5">
                        <OrnateCard className="font-mono text-sm shadow-[0_0_30px_rgba(200,150,62,0.1)]">
                            <div className="border-b border-ember/30 pb-4 mb-4 text-center">
                                <h3 className="text-ember font-cinzel tracking-[0.2em] text-lg">STATUS — {RESUME.name.toUpperCase()}</h3>
                            </div>
                            <ul className="space-y-4 text-text-main">
                                <li className="flex justify-between">
                                    <span className="text-text-dim">Level</span>
                                    <span className="text-ember drop-shadow-[0_0_5px_rgba(200,150,62,0.8)]">II+</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-text-dim">Experience</span>
                                    <span className="text-grace">2+ Years</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-text-dim">Specialization</span>
                                    <span className="text-text-main">LLM / RAG Architect</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-text-dim">Location</span>
                                    <span>India</span>
                                </li>
                                <li className="flex justify-between border-t border-ember/10 pt-4 mt-2">
                                    <span className="text-text-dim">Status</span>
                                    <span className="text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-pulse">Active</span>
                                </li>
                            </ul>
                        </OrnateCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
