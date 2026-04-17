'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from "next-intl";

export default function ApproachSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const t = useTranslations('approach');
    
    const features = [
        {
            imagePath: '/icons/brain.svg',
            title: t('feature1.title'),
            text: t('feature1.text'),
        },
        {
            imagePath: '/icons/building.svg',
            title: t('feature2.title'),
            text: t('feature2.text'),
        },
        {
            imagePath: '/icons/people.svg',
            title: t('feature3.title'),
            text: t('feature3.text'),
        },
    ];

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach((el) => {
                            el.classList.add('visible');
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-24 md:py-36">
            {/* Section label */}
            <div className="reveal flex items-center gap-3 mb-12 md:mb-16">
                <span className="w-8 h-px bg-brand-brown/40" />
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-brown/45">{t('sectionLabel')}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 lg:gap-16">
                {features.map((feature, i) => (
                    <div
                        key={i}
                        className="reveal group flex flex-col items-center p-8 rounded-2xl border border-brand-brown/8 bg-white/40 hover:bg-white/70 hover:border-brand-brown/15 transition-all duration-300 cursor-default"
                        style={{ transitionDelay: `${i * 120}ms` }}
                    >
                        {/* Icon container */}
                        <div className="w-20 h-20 rounded-2xl bg-brand-brown/5 flex items-center justify-center mb-6 group-hover:bg-brand-brown/8 transition-colors duration-300">
                            <img className="w-10 h-10" src={feature.imagePath} alt="" aria-hidden="true" />
                        </div>

                        <div className="font-serif text-brand-brown text-center leading-[1.1] text-[clamp(1.4rem,2.2vw,1.65rem)] mb-4">
                            {feature.title}
                        </div>

                        <div className="font-sans text-sm text-center text-brand-brown/60 leading-relaxed">
                            {feature.text}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
