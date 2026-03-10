"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { name: "Lore", href: "#about" },
        { name: "Arsenal", href: "#skills" },
        { name: "Chronicles", href: "#experience" },
        { name: "Artifacts", href: "#projects" },
        { name: "Origins", href: "#education" },
        { name: "Summon", href: "#contact" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-500  ${scrolled ? "bg-ash/80 backdrop-blur-md border-b border-ember/30 shadow-[0_4px_30px_rgba(200,150,62,0.1)]" : "bg-transparent py-4"
                    }`}
            >
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="#" className="font-cinzel text-2xl tracking-widest text-ember drop-shadow-[0_0_8px_rgba(200,150,62,0.8)]">
                        PB
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-cinzel text-sm uppercase tracking-widest text-text-main hover:text-grace transition-colors hover:drop-shadow-[0_0_8px_rgba(240,192,96,0.6)]"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-ember" onClick={() => setIsOpen(true)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Overlay */}
            <div className={`fixed inset-0 z-[100] bg-void/95 backdrop-blur-sm transition-opacity duration-300 flex flex-col items-center justify-center ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <button className="absolute top-6 right-6 text-ember" onClick={() => setIsOpen(false)}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <nav className="flex flex-col gap-8 text-center">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="font-cinzel text-2xl uppercase tracking-widest text-text-main hover:text-grace"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
}
