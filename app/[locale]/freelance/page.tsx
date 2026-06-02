import { getProjectBySlug } from "@/lib/projects/get-projects";
import { Project } from "@/lib/projects/types";
import FreelanceClient from "./_client";

type props = {
    params: Promise<{ locale: string }>;
};

export default async function FreelancePage({ params }: props) {
    const { locale } = await params;

    const slugOrder = ['MGDev', 'Thence', 'EverEastSolutions'];
    const projects = slugOrder
        .map((s) => getProjectBySlug(s, locale))
        .filter((p): p is Project => p !== null && p.ready);

    return <FreelanceClient projects={projects} locale={locale} />;
}
