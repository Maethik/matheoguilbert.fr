import HeroSection from "@/components/sections/HeroSection";
import WorksSection from "@/components/sections/WorksSection";
import FeatureSection from "@/components/sections/FeatureSection";
import TimelineSection from "@/components/sections/AboutSection";

import { getAllProjects } from "@/lib/projects/get-projects";

type props = {
	params: Promise<{
		locale: string;
	}>;
};

export default async function Home({ params }: props) {
	const { locale } = await params;
	const projects = getAllProjects().filter((item) => item.ready);

	return (
		<main className=" bg-brand-beige text-brand-black flex flex-col items-center justify-center">
			<HeroSection />
			<WorksSection projects={projects} locale={locale} />
			<FeatureSection />
			<TimelineSection />
		</main>
	);
}
