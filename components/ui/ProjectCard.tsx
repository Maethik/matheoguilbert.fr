'use client';

import { useRef, useEffect } from 'react';
import Link from "next/link";
import { Project } from "@/lib/projects/types";

type props = {
    project: Project;
    locale: string;
    isTheLast?: boolean;
    index?: number;
};

export const ProjectCard = ({ project, locale, isTheLast = false, index = 0 }: props) => {
    const num = String(index + 1).padStart(2, '0');
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('visible');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.12 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={cardRef} className="w-full pb-10 reveal">
            {/* Divider line */}
            <div className="w-full h-px bg-brand-brown/15 mb-10" />

            <Link href={`/${locale}/works/${project.slug}`} className="group block cursor-pointer">
                <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-start lg:gap-16 relative">

                    {/* Project number */}
                    <div className="absolute top-0 right-0 font-sans text-xs tracking-[0.2em] text-brand-brown/25 uppercase">
                        {num}
                    </div>

                    {/* Left — image */}
                    <div className="w-full rounded-[10px] lg:w-3/5 h-[340px] md:h-[420px] overflow-hidden bg-brand-brown/5">
                        <img
                            src={project.cover}
                            alt={project.title}
                            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-105"
                        />
                    </div>

                    {/* Right — content */}
                    <div className="flex flex-col items-start justify-center w-full gap-6 lg:pt-4 lg:pr-6">
                        {/* Category */}
                        <div className="flex items-center gap-3">
                            <span className="w-4 h-px bg-brand-brown/40" />
                            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-brand-brown/50">
                                {project.category}
                            </span>
                        </div>

                        {/* Title */}
                        <div>
                            <h3 className="text-[clamp(28px,3.5vw,52px)] text-brand-brown font-serif leading-tight uppercase">
                                {project.title}
                            </h3>
                            <p className="font-serif font-light text-brand-brown/50 text-lg mt-1">
                                ({project.roles.join(', ')})
                            </p>
                            <p className="font-sans text-xs tracking-widest text-brand-brown/30 mt-1">
                                {project.dateLabel}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="font-sans text-sm leading-relaxed text-brand-brown/70 max-w-sm">
                            {project.description}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-brand-brown border-b border-brand-brown/30 pb-0.5 group-hover:border-brand-brown transition-colors duration-200">
                            <span>Lire le cas</span>
                            <svg
                                className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>

            {isTheLast && <div className="w-full h-px mt-10 bg-brand-brown/15" />}
        </div>
    );
};
