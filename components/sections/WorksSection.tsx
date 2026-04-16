import { Project } from "@/lib/projects/types";
import { ProjectCard } from "../ui/ProjectCard";

type Props = {
    projects: Project[];
    locale: string;
};

export default function WorksSection({ projects, locale }: Props) {
    return (
        <section id="works" className="w-full flex flex-col items-start justify-start">
            <h2 className="text-[clamp(80px,10vw,128px)] font-serif text-brand-brown mt-6 mb-4">Travaux</h2>

            {projects.map((project, index) => (
                <ProjectCard
                    key={project.slug}
                    project={project}
                    locale={locale}
                    isTheLast={index === projects.length - 1}
                />
            ))}
        </section>
    );
}
