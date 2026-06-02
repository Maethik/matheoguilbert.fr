'use client';

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type props = {
    locale: string;
};

export default function FreelanceSection({ locale }: props) {
    const t = useTranslations('homePageFreelanceSection');
    const sectionRef = useRef(null);

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
            { threshold: 0.1 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="w-full flex justify-center items-center pt-24 md:pt-36">
            <div
                className="w-full max-w-2xl reveal flex flex-col items-start gap-8 p-10 md:p-14 rounded-2xl border border-brand-brown/8 bg-white/40 transition-all duration-300 cursor-default"
                style={{ transitionDelay: `120ms` }}
            >
                <div>
                    <h3 className="font-serif text-brand-brown text-left leading-[1.1] text-[clamp(1.4rem,2.2vw,1.65rem)] mb-4">
                        {t("title")}
                    </h3>

                    <p className="font-sans text-sm text-left text-brand-brown/60 leading-relaxed">
                        {t("text")}
                    </p>
                </div>

                <div className="w-full flex flex-row justify-end">
                    <Link href={`/${locale}/freelance`} className="group flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-brand-brown border-b border-brand-brown/30 pb-0.5 hover:border-brand-brown transition-colors duration-200">
                        {t("cta")}
                        <svg
                            className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}