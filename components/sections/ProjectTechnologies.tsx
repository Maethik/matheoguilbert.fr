'use client';

import { useRef, useEffect } from 'react';

type props = {
    technologies: string[];
};

export function ProjectTechnologies({ technologies }: props) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll('.reveal').forEach((node, i) => {
                        setTimeout(() => node.classList.add('visible'), i * 60);
                    });
                    observer.unobserve(el);
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="pb-14">
            <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-brand-brown/40" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-brown/40">
                    Technologies
                </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
                {technologies.map((tech) => (
                    <span
                        key={tech}
                        className="reveal font-sans text-xs uppercase tracking-[0.12em] text-brand-brown/70 border border-brand-brown/20 rounded-full px-4 py-1.5 hover:border-brand-brown/50 hover:text-brand-brown transition-colors duration-200 cursor-default"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </section>
    );
}
