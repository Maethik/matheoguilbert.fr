import HeroSection from "@/components/sections/HeroSection";
import WorksSection from "@/components/sections/WorksSection";
import FeatureSection from "@/components/sections/FeatureSection";

export default function Home() {
	return (
		<main className=" bg-brand-beige text-brand-black flex flex-col items-center justify-center">
			<HeroSection />
			<WorksSection />
			<FeatureSection />
		</main>
	);
}