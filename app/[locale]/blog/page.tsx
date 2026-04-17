import { getAllArticles } from "@/lib/blog/get-articles";
import { BlogHero } from "@/components/sections/BlogHero";
import { ArticleList } from "@/components/sections/ArticleList";

type props = {
    params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: props) {
    const { locale } = await params;
    const articles = getAllArticles(locale);

    return (
        <main className="bg-brand-beige">
            <BlogHero />
            <ArticleList locale={locale} articles={articles} />
        </main>
    );
}
