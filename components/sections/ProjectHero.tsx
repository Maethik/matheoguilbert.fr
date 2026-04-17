'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from "next-intl";

type props = {
    title: string;
    description: string;
    dateLabel: string;
    locale: string;
    cover?: string;
};

export function ProjectHero({ title, description, dateLabel, locale, cover }: props) {
    const ref = useRef<HTMLElement>(null);
    const t = useTranslations('projectPage.hero');

    useEffect(() => {
        const section = ref.current;
        if (!section) return;
        const items = section.querySelectorAll<HTMLElement>('.hero-reveal');
        items.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 80 + i * 100);
        });
    }, []);

    return (
        <section
            ref={ref}
            className="w-full min-h-[calc(100vh-(2*11px))] rounded-[10px] bg-brand-brown text-brand-beige flex flex-col overflow-hidden relative"
        >
            {/* Background cover image */}
            {cover && (
                <div className="absolute inset-0 pointer-events-none">
                    <img
                        src={cover}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover opacity-[0.08]"
                        style={{ filter: 'grayscale(100%)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-brown/60 via-brand-brown/40 to-brand-brown/90" />
                </div>
            )}

            {/* Back link */}
            <div className="relative z-10 px-8 md:px-14 lg:px-20 pt-30">
                <div
                    className="hero-reveal"
                    style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 500ms ease, transform 500ms cubic-bezier(0.22,1,0.36,1)' }}
                >
                    <Link
                        href={`/${locale}#works`}
                        className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-brand-beige/50 hover:text-brand-beige transition-colors duration-200 cursor-pointer"
                    >
                        <svg
                            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        {t('backToProjects')}
                    </Link>
                </div>
            </div>

            {/* Main content — vertically centred */}
            <div className="relative z-10 flex flex-col flex-1 items-center justify-center px-8 md:px-14 lg:px-20 py-16 text-center">
                {/* Category pill */}
                <div
                    className="hero-reveal mb-6"
                    style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 600ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1)' }}
                >
                    <span className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-brand-beige/45">
                        <span className="w-5 h-px bg-brand-beige/30" />
                        {dateLabel}
                        <span className="w-5 h-px bg-brand-beige/30" />
                    </span>
                </div>

                {/* Title */}
                <div
                    className="hero-reveal"
                    style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                >
                    <h1 className="font-serif text-[clamp(40px,6vw,96px)] leading-[0.92] text-brand-beige max-w-4xl uppercase">
                        {title}
                    </h1>
                </div>

                {/* Description */}
                <div
                    className="hero-reveal mt-8"
                    style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                >
                    <p className="font-sans text-base font-light text-brand-beige/55 max-w-xl leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="relative z-10 flex justify-center pb-8 text-brand-beige/30">
                <div className="flex flex-col items-center gap-1.5">
                    <span className="font-sans text-[10px] uppercase tracking-[0.15em]">{t('scrollPrompt')}</span>
                    <svg
                        className="w-4 h-4"
                        style={{ animation: 'arrowBounce 1.8s ease-in-out infinite' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
