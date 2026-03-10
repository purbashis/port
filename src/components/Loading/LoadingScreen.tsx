"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const [stage, setStage] = useState(0); // 0: text in, 1: subtitle in, 2: dissolve

    useEffect(() => {
        // Stage timings
        const t1 = setTimeout(() => setStage(1), 800);
        const t2 = setTimeout(() => setStage(2), 2000);
        const t3 = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // give time for fade out
        }, 2800);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center p-4 overflow-hidden"
                >
                    {/* Noise/Fog background for loading screen */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.fog)_0%,theme(colors.void)_60%)] opacity-50" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={stage >= 0 ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className={stage === 2 ? "elden-title-dissolve" : "elden-title"}
                            style={{
                                fontSize: "clamp(2rem, 8vw, 5rem)",
                                marginBottom: "1rem"
                            }}
                        >
                            PURBASHIS
                            <br />
                            BEHERA
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={stage >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`font-crimson text-grace text-lg md:text-2xl mt-4 tracking-wider uppercase
                ${stage === 2 ? "opacity-0 transition-opacity duration-1000" : ""}`}
                            style={{ textShadow: "0 0 10px rgba(240,192,96,0.3)" }}
                        >
                            Software Engineer · LLM Systems · RAG Architect
                        </motion.p>
                    </div>

                    {/* Dissolve Particles Effect handled via simple CSS for this isolated screen */}
                    {stage === 2 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 pointer-events-none"
                        >
                            {Array.from({ length: 40 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-grace rounded-full shadow-[0_0_8px_#f0c060]"
                                    initial={{
                                        x: "50vw", y: "50vh",
                                        opacity: 1
                                    }}
                                    animate={{
                                        x: `calc(50vw + ${(Math.random() - 0.5) * 100}vw)`,
                                        y: `calc(50vh + ${(Math.random() - 0.5) * 100}vh)`,
                                        opacity: 0,
                                        scale: Math.random() * 2
                                    }}
                                    transition={{ duration: 1 + Math.random(), ease: "easeOut" }}
                                />
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
