'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

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
            ref={sectionRef}
            className="w-full min-h-[calc(100vh-(2*11px))] rounded-[10px] bg-brand-brown text-brand-beige flex flex-col overflow-hidden relative"
        >
            {/* Main content */}
            <div className="flex flex-col lg:flex-row flex-1 px-8 md:px-14 lg:px-20 pt-16 pb-12 gap-10 lg:gap-0">

                {/* Left — editorial text */}
                <div className="flex flex-col justify-center lg:w-[55%] lg:pr-12 gap-8 lg:gap-10">

                    {/* Label */}
                    <div
                        className="hero-reveal"
                        style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                    >
                        <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-brand-beige/50">
                            <span className="w-6 h-px bg-brand-beige/30" />
                            Développeur Full Stack &amp; Architecte Web
                        </span>
                    </div>

                    {/* Headline */}
                    <div
                        className="hero-reveal"
                        style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                    >
                        <h1 className="font-serif leading-[0.95] text-[clamp(36px,5.5vw,88px)] text-brand-beige">
                            Ensemble,<br />
                            <em className="not-italic text-brand-beige/70">construisons</em><br />
                            ce qui dure.
                        </h1>
                    </div>

                    {/* Description */}
                    <div
                        className="hero-reveal"
                        style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                    >
                        <p className="font-sans text-base font-light text-brand-beige/60 max-w-md leading-relaxed">
                            Je conçois des architectures robustes, scalables et pérennes —
                            des fondations qui supportent la croissance de votre produit dans le temps.
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
                                Voir mes travaux
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
                    {/* Decorative accent ring */}
                    <div className="absolute inset-4 rounded-[14px] border border-brand-beige/8 pointer-events-none" />

                    <div className="relative w-full h-full min-h-[320px] lg:min-h-0 rounded-[10px] overflow-hidden">
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
            <div className="flex justify-between items-end px-8 md:px-14 lg:px-20 pb-8">
                {/* Tech tags */}
                <div
                    className="hero-reveal flex gap-3 flex-wrap"
                    style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}
                >
                    {['FastAPI', 'React', 'PostgreSQL', 'Docker'].map((tag) => (
                        <span
                            key={tag}
                            className="font-sans text-[11px] uppercase tracking-widest text-brand-beige/35 border border-brand-beige/15 rounded-full px-3 py-1"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

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
                    <span className="font-sans text-[10px] uppercase tracking-[0.15em]">Défiler</span>
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
