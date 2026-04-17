'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Article } from '@/lib/blog/types';

type props = {
    locale: string;
    articles: Article[];
};

export function ArticleList({ locale, articles }: props) {
    const ref = useRef<HTMLElement>(null);
    const t = useTranslations('blogPage');

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll('.reveal').forEach((node, i) => {
                        setTimeout(() => node.classList.add('visible'), i * 100);
                    });
                    observer.unobserve(el);
                }
            },
            { threshold: 0.05 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    if (!articles.length) {
        return (
            <section className="py-24 px-8 md:px-14 lg:px-20 text-center">
                <p className="font-sans text-sm text-brand-brown/40">{t('noArticles')}</p>
            </section>
        );
    }

    return (
        <section ref={ref} className="py-20 px-8 md:px-14 lg:px-20 max-w-[900px] mx-auto">
            <div className="flex flex-col divide-y divide-brand-brown/10">
                {articles.map((article, i) => {
                    const formatted = new Date(article.date).toLocaleDateString(
                        locale === 'fr' ? 'fr-FR' : 'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                    );

                    return (
                        <Link
                            key={article.slug}
                            href={`/${locale}/blog/${article.slug}`}
                            className="reveal group flex flex-col md:flex-row md:items-center gap-6 py-10 cursor-pointer"
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-brown/40">
                                        {article.category}
                                    </span>
                                    {article.readTime && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-brand-brown/20" />
                                            <span className="font-sans text-[10px] text-brand-brown/30">
                                                {article.readTime}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <h2 className="font-serif text-[clamp(24px,3vw,36px)] leading-tight text-brand-brown uppercase mb-3 group-hover:opacity-70 transition-opacity duration-200">
                                    {article.title}
                                </h2>
                                <p className="font-sans text-sm text-brand-brown/55 leading-relaxed line-clamp-2">
                                    {article.description}
                                </p>
                                <span className="font-sans text-xs text-brand-brown/30 mt-3 block">
                                    {formatted}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-brand-brown/40 group-hover:text-brand-brown transition-colors duration-200 flex-shrink-0">
                                {t('readArticle')}
                                <svg
                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
