'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export function BlogHero() {
    const ref = useRef<HTMLElement>(null);
    const t = useTranslations('blogPage');

    useEffect(() => {
        const section = ref.current;
        if (!section) return;
        section.querySelectorAll<HTMLElement>('.hero-reveal').forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 80 + i * 120);
        });
    }, []);

    return (
        <section
            ref={ref}
            className="w-full rounded-[10px] bg-brand-brown text-brand-beige flex flex-col overflow-hidden"
            style={{ minHeight: 'clamp(320px, 45vh, 480px)' }}
        >
            <div className="flex flex-col flex-1 items-center justify-center px-8 md:px-14 lg:px-20 text-center py-24">
                <div
                    className="hero-reveal mb-6"
                    style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 600ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1)' }}
                >
                    <span className="inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-brand-beige/45">
                        <span className="w-5 h-px bg-brand-beige/30" />
                        {t('hero.sectionLabel')}
                        <span className="w-5 h-px bg-brand-beige/30" />
                    </span>
                </div>

                <div
                    className="hero-reveal"
                    style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                >
                    <h1 className="font-serif text-[clamp(56px,8vw,110px)] leading-none text-brand-beige uppercase">
                        {t('hero.title')}
                    </h1>
                </div>

                <div
                    className="hero-reveal mt-8"
                    style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                >
                    <p className="font-sans text-base font-light text-brand-beige/55 max-w-lg leading-relaxed">
                        {t('hero.subtitle')}
                    </p>
                </div>
            </div>
        </section>
    );
}
