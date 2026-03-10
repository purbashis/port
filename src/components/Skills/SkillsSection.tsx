import { RESUME } from "@/lib/data";
import SectionHeader from "../shared/SectionHeader";

const CategoryIcon = ({ type }: { type: string }) => {
    switch (type) {
        case "languages": return <span>⚔️</span>;
        case "mlAI": return <span>🔮</span>;
        case "frameworks": return <span>🛡️</span>;
        case "databases": return <span>🗃️</span>;
        case "cloudDevOps": return <span>☁️</span>;
        case "systems": return <span>⚙️</span>;
        default: return <span>📜</span>;
    }
};

const categoryNames: Record<string, string> = {
    languages: "Languages",
    mlAI: "ML & AI",
    frameworks: "Frameworks",
    databases: "Databases",
    cloudDevOps: "Cloud & DevOps",
    systems: "Systems",
};

export default function SkillsSection() {
    return (
        <section id="skills" className="py-24 relative z-10">
            <div className="container mx-auto px-6">
                <SectionHeader title="ARSENAL" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(RESUME.skills).map(([key, skills]) => (
                        <div key={key} className="flex flex-col">
                            <h3 className="flex items-center gap-3 text-ember font-cinzel tracking-widest uppercase mb-4 text-sm">
                                <CategoryIcon type={key} /> {categoryNames[key]}
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill) => (
                                    <div
                                        key={skill}
                                        className="relative px-4 py-2 bg-stone border border-ember/20 rounded shadow-md font-mono text-sm text-text-main transition-all duration-300 hover:scale-105 hover:bg-ash hover:border-ember hover:text-grace hover:shadow-[0_0_15px_rgba(240,192,96,0.2)] cursor-default group"
                                    >
                                        <span className="relative z-10">{skill}</span>
                                        <div className="absolute inset-0 bg-grace opacity-0 group-hover:opacity-5 transition-opacity rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
