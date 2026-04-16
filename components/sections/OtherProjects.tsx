import Link from "next/link";

type props = {
    locale: string;
    projects: {
        slug: string;
        title: string;
        description: string;
        cover: string;
    }[];
};

export function OtherProjects({ locale, projects }: props) {
    if (!projects.length) return null;

    return (
        <section className="pb-20 pt-8">
            <h2 className="mb-10 text-center text-[clamp(80px,10vw,128px)] font-serif text-brand-brown">
                Autres projets
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/${locale}/works/${project.slug}`}
                        className="group block"
                    >
                        <div className="mb-3 text-3xl font-sans">{project.title}</div>
                        <p className="mb-3 text-sm text-neutral-500">{project.description}</p>
                        <img className="flex min-h-[220px] items-center justify-center rounded-[22px] bg-white text-4xl shadow-sm transition group-hover:-translate-y-1" src={project.cover} alt="cover image" />
                    </Link>
                ))}
            </div>
        </section>
    );
}