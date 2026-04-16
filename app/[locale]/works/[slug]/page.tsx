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

export function generateStaticParams() {
    return getProjectSlugs().flatMap((slug: any) => [
        { locale: "fr", slug },
        { locale: "en", slug },
    ]);
}

export default async function ProjectPage({ params }: props) {
    const { locale, slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const otherProjects = getAllProjects()
        .filter((item: any) => item.slug !== slug)
        .slice(0, 2)
        .map((item: any) => ({
            slug: item.slug,
            title: item.title,
            subtitle: item.subtitle,
        }));

    return (
        <main className="bg-[#f5f3ef]">
            <div className="mx-auto max-w-full flex flex-col items-center">
                <ProjectHero
                    locale={locale}
                    title={project.title}
                    description={project.description}
                    dateLabel={project.dateLabel}
                />

                <div className="lg:max-w-[70vw]">
                    <ProjectMeta
                        dateLabel={project.dateLabel}
                        category={project.category}
                        roles={project.roles}
                        client={project.client}
                    />

                    <ProjectTechnologies technologies={project.technologies} />

                    <section className="pb-16">
                        <article className="
                            flex flex-col gap-20
                            [&>div>h2]:text-[clamp(80px,10vw,128px)] [&>div>h2]:font-serif [&>div>h2]:text-brand-brown
                        ">
                            <MDXRemote
                                source={project.content}
                                components={mdxComponents}
                                options={{ blockJS: false, blockDangerousJS: true }}
                            />
                        </article>
                    </section>

                    <OtherProjects locale={locale} projects={otherProjects} />
                </div>

            </div>
        </main>
    );
}
