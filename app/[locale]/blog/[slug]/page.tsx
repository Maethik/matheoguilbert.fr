import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getArticleSlugs } from "@/lib/blog/get-articles";
import { ArticleHero } from "@/components/sections/ArticleHero";
import { locales } from "@/middleware";

type props = {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
};

export function generateStaticParams() {
    const paths: { locale: string; slug: string }[] = [];

    locales.forEach((locale) => {
        getArticleSlugs(locale).forEach((slug) => {
            paths.push({ locale, slug });
        });
    });

    return paths;
}

export default async function ArticlePage({ params }: props) {
    const { locale, slug } = await params;
    const article = getArticleBySlug(slug, locale);

    if (!article || !article.ready) {
        notFound();
    }

    return (
        <main className="bg-brand-beige">
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
                        flex flex-col gap-12
                        [&_h2]:font-serif [&_h2]:text-[clamp(40px,5vw,64px)] [&_h2]:text-brand-brown [&_h2]:leading-none [&_h2]:mb-6 [&_h2]:mt-2
                        [&_p]:font-sans [&_p]:text-sm [&_p]:text-brand-brown/70 [&_p]:leading-[1.9]
                        [&_strong]:font-semibold [&_strong]:text-brand-brown/85
                    "
                >
                    <MDXRemote
                        source={article.content}
                        options={{ blockJS: false, blockDangerousJS: true }}
                    />
                </article>
            </div>
        </main>
    );
}
