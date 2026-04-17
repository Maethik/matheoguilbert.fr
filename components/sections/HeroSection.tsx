'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from "next-intl";

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const t = useTranslations('hero');

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const items = section.querySelectorAll<HTMLElement>('.hero-reveal');
        items.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 120 + i * 110);
        });
    }, []);

    return (
        <section
            id="home"
            ref={sectionRef}
            className="w-full min-h-[calc(100vh-(2*11px))] rounded-[10px] bg-brand-brown text-brand-beige flex flex-col overflow-hidden relative"
        >
            {/* Spacer: clears the fixed header (~91px) + mirrors the bottom bar height (~52px)
                so justify-center lands on the visual centre of the viewport below the header */}
            <div className="shrink-0" style={{ height: 'clamp(120px, 15vh, 160px)' }} />

            {/* Main content */}
            <div className="flex flex-col lg:flex-row flex-1 items-center px-8 md:px-14 lg:px-20 gap-10 lg:gap-0">

                {/* Left — editorial text */}
                <div className="flex flex-col justify-center lg:w-[55%] lg:pr-12 gap-8 lg:gap-10">

                    {/* Label */}
                    <div
                        className="hero-reveal"
                        style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                    >
                        <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-brand-beige/50">
                            <span className="w-6 h-px bg-brand-beige/30" />
                            {t('sectionLabel')}
                        </span>
                    </div>

                    {/* Headline */}
                    <div
                        className="hero-reveal"
                        style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                    >
                        <h1 className="font-serif leading-[0.95] text-[clamp(36px,5.5vw,88px)] text-brand-beige">
                            {t('title')}
                        </h1>
                    </div>

                    {/* Description */}
                    <div
                        className="hero-reveal"
                        style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                    >
                        <p className="font-sans text-base font-light text-brand-beige/60 max-w-md leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* CTA */}
                    <div
                        className="hero-reveal"
                        style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                    >
                        <a
                            href="/#works"
                            className="group inline-flex items-center gap-2 font-sans text-sm text-brand-beige/80 hover:text-brand-beige transition-colors duration-200 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <span className="relative">
                                {t('cta')}
                                <span className="absolute bottom-0 left-0 w-full h-px bg-brand-beige/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Right — portrait */}
                <div
                    className="hero-reveal relative flex items-center justify-center lg:w-[45%]"
                    style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 900ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1)' }}
                >
                    <div className="relative rounded-[10px] overflow-hidden" style={{ width: 'clamp(260px, 32vw, 420px)', height: 'clamp(320px, 40vw, 520px)' }}>
                        <img
                            src="/images/pofile.png"
                            alt="Mathéo Guilbert, développeur Full Stack"
                            className="w-full h-full object-cover object-top"
                            style={{ filter: 'sepia(8%) brightness(0.95) contrast(1.02)' }}
                        />
                        {/* Subtle vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Bottom bar — scroll indicator */}
            <div className="flex justify-center items-center px-8 md:px-14 lg:px-20 pb-8">

                {/* Scroll arrow */}
                <div
                    className="hero-reveal flex flex-col items-center gap-1.5 text-brand-beige/40"
                    style={{
                        opacity: 0,
                        transform: 'translateY(28px)',
                        transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)',
                        animationDelay: '1s'
                    }}
                >
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
