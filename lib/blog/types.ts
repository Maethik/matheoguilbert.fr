export type ArticleFrontmatter = {
    ready: boolean;
    translationKey: string;
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
    cover?: string;
    readTime?: string;
    summary?: string[];
};

export type Article = ArticleFrontmatter & {
    slug: string;
    content: string;
};
