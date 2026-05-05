import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/blog/get-articles";
import { locales } from "@/middleware";

const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://matheoguilbert.fr"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
        {
            url: `${siteUrl}/${locale}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${siteUrl}/${locale}/blog`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ]);

    const blogPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
        getAllArticles(locale).map((article) => ({
            url: `${siteUrl}/${locale}/blog/${article.slug}`,
            lastModified: new Date(article.date),
            changeFrequency: "monthly",
            priority: 0.7,
        }))
    );

    return [...staticPages, ...blogPages];
}