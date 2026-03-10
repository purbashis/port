import { cn } from "@/lib/utils";
import RuneDivider from "./RuneDivider";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
    align?: "left" | "center" | "right";
    withDivider?: boolean;
}

export default function SectionHeader({ title, subtitle, className, align = "center", withDivider = true }: SectionHeaderProps) {
    return (
        <div className={cn("w-full mb-12", `text-${align}`, className)}>
            {withDivider && <RuneDivider />}
            <h2 className="elden-title text-3xl md:text-5xl lg:text-5xl mt-4 mb-2">
                [ {title} ]
            </h2>
            {subtitle && (
                <p className="text-text-dim font-crimson italic text-xl mt-4">
                    {subtitle}
                </p>
            )}
            {withDivider && <RuneDivider />}
        </div>
    );
}
