import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Article, ArticleFrontmatter } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export function getArticleSlugs(locale: string): string[] {
    const localeDirectory = path.join(CONTENT_DIR, locale);

    if (!fs.existsSync(localeDirectory)) {
        return [];
    }

    return fs
        .readdirSync(localeDirectory)
        .filter((file) => file.endsWith(".mdx"))
        .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string, locale: string): Article | null {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(CONTENT_DIR, locale, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        ...(data as ArticleFrontmatter),
        content,
    };
}

export function getAllArticles(locale: string): Article[] {
    return getArticleSlugs(locale)
        .map((slug) => getArticleBySlug(slug, locale))
        .filter((article): article is Article => article !== null && article.ready)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
