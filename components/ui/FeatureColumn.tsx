type props = {
    imagePath   : string;
    title       : String;
    text        : String;
};

export const FeatureColumn = ({ imagePath, title, text }: props) => {
    return (
        <div className="flex flex-col items-center justify-start h-100 gap-7">
            <img className="w-33.75 h-33.75" src={imagePath} alt={`icon illustrating the text ${title}`} />
            <div className="font-serif text-brand-brown text-3xl">{title}</div>
            <div className="font-sans text-normal text-center w-3/5">{text}</div>
        </div>
    );
};