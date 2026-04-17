'use client';

import { useRef, useEffect } from 'react';
import { Project } from "@/lib/projects/types";
import { ProjectCard } from "../ui/ProjectCard";

type props = {
    projects: Project[];
    locale: string;
};

export default function WorksSection({ projects, locale }: props) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach((el, i) => {
                            setTimeout(() => el.classList.add('visible'), i * 120);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="works" ref={sectionRef} className="w-full flex flex-col items-start justify-start pt-20 md:pt-28">
            {/* Section label */}
            <div className="reveal flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-brown/40" />
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-brown/45">Sélection de projets</span>
            </div>

            <h2 className="reveal font-serif text-[clamp(56px,8vw,112px)] text-brand-brown leading-none mb-12 md:mb-16">
                Travaux
            </h2>

            <div className="w-full">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.slug}
                        project={project}
                        locale={locale}
                        isTheLast={index === projects.length - 1}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
