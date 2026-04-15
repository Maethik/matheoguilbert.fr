export default function TimelineSection() {
    const steps = [
        {
            title: "Les Débuts",
            text: "J'ai commencé par le web en 2019 suite à un stage, je n'ai plus jamais arrêté. Aujourd'hui je veux en faire mon métier",
            position: "top" as const,
            left: "16%",
        },
        {
            title: "L'Évolution",
            text: "Après un bac STI2D avec mention Très bien j'ai entamé un BUT Informatique Parcours Développement IA",
            position: "bottom" as const,
            left: "50%",
        },
        {
            title: "Aujourd'hui",
            text: "Je suis entrepreneur, co-fondateur d'une startup et développeur freelance, je vis de ma passion",
            position: "top" as const,
            left: "84%",
        },
    ];

    const lineTop = "58%";
    const progressWidth = "95%";

    return (
        <section className="bg-[#f5f5f3] py-20 md:py-32">
            <div className="mx-auto w-full px-6 md:w-[90vw]">
                <h2 className="mb-16 text-center font-serif text-4xl leading-none text-brand-brown md:mb-24 md:text-6xl">
                    A propos de moi
                </h2>

                <div className="relative mx-auto w-full md:h-[420px]">
                    {/* Mobile layout */}
                    <div className="flex flex-col gap-6 md:hidden">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="rounded-md border border-gray-300 border-l-4 border-l-brand-brown bg-white p-5"
                            >
                                <h3 className="mb-3 font-serif text-2xl text-brand-brown">
                                    {step.title}
                                </h3>
                                <p className="leading-7 text-[#364153]">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop timeline */}
                    <div className="hidden md:block">
                        {/* Base line */}
                        <div
                            className="absolute left-0 right-0 h-1.5 rounded-full bg-[#d9dde2]"
                            style={{ top: lineTop }}
                        />

                        {/* Brown progress */}
                        <div
                            className="absolute left-0 h-1.5 rounded-full bg-brand-brown"
                            style={{ top: lineTop, width: progressWidth }}
                        />

                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="absolute -translate-x-1/2"
                                style={{ left: step.left, top: lineTop }}
                            >
                                {/* Point */}
                                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                                    <div className="h-5 w-5 rounded-full border-2 border-white bg-brand-brown shadow-[0_0_0_2px_#3a2318]" />
                                </div>

                                {/* Card */}
                                <div
                                    className={[
                                        "absolute left-1/2 w-[280px] -translate-x-1/2 rounded-md border border-gray-300 border-l-4 border-l-brand-brown bg-white p-5 text-center shadow-sm",
                                        step.position === "top"
                                            ? "bottom-10"
                                            : "top-10",
                                    ].join(" ")}
                                >
                                    <h3 className="mb-3 font-serif text-3xl text-brand-brown">
                                        {step.title}
                                    </h3>

                                    <p className="leading-7 text-[#364153]">
                                        {step.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}