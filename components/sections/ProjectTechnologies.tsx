type props = {
    technologies: string[];
};

export function ProjectTechnologies({ technologies }: props) {
    return (
        <section className="pb-16">
            <p className="mb-4 text-sm text-neutral-500">Technologies</p>

            <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                    <span
                        key={tech}
                        className="rounded-full bg-brand-brown px-4 py-2 text-sm text-white"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </section>
    );
}