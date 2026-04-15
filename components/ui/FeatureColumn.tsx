type props = {
    imagePath   : string;
    title       : String;
    text        : String;
};

export const FeatureColumn = ({ imagePath, title, text }: props) => {
    return (
        <div className="flex flex-col items-center justify-start max-w-150 h-auto gap-7">
            <img className="w-33.75 h-33.75" src={imagePath} alt={`icon illustrating the text ${title}`} />
            <div className="font-serif text-brand-brown text-center leading-[1.05] text-balance text-[clamp(2rem,5vw,30px)]">{title}</div>
            <div className="font-sans text-base text-center w-3/5">{text}</div>
        </div>
    );
};