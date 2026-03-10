import { RESUME } from "@/lib/data";
import SectionHeader from "../shared/SectionHeader";

export default function EducationSection() {
    return (
        <section id="education" className="py-24 relative z-10">
            <div className="container mx-auto px-6">
                <SectionHeader title="ORIGINS — ACADEMIC LORE" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 max-w-5xl mx-auto">
                    {RESUME.education.map((edu, index) => (
                        <div
                            key={index}
                            className="relative p-8 lg:p-12 border-2 border-[#2a2420] bg-[#151210] shadow-[inset_0_0_50px_rgba(0,0,0,0.8),0_10px_20px_rgba(0,0,0,0.5)] transform transition-transform hover:-translate-y-1"
                            style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.05\'/%3E%3C/svg%3E")'
                            }}
                        >
                            <div className="text-center space-y-4">
                                <span className="inline-block text-ember font-mono text-sm border-b border-ember/30 pb-1 px-4">{edu.period}</span>

                                <h3 className="font-cinzel text-xl lg:text-2xl text-text-main px-4 leading-normal" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                                    {edu.degree}
                                </h3>

                                <p className="font-crimson text-lg text-text-dim italic">
                                    {edu.institution}
                                </p>

                                <div className="pt-6 mt-6 border-t border-[#3a3028]">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-cinzel text-xs text-text-dim tracking-widest">ACADEMIC PROWESS</span>
                                        <span className="font-mono text-grace text-sm">{edu.cgpa}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-void rounded-full overflow-hidden border border-[#3a3028]">
                                        <div
                                            className="h-full bg-gradient-to-r from-ember/40 to-grace shadow-[0_0_10px_rgba(240,192,96,0.5)]"
                                            style={{ width: `${parseFloat(edu.cgpa) * 10}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
