"use client";

import AboutSection from "@/components/About/AboutSection";
import ContactSection from "@/components/Contact/ContactSection";
import EducationSection from "@/components/Education/EducationSection";
import ExperienceSection from "@/components/Experience/ExperienceSection";
import Footer from "@/components/Footer/Footer";
import HeroSection from "@/components/Hero/HeroSection";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import Navbar from "@/components/Navigation/Navbar";
import ProjectsSection from "@/components/Projects/ProjectsSection";
import { ParticleField } from "@/components/shared/ParticleField";
import SkillsSection from "@/components/Skills/SkillsSection";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

export default function Home() {
    const [loading, setLoading] = useState(true);

    return (
        <div id="top">
            {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

            {!loading && (
                <>
                    <Navbar />

                    <main className="relative z-10">
                        <HeroSection />
                        <AboutSection />
                        <SkillsSection />
                        <ExperienceSection />
                        <ProjectsSection />
                        <EducationSection />
                        <ContactSection />
                    </main>

                    <Footer />

                    {/* Global Ambient Particles */}
                    <div className="fixed inset-0 z-0 pointer-events-none">
                        <Canvas camera={{ position: [0, 0, 10], fov: 75 }} gl={{ alpha: true }}>
                            <ParticleField count={40} />
                        </Canvas>
                    </div>
                </>
            )}
        </div>
    );
}
