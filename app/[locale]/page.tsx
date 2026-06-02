import HeroSection from "@/app/[locale]/_components/HeroSection";
import WorksSection from "@/app/[locale]/_components/WorksSection";
import ApproachSection from "@/app/[locale]/_components/AppoachSection";
import TimelineSection from "@/app/[locale]/_components/AboutSection";

import { getAllProjects } from "@/lib/projects/get-projects";

type props = {
	params: Promise<{
		locale: string;
	}>;
};

export default async function Home({ params }: props) {
	const { locale } = await params;
	const projects = getAllProjects(locale).filter((item) => item.ready);

	return (
		<main className="bg-brand-beige text-brand-brown flex flex-col">
			<HeroSection />
			<div className="px-8 md:px-14 lg:px-20">
				<WorksSection projects={projects} locale={locale} />
				<ApproachSection />
				<TimelineSection />
			</div>
		</main>
	);
}