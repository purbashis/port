"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mousedown", onMouseDown);
            document.addEventListener("mouseup", onMouseUp);
        };

        const removeEventListeners = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
        };

        const handleLinkHoverEvents = () => {
            document.querySelectorAll("a, button, input, textarea").forEach((el) => {
                el.addEventListener("mouseenter", () => setLinkHovered(true));
                el.addEventListener("mouseleave", () => setLinkHovered(false));
            });
        };

        addEventListeners();
        handleLinkHoverEvents();

        // Periodically re-attach link listeners for dynamic content
        const interval = setInterval(handleLinkHoverEvents, 1000);

        return () => {
            removeEventListeners();
            clearInterval(interval);
        };
    }, []);

    const onMouseMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    // Don't render cursor on mobile where touch is standard
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] border-2 border-ember/60 rounded-full mix-blend-screen"
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
                    borderColor: linkHovered ? "rgba(240,192,96,0.8)" : "rgba(200,150,62,0.6)",
                    boxShadow: linkHovered
                        ? "0 0 15px rgba(240,192,96,0.5), inset 0 0 10px rgba(240,192,96,0.5)"
                        : "0 0 5px rgba(200,150,62,0.2)"
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[100] bg-grace rounded-full"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    scale: clicked ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 40 }}
            />
        </>
    );
}
