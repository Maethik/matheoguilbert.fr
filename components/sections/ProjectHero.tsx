import Link from "next/link";

import { GoArrowLeft } from "react-icons/go";

type props = {
    title: string;
    description: string;
    dateLabel: string;
    locale: string;
};

export function ProjectHero({ title, description, dateLabel, locale }: props) {
    return (
        <div className="md:pt-22 w-full">
            <section className="rounded-[10px] bg-brand-brown flex flex-col items-center justify-center  text-brand-beige px-6 py-4">
                <Link
                    href={`/${locale}#works`}
                    className="w-full mb-10 inline-flex items-center justify-start gap-2 text-sm text-brand-beige"
                >
                    <GoArrowLeft /> Retour aux projets
                </Link>

                <div className="mx-auto flex min-h-90 max-w-4xl flex-col items-center justify-center text-center">
                    <h1 className="text-[clamp(30px,4vw,64px)] font-serif">{title}</h1>
                    <p className="mt-4 font-sans text-base text-brand-beige/80">{description}</p>

                    <div className="mt-8 flex items-center gap-4 text-sm text-brand-beige/70">
                        <span className="h-px w-16 bg-white/30" />
                        <span>{dateLabel}</span>
                        <span className="h-px w-16 bg-white/30" />
                    </div>
                </div>
            </section>
        </div>
    );
}