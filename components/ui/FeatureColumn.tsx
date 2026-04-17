type props = {
    imagePath: string;
    title: string;
    text: string;
    delay?: number;
};

export const FeatureColumn = ({ imagePath, title, text, delay = 0 }: props) => {
    return (
        <div
            className="reveal flex flex-col items-center justify-start max-w-[320px] gap-6"
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Icon container */}
            <div className="w-20 h-20 rounded-2xl bg-brand-brown/6 flex items-center justify-center group-hover:bg-brand-brown/10 transition-colors duration-300">
                <img
                    className="w-10 h-10"
                    src={imagePath}
                    alt=""
                    aria-hidden="true"
                />
            </div>

            <div className="font-serif text-brand-brown text-center leading-[1.1] text-[clamp(1.5rem,2.5vw,1.75rem)]">
                {title}
            </div>

            <div className="font-sans text-sm text-center text-brand-brown/65 leading-relaxed">
                {text}
            </div>
        </div>
    );
};
