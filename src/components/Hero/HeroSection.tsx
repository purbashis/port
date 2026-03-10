"use client";

import { RESUME } from "@/lib/data";
import dynamic from "next/dynamic";
import GlowButton from "../shared/GlowButton";

const HeroOrb = dynamic(() => import("./HeroOrb"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-16 h-16 border-2 border-ember rounded-full border-t-transparent animate-spin" /></div>
});

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(200,150,62,0.08)_0%,transparent_60%)]" />

            <div className="container mx-auto px-6 h-full z-10">
                <div className="flex flex-col md:flex-row items-center justify-between h-full gap-12">

                    <div className="md:w-3/5 md:pr-12 pt-12 md:pt-0 relative z-10 w-full overflow-visible">
                        <h1 className="elden-title leading-tight whitespace-nowrap pe-4 w-max max-w-none" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
                            {RESUME.name.split(' ').map((part, i) => (
                                <span key={i} className="block">{part}</span>
                            ))}
                        </h1>

                        <p className="mt-6 text-xl md:text-2xl font-crimson text-text-dim italic border-l-2 border-ember/50 pl-4 tracking-wide max-w-2xl">
                            {RESUME.tagline}
                        </p>

                        <div className="mt-12 flex flex-wrap gap-6">
                            <GlowButton href="#projects" className="min-w-[200px]">
                                [ View Artifacts ]
                            </GlowButton>
                            <GlowButton href="#contact" className="min-w-[200px]">
                                [ Summon Sign ]
                            </GlowButton>
                        </div>
                    </div>

                    <div className="w-full md:w-2/5 h-[60vh] md:h-[80vh] relative">
                        <HeroOrb />
                    </div>

                </div>
            </div>
        </section>
    );
}
