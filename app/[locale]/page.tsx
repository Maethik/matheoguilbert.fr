import HeroSection from "@/components/sections/HeroSection";
import WorksSection from "@/components/sections/WorksSection";
import FeatureSection from "@/components/sections/FeatureSection";
import TimelineSection from "@/components/sections/AboutSection";

import { getAllProjects } from "@/lib/projects/get-projects";

type Props = {
	params: Promise<{
		locale: string;
	}>;
};

export default async function Home({ params }: Props) {
	const { locale } = await params;
	const projects = getAllProjects();

	return (
		<main className=" bg-brand-beige text-brand-black flex flex-col items-center justify-center">
			<HeroSection />
			<WorksSection projects={projects} locale={locale} />
			<FeatureSection />
			<TimelineSection />
		</main>
	);
}
