import { getAllArticles } from "@/lib/blog/get-articles";
import { BlogHero } from "@/app/[locale]/blog/_components/BlogHero";
import { BlogCTASection } from "@/app/[locale]/blog/_components/BlogCTASection";
import { ArticleList } from "@/app/[locale]/blog/[slug]/_components/ArticleList";
import { getTranslations } from "next-intl/server";
import { BlogSubFormController } from '@/components/ui/BlogSubFormController';

type props = {
    params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: props) {
    const { locale } = await params;
    const t = await getTranslations('blogPage.blogSubscription');
    const articles = getAllArticles(locale);

    return (
        <main className="bg-brand-beige">
            <BlogSubFormController />

            <BlogHero />

            <BlogCTASection
                locale={locale}
                title={t("title")}
                text={t("text")}
                cta={t("cta")}
            />

            <ArticleList locale={locale} articles={articles} />
        </main>
    );
}
