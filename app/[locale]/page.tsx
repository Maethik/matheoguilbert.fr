import HeroSection from "@/components/sections/HeroSection";
import WorksSection from "@/components/sections/WorksSection";

export default function Home() {
	return (
		<main className=" bg-brand-beige text-brand-black flex flex-col items-center justify-center">
			<HeroSection />
			<WorksSection />
		</main>
	);
}