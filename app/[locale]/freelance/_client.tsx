'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Project } from '@/lib/projects/types';

type props = {
    projects: Project[];
    locale: string;
};

export default function FreelanceClient({ projects, locale }: props) {
    const t = useTranslations('freelancePage');

    const heroRef = useRef<HTMLElement>(null);
    const belowFoldRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = heroRef.current;
        if (!section) return;
        const items = section.querySelectorAll<HTMLElement>('.hero-reveal');
        items.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 120 + i * 110);
        });
    }, []);

    useEffect(() => {
        const container = belowFoldRef.current;
        if (!container) return;

        const sections = container.querySelectorAll<HTMLElement>('[data-reveal-section]');
        const observers: IntersectionObserver[] = [];

        sections.forEach((section) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
                                setTimeout(() => el.classList.add('visible'), i * 100);
                            });
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );
            observer.observe(section);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const needs = [
        { title: t('needs.item1Title'), text: t('needs.item1Text') },
        { title: t('needs.item2Title'), text: t('needs.item2Text') },
        { title: t('needs.item3Title'), text: t('needs.item3Text') },
        { title: t('needs.item4Title'), text: t('needs.item4Text') },
    ];

    const services = [
        {
            title: t('services.service1Title'),
            desc: t('services.service1Desc'),
            ideal: t('services.service1Ideal'),
            examples: t('services.service1Examples').split(' · '),
        },
        {
            title: t('services.service2Title'),
            desc: t('services.service2Desc'),
            ideal: t('services.service2Ideal'),
            examples: t('services.service2Examples').split(' · '),
        },
        {
            title: t('services.service3Title'),
            desc: t('services.service3Desc'),
            ideal: t('services.service3Ideal'),
            examples: t('services.service3Examples').split(' · '),
        },
    ];

    const methodSteps = Array.from({ length: 5 }, (_, i) => ({
        title: t(`method.step${i + 1}Title`),
        text: t(`method.step${i + 1}Text`),
    }));

    const whyArgs = Array.from({ length: 4 }, (_, i) => ({
        title: t(`why.arg${i + 1}Title`),
        text: t(`why.arg${i + 1}Text`),
    }));

    const heroCards = [
        { num: '01', label: t('hero.card1Label') },
        { num: '02', label: t('hero.card2Label') },
        { num: '03', label: t('hero.card3Label') },
    ];

    return (
        <main className="bg-brand-beige text-brand-brown flex flex-col">

            {/* ── Hero ── */}
            <section
                ref={heroRef}
                className="w-full min-h-[calc(100vh-(2*11px))] rounded-[10px] bg-brand-brown text-brand-beige flex flex-col overflow-hidden"
            >
                <div className="shrink-0" style={{ height: 'clamp(120px, 15vh, 160px)' }} />

                <div className="flex flex-col lg:flex-row flex-1 items-center px-8 md:px-14 lg:px-20 gap-12 lg:gap-0">

                    {/* Left — text */}
                    <div className="flex flex-col justify-center lg:w-[55%] lg:pr-16 gap-8 lg:gap-10">

                        <div
                            className="hero-reveal"
                            style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                        >
                            <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-brand-beige/50">
                                <span className="w-6 h-px bg-brand-beige/30" />
                                {t('hero.label')}
                            </span>
                        </div>

                        <div
                            className="hero-reveal"
                            style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                        >
                            <h1 className="font-serif leading-none text-[clamp(28px,4vw,64px)] text-brand-beige">
                                {t('hero.title')}
                            </h1>
                        </div>

                        <div
                            className="hero-reveal"
                            style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                        >
                            <p className="font-sans text-base font-light text-brand-beige/60 max-w-md leading-relaxed">
                                {t('hero.subtitle')}
                            </p>
                        </div>

                        <div
                            className="hero-reveal flex flex-col sm:flex-row gap-4"
                            style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                        >
                            <a
                                href="mailto:matheo.guilbert49@gmail.com?subject=Projet freelance"
                                className="inline-flex items-center justify-center gap-2 font-sans text-sm text-brand-beige border border-brand-beige/40 rounded-lg px-6 py-3 hover:bg-brand-beige/10 transition-all duration-200"
                            >
                                {t('hero.cta1')}
                            </a>
                            <button
                                onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group inline-flex items-center gap-2 font-sans text-sm text-brand-beige/70 hover:text-brand-beige transition-colors duration-200"
                            >
                                <span className="relative">
                                    {t('hero.cta2')}
                                    <span className="absolute bottom-0 left-0 w-full h-px bg-brand-beige/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                </span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right — service preview cards */}
                    <div
                        className="hero-reveal flex flex-col gap-3 lg:w-[45%] lg:pl-12 w-full"
                        style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 900ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1)' }}
                    >
                        {heroCards.map((card, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-5 border border-brand-beige/10 rounded-2xl px-6 py-5 bg-brand-beige/5 hover:bg-brand-beige/8 transition-colors duration-300 cursor-default"
                            >
                                <span className="font-sans text-xs text-brand-beige/25 tracking-widest shrink-0">{card.num}</span>
                                <span className="font-serif text-brand-beige text-[clamp(1rem,1.8vw,1.35rem)] leading-tight">{card.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="shrink-0" style={{ height: 'clamp(60px, 8vh, 80px)' }} />
            </section>

            {/* ── Below fold ── */}
            <div ref={belowFoldRef} className="px-8 md:px-14 lg:px-20">

                {/* ── Needs ── */}
                <section data-reveal-section className="w-full py-24 md:py-36">
                    <div className="reveal flex items-center gap-3 mb-12 md:mb-16">
                        <span className="w-8 h-px bg-brand-brown/40" />
                        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-brown/45">
                            {t('needs.sectionLabel')}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {needs.map((item, i) => (
                            <div
                                key={i}
                                className="reveal flex flex-col gap-4 p-7 rounded-2xl border border-brand-brown/8 bg-white/40 hover:bg-white/70 hover:border-brand-brown/15 transition-all duration-300 cursor-default"
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                <span className="font-sans text-xs text-brand-brown/25 tracking-[0.2em]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h3 className="font-serif text-brand-brown text-[clamp(1.15rem,1.8vw,1.45rem)] leading-snug mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="font-sans text-sm text-brand-brown/60 leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Services — catalog grid ── */}
                <section data-reveal-section className="w-full py-24 md:py-36 border-t border-brand-brown/8">
                    <div className="reveal flex items-center gap-3 mb-12 md:mb-16">
                        <span className="w-8 h-px bg-brand-brown/40" />
                        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-brown/45">
                            {t('services.sectionLabel')}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {services.map((service, i) => (
                            <div
                                key={i}
                                className="reveal flex flex-col gap-5 p-8 rounded-2xl border border-brand-brown/8 bg-white/40 hover:bg-white/70 hover:border-brand-brown/15 transition-all duration-300 cursor-default"
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <span className="font-sans text-xs text-brand-brown/25 tracking-[0.2em]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="font-serif text-brand-brown text-[clamp(1.2rem,1.8vw,1.55rem)] leading-tight">
                                    {service.title}
                                </h3>
                                <p className="font-sans text-sm text-brand-brown/70 leading-relaxed flex-1">
                                    {service.desc}
                                </p>
                                <div className="border-t border-brand-brown/8 pt-5 flex flex-col gap-3">
                                    <div>
                                        <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-brand-brown/40">
                                            {t('services.idealLabel')}
                                        </span>
                                        <p className="font-sans text-sm text-brand-brown/60 mt-1 leading-relaxed">
                                            {service.ideal}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {service.examples.map((ex, j) => (
                                            <span
                                                key={j}
                                                className="font-sans text-xs text-brand-brown/50 border border-brand-brown/10 rounded-full px-3 py-1 bg-brand-brown/5"
                                            >
                                                {ex}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Method — card grid ── */}
                <section data-reveal-section className="w-full py-24 md:py-36 border-t border-brand-brown/8">
                    <div className="reveal flex items-center gap-3 mb-12 md:mb-16">
                        <span className="w-8 h-px bg-brand-brown/40" />
                        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-brown/45">
                            {t('method.sectionLabel')}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {methodSteps.map((step, i) => (
                            <div
                                key={i}
                                className="reveal flex flex-col gap-4 p-6 rounded-2xl border border-brand-brown/8 bg-white/40 hover:bg-white/70 hover:border-brand-brown/15 transition-all duration-300 cursor-default"
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                <span className="font-sans text-xs text-brand-brown/25 tracking-[0.2em]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="font-serif text-brand-brown text-[clamp(1.1rem,1.4vw,1.25rem)] leading-tight">
                                    {step.title}
                                </h3>
                                <p className="font-sans text-sm text-brand-brown/60 leading-relaxed">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Works — project cards ── */}
                <section id="works" className="w-full py-24 md:py-36 border-t border-brand-brown/8">
                    <div data-reveal-section className="mb-12 md:mb-16">
                        <div className="reveal flex items-center gap-3">
                            <span className="w-8 h-px bg-brand-brown/40" />
                            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-brown/45">
                                {t('works.sectionLabel')}
                            </span>
                        </div>
                    </div>

                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            locale={locale}
                            index={i}
                            isTheLast={i === projects.length - 1}
                        />
                    ))}
                </section>

                {/* ── Why ── */}
                <section data-reveal-section className="w-full py-24 md:py-36 border-t border-brand-brown/8">
                    <div className="reveal flex items-center gap-3 mb-12 md:mb-16">
                        <span className="w-8 h-px bg-brand-brown/40" />
                        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-brown/45">
                            {t('why.sectionLabel')}
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                        {/* Left — intro text */}
                        <div className="reveal lg:w-2/5">
                            <p className="font-sans text-base text-brand-brown/70 leading-relaxed">
                                {t('why.intro')}
                            </p>
                        </div>
                        {/* Right — 2×2 arguments */}
                        <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {whyArgs.map((arg, i) => (
                                <div
                                    key={i}
                                    className="reveal flex flex-col gap-3 p-6 rounded-2xl border border-brand-brown/8 bg-white/40 hover:bg-white/70 hover:border-brand-brown/15 transition-all duration-300 cursor-default"
                                    style={{ transitionDelay: `${i * 80}ms` }}
                                >
                                    <h4 className="font-serif text-brand-brown text-lg leading-tight">{arg.title}</h4>
                                    <p className="font-sans text-sm text-brand-brown/60 leading-relaxed">{arg.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA final ── */}
                <section data-reveal-section className="w-full py-24 md:py-36 border-t border-brand-brown/8">
                    <div className="flex justify-center">
                        <div className="reveal w-full max-w-2xl flex flex-col items-center text-center gap-8 p-10 md:p-14 rounded-2xl border border-brand-brown/8 bg-white/40">
                            <h2 className="font-serif text-brand-brown text-[clamp(1.5rem,2.8vw,2.2rem)] leading-tight">
                                {t('cta.title')}
                            </h2>
                            <p className="font-sans text-sm text-brand-brown/60 leading-relaxed max-w-md">
                                {t('cta.text')}
                            </p>
                            <div className="flex flex-col items-center gap-4">
                                <a
                                    href="mailto:matheo.guilbert49@gmail.com?subject=Projet freelance"
                                    className="inline-flex items-center gap-2 font-sans text-sm text-brand-beige bg-brand-brown rounded-lg px-8 py-3.5 hover:bg-brand-brown/90 transition-colors duration-200"
                                >
                                    {t('cta.button')}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                                <div className="flex flex-col gap-1">
                                    <span className="font-sans text-xs text-brand-brown/40">{t('cta.note1')}</span>
                                    <span className="font-sans text-xs text-brand-brown/40">{t('cta.note2')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
