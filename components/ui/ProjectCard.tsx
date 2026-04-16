import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { Project } from "@/lib/projects/types";

type props = {
    project: Project;
    locale: string;
    isTheLast?: boolean;
};

export const ProjectCard = ({ project, locale, isTheLast = false }: props) => {

    return (
        <div className="w-full pb-8">
            <div className="w-full h-px bg-brand-brown/20 mb-8" />

            <Link href={`/${locale}/works/${project.slug}`} className="group block pointer-cursor">
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center lg:gap-14 relative">

                    {/* Date label */}
                    <div className="text-5xl font-serif text-brand-brown/40 mt-6 font-semibold lg:absolute lg:top-1 lg:right-1">
                        {project.dateLabel}
                    </div>

                    {/* Left image */}
                    <div className="w-full rounded-[10px] lg:w-3/5 h-92.5 bg-gray-600 overflow-hidden">
                        <img
                            src={project.cover}
                            alt={project.title}
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        />
                    </div>

                    {/* Right content */}
                    <div className="flex flex-col items-start justify-center w-full gap-7.5">
                        <div className="flex flex-col items-start justify-center w-full">
                            <div className="p-1.5 bg-brand-brown rounded-px text-brand-beige font-sans">{project.category}</div>
                            <div className="text-5xl text-brand-brown font-serif uppercase">{project.title}</div>
                            <div className="text-2xl font-serif font-light">
                                <p>
                                    (
                                    {project.roles.map((role, index) => role + (index < project.roles.length - 1 ? ", " : ""))}
                                    )
                                </p>
                            </div>
                        </div>

                        <div className="text-base font-normal font-sans">{project.description}</div>

                        <div className="border-b text-base flex flex-row justify-center items-center gap-0.5 transition group-hover:gap-1.5">
                            <p>READ</p>
                            <GoArrowRight />
                        </div>
                    </div>
                </div>
            </Link>

            {isTheLast && <div className="w-full h-px mt-8 bg-brand-brown/20" />}
        </div>
    );
};
