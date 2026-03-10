import { cn } from "@/lib/utils";
import React from "react";
import { CornerRune } from "./CornerRune";

interface OrnateCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export default function OrnateCard({ children, className, hoverEffect = false, ...props }: OrnateCardProps) {
    return (
        <div
            className={cn(
                "relative bg-ash border border-ember/20 p-6 md:p-8 backdrop-blur-sm",
                hoverEffect && "transition-all duration-300 hover:-translate-y-2 hover:border-ember/50 hover:shadow-[0_0_30px_rgba(200,150,62,0.15)]",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-stone opacity-30 pointer-events-none" />

            <CornerRune className="top-0 left-0" />
            <CornerRune className="top-0 right-0 rotate-90" />
            <CornerRune className="bottom-0 left-0 -rotate-90" />
            <CornerRune className="bottom-0 right-0 rotate-180" />

            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
}
