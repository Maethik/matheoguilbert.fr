import { FiChevronsDown } from "react-icons/fi";

export default function HeroSection() {
	return (
		<section className="w-full h-[calc(100vh-(2*11px))] rounded-[10px] bg-brand-brown text-brand-beige flex flex-col items-center justify-center relative">
            {/* Title + image container */}
            <div className="flex flex-row justify-between items-center w-2/3 gap-2.5">
                {/* Rotating texts */}
                <div className="flex flex-col">
                    <p className="text-2xl font-sans">Ensemble nous allons...</p>
                    <h1 className="text-[64px] font-serif">Construire une solution qui répond à votre problème.</h1>
                </div>

                {/* Image */}
                <img className="rounded-[10px]" src="/images/pofile.png" alt="Image of me" />
            </div>

            {/* Call to scroll */}
            <div className="flex flex-row justify-center items-center gap-2.5 absolute bottom-6">
                <FiChevronsDown />
                <p className="text-base font-sans">Voir mes travaux</p>
                <FiChevronsDown />
            </div>
		</section>
	);
}
