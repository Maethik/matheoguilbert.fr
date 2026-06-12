import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllArticles, getAlternatesArticle } from "@/lib/blog/get-articles";
import { ArticleHero } from "@/app/[locale]/blog/[slug]/_components/ArticleHero";
import { ArticleSummary } from "@/app/[locale]/blog/[slug]/_components/ArticleSummary";
import { locales } from "@/middleware";
import Link from "next/link";
import { MermaidDiagram } from "@/components/mdx/MermaidDiagram";

type props = {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://matheoguilbert.fr").replace(/\/$/, "");

export async function generateMetadata({ params }: props): Promise<Metadata> {
    const { locale, slug } = await params;
    const article = getArticleBySlug(slug, locale);

    if (!article || !article.ready) {
        return {};
    }

    const languageAlternates = getAlternatesArticle(article);
    const absoluteLanguageAlternates = Object.fromEntries(
        Object.entries(languageAlternates).map(([language, path]) => [
            language,
            `${siteUrl}${path}`,
        ])
    );

    const url = `${siteUrl}/${locale}/blog/${slug}`;
    const title = article.title;
    const description = article.description;
    const imageUrl = article.cover
        ? article.cover.startsWith("http")
            ? article.cover
            : `${siteUrl}${article.cover}`
        : `${siteUrl}/og-image.jpg`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                ...absoluteLanguageAlternates,
                "x-default": url,
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: "Mathéo Guilbert",
            type: "article",
            locale,
            publishedTime: article.date,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export function generateStaticParams() {
    const paths: { locale: string; slug: string }[] = [];

    locales.forEach((locale) => {
        getAllArticles(locale).forEach((article) => {
            paths.push({
                locale,
                slug: article.slug,
            });
        });
    });

    return paths;
}

const mdxComponents = {
    a: (props: any) => {
        const href = props.href;
        const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

        if (isInternalLink) {
            return (
                <Link href={href} {...props}>
                    {props.children}
                </Link>
            );
        }

        return (
            <a
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {props.children}
            </a>
        );
    },
    pre: (props: React.ComponentPropsWithoutRef<"pre"> & { children?: React.ReactElement<{ className?: string; children?: React.ReactNode }> }) => {
        const child = props.children;
        const isMermaid = child?.props?.className?.includes("language-mermaid");

        if (isMermaid && child) {
            const code = String(child.props.children).trimEnd();
            return <MermaidDiagram code={code} />;
        }

        return <pre {...props} />;
    },
};

export default async function ArticlePage({ params }: props) {
    const { locale, slug } = await params;
    const article = getArticleBySlug(slug, locale);

    if (!article || !article.ready) {
        notFound();
    }

    const articleUrl = `${siteUrl}/${locale}/blog/${slug}`;

    const imageUrl = article.cover
        ? article.cover.startsWith("http")
            ? article.cover
            : `${siteUrl}${article.cover}`
        : `${siteUrl}/og-image.jpg`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        image: imageUrl,
        datePublished: article.date,
        dateModified: article.date,
        author: {
            "@type": "Person",
            name: "Mathéo Guilbert",
            url: siteUrl,
        },
        publisher: {
            "@type": "Person",
            name: "Mathéo Guilbert",
            url: siteUrl,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
        },
    };

    return (
        <main className="bg-brand-beige">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />
            
            <ArticleHero
                locale={locale}
                title={article.title}
                description={article.description}
                category={article.category}
                date={article.date}
                readTime={article.readTime}
                cover={article.cover}
            />
            <div className="mx-auto max-w-[720px] px-8 md:px-14 lg:px-6 py-20">
                {article.summary && article.summary.length > 0 && (
                    <ArticleSummary items={article.summary} />
                )}
                {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-14">
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-sans text-[10px] uppercase tracking-[0.18em] text-brand-brown/50 border border-brand-brown/15 rounded-full px-3 py-1 hover:border-brand-brown/35 transition-colors duration-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <article
                    className="
                        flex flex-col gap-5
                        [&_h2]:font-serif [&_h2]:text-[clamp(40px,5vw,64px)] [&_h2]:text-brand-brown [&_h2]:leading-none [&_h2]:mb-6 [&_h2]:mt-2
                        [&_h3]:font-serif [&_h3]:text-[clamp(24px,3vw,36px)] [&_h3]:text-brand-brown [&_h3]:leading-tight [&_h3]:mb-4 [&_h3]:mt-2
                        [&_p]:font-sans [&_p]:text-sm [&_p]:text-brand-brown/70 [&_p]:leading-[1.9]
                        [&_strong]:font-semibold [&_strong]:text-brand-brown/85
                        [&_a]:text-brand-brown [&_a]:underline 
                        [&_ul]:font-sans [&_ul]:text-sm [&_ul]:text-brand-brown/70 [&_ul]:leading-[1.9] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
                        [&_li]:font-sans [&_li]:text-sm [&_li]:text-brand-brown/70 [&_li]:leading-[1.9]
                        [&_pre]:bg-brand-brown/5 [&_pre]:border [&_pre]:border-brand-brown/10 [&_pre]:text-brand-brown [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-xs [&_pre]:leading-relaxed
                        [&_pre_code]:font-mono [&_pre_code]:bg-transparent [&_pre_code]:p-0
                        [&_code]:font-mono [&_code]:text-xs [&_code]:bg-brand-brown/10 [&_code]:text-brand-brown [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5
                    "
                >
                    <MDXRemote
                        source={article.content}
                        options={{ blockJS: false, blockDangerousJS: true }}
                        components={mdxComponents}
                    />
                </article>
            </div>
        </main>
    );
}
