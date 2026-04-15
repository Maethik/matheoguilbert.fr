"use client";

import { useRef, useState, UIEvent, useEffect } from "react";

export default function CustomScrollArea({ children }: { children: React.ReactNode }) {
    // Scroll indicator size (default 20)
    const thumbHeight = 20;

    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [needsScroll, setNeedsScroll] = useState(true);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const maxScroll = target.scrollHeight - target.clientHeight;
        
        if (maxScroll > 0) {
            // 0 : top, 1 : bottom
            setScrollProgress(target.scrollTop / maxScroll);
        }
    };

    // Check if content is larger than screen on load
    useEffect(() => {
        if (scrollRef.current) {
            setNeedsScroll(scrollRef.current.scrollHeight > scrollRef.current.clientHeight);
        }
    }, []);

    return (
        <div className="flex-1 relative flex w-full overflow-hidden bg-brand-beige">
            
            {/* Scroll area */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                // Tailwind V4: hide the scrollbar on Chrome, Safari and Firefox
                className="flex-1 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {children}
            </div>

            {/* Custom scrollbar */}
            {needsScroll && (
                <div className="absolute right-0 top-0 bottom-0 w-2.5 z-100 pointer-events-none">
                    <div
                        className="absolute w-full bg-brand-brown/20 rounded-full transition-all duration-75 ease-out"
                        style={{
                            height: `${thumbHeight}%`,
                            top: `${scrollProgress * (100 - thumbHeight)}%`
                        }}
                    />
                </div>
            )}
            
        </div>
    );
}