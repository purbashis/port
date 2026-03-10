
export default function RuneDivider() {
    return (
        <div className="flex items-center justify-center w-full py-8 opacity-60">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-ember/50 to-transparent" />
            <div className="mx-4 text-ember text-xs tracking-widest font-mono">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-ember rotate-45">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <path d="M3 12h18M12 3v18" />
                </svg>
            </div>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-ember/50 to-transparent" />
        </div>
    );
}
