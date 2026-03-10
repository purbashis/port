import { cn } from "@/lib/utils";
import React from "react";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    href?: string;
    className?: string;
}

export default function GlowButton({ children, href, className, ...props }: GlowButtonProps) {
    const content = (
        <>
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-ember/0 via-ember/10 to-ember/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
        </>
    );

    if (href) {
        return (
            <a href={href} className={cn("inline-flex justify-center items-center elden-button", className)}>
                {content}
            </a>
        );
    }

    return (
        <button className={cn("elden-button", className)} {...props}>
            {content}
        </button>
    );
}
