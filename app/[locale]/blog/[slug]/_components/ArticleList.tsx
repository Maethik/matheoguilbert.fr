'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Article } from '@/lib/blog/types';

type props = {
    locale: string;
    articles: Article[];
};

function FeaturedCover({ cover, title, category }: { cover?: string; title: string; category: string }) {
    const [hidden, setHidden] = useState(false);
    if (!cover || hidden) return null;
    return (
        <div className="relative w-full md:w-[58%] h-64 md:h-auto overflow-hidden flex-shrink-0">
            <Image src={cover} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" onError={() => setHidden(true)} />
            <div className="absolute top-5 left-5">
                <span className="bg-brand-beige/90 backdrop-blur-sm font-sans text-[10px] uppercase tracking-[0.2em] text-brand-brown/60 px-3 py-1.5 rounded-full">
                    {category}
                </span>
            </div>
        </div>
    );
}

function MediumCover({ cover, title, category }: { cover?: string; title: string; category: string }) {
    const [hidden, setHidden] = useState(false);
    if (!cover || hidden) return null;
    return (
        <div className="relative h-52 overflow-hidden flex-shrink-0">
            <Image src={cover} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" onError={() => setHidden(true)} />
            <div className="absolute top-4 left-4">
                <span className="bg-brand-beige/90 backdrop-blur-sm font-sans text-[10px] uppercase tracking-[0.2em] text-brand-brown/60 px-3 py-1.5 rounded-full">
                    {category}
                </span>
            </div>
        </div>
    );
}

function ThumbnailCover({ cover, title }: { cover?: string; title: string }) {
    const [hidden, setHidden] = useState(false);
    if (!cover || hidden) return null;
    return (
        <div className="relative w-full sm:w-24 h-16 sm:h-16 rounded-[4px] overflow-hidden flex-shrink-0">
            <Image src={cover} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" onError={() => setHidden(true)} />
        </div>
    );
}

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

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    const [featured, ...rest] = articles;
    const secondRow = rest.slice(0, 2);
    const remaining = rest.slice(2);

    return (
        <section ref={ref} className="py-20 px-8 md:px-14 lg:px-20 max-w-[1100px] mx-auto">
            <div className="flex flex-col gap-5">

                {/* Featured — most recent article, full width */}
                <Link
                    href={`/${locale}/blog/${featured.slug}`}
                    className="reveal group relative overflow-hidden rounded-[8px] border border-brand-brown/10 flex flex-col md:flex-row cursor-pointer"
                >
                    <FeaturedCover cover={featured.cover} title={featured.title} category={featured.category} />

                    <div className="flex-1 flex flex-col justify-between p-8 md:p-12 bg-brand-beige">
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-brown/40">
                                    {formatDate(featured.date)}
                                </span>
                                {featured.readTime && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-brand-brown/20" />
                                        <span className="font-sans text-[10px] text-brand-brown/30">
                                            {featured.readTime}
                                        </span>
                                    </>
                                )}
                            </div>
                            <h2 className="font-serif text-[clamp(20px,2.2vw,32px)] leading-tight text-brand-brown uppercase mb-5 group-hover:opacity-70 transition-opacity duration-200">
                                {featured.title}
                            </h2>
                            <p className="font-sans text-sm text-brand-brown/55 leading-relaxed line-clamp-3">
                                {featured.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-brand-brown/40 group-hover:text-brand-brown transition-colors duration-200 mt-8">
                            {t('readArticle')}
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </Link>

                {/* Second row — 2 medium cards */}
                {secondRow.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {secondRow.map((article, i) => (
                            <Link
                                key={article.slug}
                                href={`/${locale}/blog/${article.slug}`}
                                className="reveal group overflow-hidden rounded-[8px] border border-brand-brown/10 flex flex-col cursor-pointer bg-brand-beige"
                                style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                            >
                                <MediumCover cover={article.cover} title={article.title} category={article.category} />

                                <div className="flex flex-col flex-1 justify-between p-7">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-brown/40">
                                                {formatDate(article.date)}
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
                                        <h2 className="font-serif text-[clamp(18px,2.2vw,26px)] leading-tight text-brand-brown uppercase mb-3 group-hover:opacity-70 transition-opacity duration-200">
                                            {article.title}
                                        </h2>
                                        <p className="font-sans text-sm text-brand-brown/55 leading-relaxed line-clamp-2">
                                            {article.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-brand-brown/40 group-hover:text-brand-brown transition-colors duration-200 mt-6">
                                        {t('readArticle')}
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Remaining — compact horizontal list */}
                {remaining.length > 0 && (
                    <div className="rounded-[8px] border border-brand-brown/10 overflow-hidden bg-brand-beige divide-y divide-brand-brown/8">
                        {remaining.map((article, i) => (
                            <Link
                                key={article.slug}
                                href={`/${locale}/blog/${article.slug}`}
                                className="reveal group flex flex-col sm:flex-row sm:items-center gap-5 p-6 md:p-7 hover:bg-brand-brown/3 transition-colors duration-200 cursor-pointer"
                                style={{ transitionDelay: `${(i + 3) * 80}ms` }}
                            >
                                <ThumbnailCover cover={article.cover} title={article.title} />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-brown/40">
                                            {article.category}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-brand-brown/20" />
                                        <span className="font-sans text-[10px] text-brand-brown/30">
                                            {formatDate(article.date)}
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
                                    <h2 className="font-serif text-[clamp(16px,1.8vw,20px)] leading-tight text-brand-brown uppercase mb-1 group-hover:opacity-70 transition-opacity duration-200">
                                        {article.title}
                                    </h2>
                                    <p className="font-sans text-sm text-brand-brown/50 leading-relaxed line-clamp-1">
                                        {article.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-brand-brown/40 group-hover:text-brand-brown transition-colors duration-200 flex-shrink-0">
                                    {t('readArticle')}
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}
