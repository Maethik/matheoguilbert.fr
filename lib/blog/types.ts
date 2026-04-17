export type ArticleFrontmatter = {
    ready: boolean;
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
