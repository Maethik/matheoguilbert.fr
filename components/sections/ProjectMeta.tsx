'use client';

import { useRef, useEffect } from 'react';

type props = {
    dateLabel: string;
    category: string;
    roles: string[];
    client: string;
};

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-brown/40">
                {label}
            </span>
            <div className="font-sans text-sm text-brand-brown/80 leading-relaxed">
                {children}
            </div>
        </div>
    );
}

export function ProjectMeta({ dateLabel, category, roles, client }: props) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('visible');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="reveal py-12 md:py-16">
            {/* Top divider */}
            <div className="w-full h-px bg-brand-brown/10 mb-10" />

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
                <MetaItem label="Année">{dateLabel}</MetaItem>
                <MetaItem label="Catégorie">{category}</MetaItem>
                <MetaItem label="Rôles">
                    <div className="flex flex-col gap-1">
                        {roles.map((role) => (
                            <span key={role}>{role}</span>
                        ))}
                    </div>
                </MetaItem>
                <MetaItem label="Client">{client}</MetaItem>
            </div>

            {/* Bottom divider */}
            <div className="w-full h-px bg-brand-brown/10 mt-10" />
        </section>
    );
}
