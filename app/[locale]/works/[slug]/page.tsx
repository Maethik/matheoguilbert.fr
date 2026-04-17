import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug, getProjectSlugs } from "@/lib/projects/get-projects";
import { mdxComponents } from "@/components/mdx/mdxComponents";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectMeta } from "@/components/sections/ProjectMeta";
import { ProjectTechnologies } from "@/components/sections/ProjectTechnologies";
import { OtherProjects } from "@/components/sections/OtherProjects";

type props = {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
};

const LOCALES = ["fr", "en"];

export function generateStaticParams() {
    const paths: { locale: string; slug: string }[] = [];

    LOCALES.forEach((locale) => {
        const slugs = getProjectSlugs(locale);
        slugs.forEach((slug) => {
            paths.push({ locale, slug });
        });
    });

    return paths;
}

export default async function ProjectPage({ params }: props) {
    const { locale, slug } = await params;
    
    const project = getProjectBySlug(slug, locale);

    if (!project) {
        notFound();
    }

    const otherProjects = getAllProjects(locale)
        .filter((item: any) => item.slug !== slug && item.ready)
        .slice(0, 2)
        .map((item: any) => ({
            slug: item.slug,
            title: item.title,
            description: item.description,
            cover: item.cover,
        }));

    return (
        <main className="bg-brand-beige">
            <ProjectHero
                locale={locale}
                title={project.title}
                description={project.description}
                dateLabel={project.dateLabel}
                cover={project.cover}
            />
            <div className="mx-auto max-w-[900px] px-8 md:px-14 lg:px-6">
                <ProjectMeta
                    dateLabel={project.dateLabel}
                    category={project.category}
                    roles={project.roles}
                    client={project.client}
                />

                <ProjectTechnologies technologies={project.technologies} />

                <section className="pb-16">
                    <article
                        className="
                            flex flex-col gap-16
                            [&_h2]:font-serif [&_h2]:text-[clamp(52px,6vw,80px)] [&_h2]:text-brand-brown [&_h2]:leading-none [&_h2]:mb-8 [&_h2]:mt-4
                            [&_p]:font-sans [&_p]:text-sm [&_p]:text-brand-brown/70 [&_p]:leading-[1.8]
                        "
                    >
                        <MDXRemote
                            source={project.content}
                            components={mdxComponents}
                            options={{ blockJS: false, blockDangerousJS: true }}
                        />
                    </article>
                </section>

                <OtherProjects locale={locale} projects={otherProjects} />
            </div>
        </main>
    );
}