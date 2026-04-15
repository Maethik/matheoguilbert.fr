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
        <section className="bg-[#f5f5f3] mb-60">
            <div className="mx-auto w-[90vw] px-6">
                <h2 className="mb-20 text-center font-serif text-6xl leading-none text-brand-brown">A propos de moi</h2>

                <div className="relative mx-auto h-80 w-full">
                    {/* Base line */}
                    <div className="absolute left-0 right-0 h-1.5 rounded-full bg-[#d9dde2]" style={{ top: lineTop }} />

                    {/* Brown progress */}
                    <div className="absolute left-0 h-1.5 rounded-full bg-brand-brown" style={{ top: lineTop, width: progressWidth }} />

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="absolute -translate-x-1/2 "
                            style={{ left: step.left, top: lineTop }}
                        >
                            {/* Point */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3">
                                <div className="h-5 w-5 rounded-full border-2 border-white bg-brand-brown shadow-[0_0_0_2px_#3a2318]" />
                            </div>

                            {/* Content */}
                            <div className={`absolute left-1/2 w-55 -translate-x-1/2 text-center ${step.position === "top" ? "bottom-8" : "top-8"}`}>
                                <h3 className="mb-2 font-serif text-3xl text-brand-brown">{step.title}</h3>

                                <p className="text-normal leading-7 text-[#364153]">{step.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}