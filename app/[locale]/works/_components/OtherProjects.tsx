'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from "next-intl";

type props = {
    locale: string;
    projects: {
        slug: string;
        title: string;
        description: string;
        cover: string;
    }[];
};

export function OtherProjects({ locale, projects }: props) {
    const ref = useRef<HTMLElement>(null);
    const t = useTranslations('projectPage.otherProjects');

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll('.reveal').forEach((node, i) => {
                        setTimeout(() => node.classList.add('visible'), i * 120);
                    });
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    if (!projects.length) return null;

    return (
        <section ref={ref} className="pt-6 pb-20">
            {/* Divider */}
            <div className="w-full h-px bg-brand-brown/10 mb-14" />

            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-brand-brown/40" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-brown/40">
                    {t('sectionLabel')}
                </span>
            </div>

            <h2 className="reveal font-serif text-[clamp(48px,6vw,80px)] leading-none text-brand-brown mb-12">
                {t('title')}
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project, i) => (
                    <Link
                        key={project.slug}
                        href={`/${locale}/works/${project.slug}`}
                        className="reveal group block cursor-pointer"
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        {/* Image */}
                        <div className="w-full h-[240px] rounded-xl overflow-hidden bg-brand-brown/5 mb-5">
                            <img
                                src={project.cover}
                                alt={project.title}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-105"
                            />
                        </div>

                        {/* Text */}
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-serif text-2xl text-brand-brown uppercase mb-1.5">
                                    {project.title}
                                </h3>
                                <p className="font-sans text-sm text-brand-brown/55 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                            <svg
                                className="w-5 h-5 text-brand-brown/30 flex-shrink-0 mt-1 group-hover:translate-x-1 group-hover:text-brand-brown/60 transition-all duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
