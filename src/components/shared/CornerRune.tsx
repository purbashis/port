import { cn } from "@/lib/utils";

interface CornerRuneProps {
    className?: string;
}

export function CornerRune({ className }: CornerRuneProps) {
    return (
        <svg
            className={cn("absolute w-6 h-6 md:w-8 md:h-8", className)}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 0 L20 0 L20 4 L4 4 L4 20 L0 20 Z" fill="#c8963e" className="opacity-80" />
            <path d="M8 8 L14 8 L14 10 L10 10 L10 14 L8 14 Z" fill="#f0c060" className="opacity-50" />
        </svg>
    );
}
