import Link from "next/link";

type props = {
    locale: string;
    projects: {
        slug: string;
        title: string;
        subtitle: string;
    }[];
};

export function OtherProjects({ locale, projects }: props) {
    if (!projects.length) return null;

    return (
        <section className="pb-20 pt-8">
            <h2 className="mb-10 text-center text-5xl font-semibold">
                Autres projets
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/${locale}/works/${project.slug}`}
                        className="group block"
                    >
                        <div className="mb-3 text-2xl font-medium">{project.title}</div>

                        <div className="flex min-h-[220px] items-center justify-center rounded-[22px] bg-white text-4xl shadow-sm transition group-hover:-translate-y-1">
                            {project.title}
                        </div>

                        <p className="mt-3 text-sm text-neutral-500">{project.subtitle}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}