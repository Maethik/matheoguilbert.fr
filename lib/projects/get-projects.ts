import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Project, ProjectFrontmatter } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/projects");

export function getProjectSlugs(locale: string) {
    const localeDirectory = path.join(CONTENT_DIR, locale);
    
    if (!fs.existsSync(localeDirectory)) {
        return [];
    }

    return fs
        .readdirSync(localeDirectory)
        .filter((file) => file.endsWith(".mdx"))
        .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function getProjectBySlug(slug: string, locale: string): Project | null {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(CONTENT_DIR, locale, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        ...(data as ProjectFrontmatter),
        content,
    };
}

export function getAllProjects(locale: string): Project[] {
    return getProjectSlugs(locale)
        .map((slug) => getProjectBySlug(slug, locale))
        .filter((project): project is Project => project !== null)
        .sort((a, b) => a.priority - b.priority);
}

export function getRandomOtherProjects(locale: string, excludeSlug: string, count: number): Project[] {
    const candidates = getAllProjects(locale).filter(
        (project) => project.slug !== excludeSlug && project.ready
    );

    for (let i = candidates.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }

    return candidates.slice(0, count);
}