import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Project, ProjectFrontmatter } from "./types";

const projectsDirectory = path.join(process.cwd(), "content/projects");

function fileNameToSlug(fileName: string) {
    return fileName.replace(/\.mdx$/, "");
}

export function getProjectSlugs() {
    return fs
        .readdirSync(projectsDirectory)
        .filter((file) => file.endsWith(".mdx"))
        .map(fileNameToSlug);
}

export function getProjectBySlug(slug: string): Project | null {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(projectsDirectory, `${realSlug}.mdx`);

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

export function getAllProjects(): Project[] {
    return getProjectSlugs()
        .map((slug) => getProjectBySlug(slug))
        .filter((project): project is Project => project !== null)
        .sort((a, b) => a.priority - b.priority);
}
