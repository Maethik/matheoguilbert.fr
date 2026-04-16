export type ProjectFrontmatter = {
    title: string;
    subtitle: string;
    year: number;
    category: string;
    client: string;
    roles: string[];
    technologies: string[];
    preview1?: string;
    preview2?: string;
    website: string;
    featured: boolean;
    description: string;
    dateLabel: string;
};

export type Project = ProjectFrontmatter & {
    slug: string;
    content: string;
};
