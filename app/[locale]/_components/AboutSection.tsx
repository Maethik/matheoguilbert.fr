'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from "next-intl";

export default function TimelineSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    const t = useTranslations('about');
    
    const lineTop = '58%';
    
    const steps = [
        {
            title: t('step1.title'),
            text: t('step1.text'),
            year: '2019',
            position: 'top' as const,
            left: '16%',
        },
        {
            title: t('step2.title'),
            text: t('step2.text'),
            year: '2022',
            position: 'bottom' as const,
            left: '50%',
        },
        {
            title: t('step3.title'),
            text: t('step3.text'),
            year: '2026',
            position: 'top' as const,
            left: '84%',
        },
    ];

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    section.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
                    observer.unobserve(section);
                }
            },
            { threshold: 0.12 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="w-full py-24 md:py-36 bg-brand-brown/3 rounded-2xl px-6 md:px-12 lg:px-20">
            {/* Label */}
            <div className="reveal flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-brand-brown/40" />
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-brown/45">{t('sectionLabel')}</span>
            </div>

            <h2 className="reveal font-serif text-[clamp(48px,7vw,100px)] leading-none text-brand-brown mb-16 md:mb-24">
                {t('title')}
            </h2>

            {/* Mobile layout */}
            <div className="flex flex-col gap-5 md:hidden">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="reveal rounded-xl border border-brand-brown/12 border-l-4 border-l-brand-brown bg-white/60 p-6 backdrop-blur-sm"
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        <span className="font-sans text-[11px] uppercase tracking-widest text-brand-brown/40 mb-3 block">{step.year}</span>
                        <h3 className="font-serif text-2xl text-brand-brown mb-3">{step.title}</h3>
                        <p className="font-sans text-sm leading-relaxed text-brand-brown/65">{step.text}</p>
                    </div>
                ))}
            </div>

            {/* Desktop timeline */}
            <div className="hidden md:block relative h-[440px]">
                {/* Background track */}
                <div
                    className="absolute left-0 right-0 h-px bg-brand-brown/12 rounded-full"
                    style={{ top: lineTop }}
                />

                {/* Animated progress line */}
                <div
                    className="absolute left-0 h-px bg-brand-brown/50 rounded-full"
                    style={{
                        top: lineTop,
                        width: visible ? '95%' : '0%',
                        transition: 'width 1400ms cubic-bezier(0.22, 1, 0.36, 1)',
                        transitionDelay: '200ms',
                    }}
                />

                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="absolute -translate-x-1/2"
                        style={{ left: step.left, top: lineTop }}
                    >
                        {/* Dot */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{ top: 0 }}
                        >
                            <div
                                className="h-4 w-4 rounded-full border-2 border-brand-beige bg-brand-brown shadow-[0_0_0_3px_rgba(44,30,22,0.2)]"
                                style={{
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'scale(1)' : 'scale(0)',
                                    transition: 'opacity 400ms ease, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    transitionDelay: `${600 + i * 200}ms`,
                                }}
                            />
                        </div>

                        {/* Year label */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 font-sans text-[10px] uppercase tracking-widest text-brand-brown/35"
                            style={{
                                [step.position === 'top' ? 'top' : 'bottom']: '18px',
                                opacity: visible ? 1 : 0,
                                transition: 'opacity 400ms ease',
                                transitionDelay: `${800 + i * 200}ms`,
                            }}
                        >
                            {step.year}
                        </div>

                        {/* Card */}
                        <div
                            className={[
                                'absolute left-1/2 w-[260px] -translate-x-1/2 rounded-xl border border-brand-brown/12 border-l-4 border-l-brand-brown bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm',
                                step.position === 'top' ? 'bottom-10' : 'top-10',
                            ].join(' ')}
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible
                                    ? 'translateY(0)'
                                    : step.position === 'top' ? 'translateY(10px)' : 'translateY(-10px)',
                                transition: 'opacity 600ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1)',
                                transitionDelay: `${700 + i * 180}ms`,
                            }}
                        >
                            <h3 className="font-serif text-xl text-brand-brown mb-2">{step.title}</h3>
                            <p className="font-sans text-sm leading-relaxed text-brand-brown/65">{step.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
