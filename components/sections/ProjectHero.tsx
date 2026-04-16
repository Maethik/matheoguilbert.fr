import Link from "next/link";

type Props = {
    title: string;
    subtitle: string;
    year: number;
    locale: string;
};

export function ProjectHero({ title, subtitle, year, locale }: Props) {
    return (
        <section className="rounded-[28px] bg-[#2b160f] px-6 py-16 text-white md:px-12 md:py-28">
            <Link
                href={`/${locale}/works`}
                className="mb-10 inline-flex text-sm text-white/80 hover:text-white"
            >
                ← Retour aux projets
            </Link>

            <div className="mx-auto flex min-h-[360px] max-w-4xl flex-col items-center justify-center text-center">
                <h1 className="text-5xl font-semibold md:text-7xl">{title}</h1>
                <p className="mt-4 text-lg text-white/80 md:text-2xl">{subtitle}</p>

                <div className="mt-8 flex items-center gap-4 text-sm text-white/70">
                    <span className="h-px w-16 bg-white/30" />
                    <span>{year}</span>
                    <span className="h-px w-16 bg-white/30" />
                </div>
            </div>
        </section>
    );
}