"use client";

import { RESUME } from "@/lib/data";
import React, { useState } from "react";
import GlowButton from "../shared/GlowButton";
import SectionHeader from "../shared/SectionHeader";

export default function ContactSection() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            (e.target as HTMLFormElement).reset();
        }, 4000);
    };

    return (
        <section id="contact" className="py-24 relative z-10 min-h-screen flex flex-col justify-center">
            {/* Background Erdtree faint silhouette */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-[80vw] h-[80vh] fill-ember">
                    <path d="M50 10 Q40 40 10 50 Q40 60 50 90 Q60 60 90 50 Q60 40 50 10 Z" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#c8963e" strokeWidth="2" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0c060" strokeWidth="1" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader title="SEND A SUMMON SIGN" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 max-w-6xl mx-auto">

                    {/* NPC Dialogue Box */}
                    <div className="bg-void/80 border-2 border-stone p-8 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.8)] relative">
                        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-ember/50 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-ember/50 to-transparent" />

                        <p className="font-crimson text-xl md:text-2xl text-text-main italic mb-8 py-4 border-b border-stone leading-relaxed">
                            "Ahh, a visitor. I've been expecting you. The realms of code are treacherous... shall we traverse them together?"
                        </p>

                        <ul className="space-y-6 font-mono text-sm">
                            <li className="flex items-center gap-4">
                                <span className="text-xl">📧</span>
                                <a href={`mailto:${RESUME.email}`} className="text-ember hover:text-grace transition-colors tracking-wide">{RESUME.email}</a>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="text-xl">📞</span>
                                <span className="text-text-main tracking-widest">{RESUME.phone}</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="text-xl">🔗</span>
                                <a href={`https://${RESUME.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-grace transition-colors border-b border-transparent hover:border-grace pb-0.5">{RESUME.linkedin}</a>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="text-xl">🐙</span>
                                <a href={`https://${RESUME.github}`} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-grace transition-colors border-b border-transparent hover:border-grace pb-0.5">{RESUME.github}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Form */}
                    <div className="flex flex-col justify-center">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-in fade-in zoom-in duration-1000">
                                <div className="w-16 h-16 rounded-full bg-grace/20 flex items-center justify-center shadow-[0_0_30px_rgba(240,192,96,0.6)]">
                                    <div className="w-8 h-8 rounded-full bg-grace animate-ping" />
                                </div>
                                <h3 className="font-cinzel text-2xl text-grace drop-shadow-[0_0_10px_rgba(240,192,96,0.8)]">Summon Sign Placed</h3>
                                <p className="font-crimson text-text-main text-lg italic">Your message travels through the fog.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Thy Name"
                                        className="w-full bg-stone border border-ember/20 p-4 font-crimson text-lg text-text-main placeholder:text-text-dim/50 focus:outline-none focus:border-ember focus:bg-ash focus:ring-1 focus:ring-ember transition-all"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Thy Sign (Email)"
                                        className="w-full bg-stone border border-ember/20 p-4 font-crimson text-lg text-text-main placeholder:text-text-dim/50 focus:outline-none focus:border-ember focus:bg-ash focus:ring-1 focus:ring-ember transition-all"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Speak thy intentions..."
                                        className="w-full bg-stone border border-ember/20 p-4 font-crimson text-lg text-text-main placeholder:text-text-dim/50 focus:outline-none focus:border-ember focus:bg-ash focus:ring-1 focus:ring-ember transition-all resize-none"
                                    />
                                </div>
                                <GlowButton type="submit" className="w-full py-4 text-sm tracking-[0.2em]">
                                    [ SEND SUMMON SIGN ]
                                </GlowButton>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
