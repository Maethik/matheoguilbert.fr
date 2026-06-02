'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type props = {
    items: string[];
};

export function ArticleSummary({ items }: props) {
    const ref = useRef<HTMLDivElement>(null);
    const t = useTranslations('blogPage');

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll('.reveal').forEach((node, i) => {
                        setTimeout(() => node.classList.add('visible'), i * 80);
                    });
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="mb-14 border border-brand-brown/12 rounded-xl p-8 bg-brand-brown/[0.03]">
            <div className="flex items-center gap-3 mb-6">
                <span className="w-5 h-px bg-brand-brown/30" />
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-brand-brown/40">
                    {t('summary.label')}
                </span>
            </div>
            <ol className="flex flex-col gap-3">
                {items.map((item, i) => (
                    <li key={i} className="reveal flex items-baseline gap-4" style={{ transitionDelay: `${i * 60}ms` }}>
                        <span className="font-serif text-base text-brand-brown/25 tabular-nums flex-shrink-0 w-4 text-right">
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-sans text-sm text-brand-brown/65 leading-relaxed">
                            {item}
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    );
}
