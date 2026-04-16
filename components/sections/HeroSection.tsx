import { FiChevronsDown } from "react-icons/fi";

export default function HeroSection() {
	return (
		<section className="w-full h-[calc(100vh-(2*11px))] rounded-[10px] bg-brand-brown text-brand-beige flex flex-col items-center justify-center relative">
            {/* Title + image container */}
            <div className="flex flex-col w-9/10 gap-2.5
                md:flex-row md:justify-between md:items-center md:w-2/3
            ">
                {/* Rotating texts */}
                <div className="flex flex-col">
                    <p className="text-[clamp(15px,2vw,24px)] font-sans">Ensemble nous allons...</p>
                    <h1 className="text-[clamp(30px,4vw,64px)] font-serif">Construire une solution qui répond à votre problème.</h1>
                </div>

                {/* Image */}
                <img className="rounded-[10px] w-full object-cover h-[clamp(200px,30vh,500px)]  md:h-[clamp(250px,35vh,600px)] lg:h-[clamp(300px,45vh,700px)]" src="/images/pofile.png" alt="Image of me" />
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
