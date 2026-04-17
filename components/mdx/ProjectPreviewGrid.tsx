type PreviewItem = {
    title: string;
    image: string;
};

type props = {
    items?: PreviewItem[];
};

export function ProjectPreviewGrid({ items = [] }: props) {
    return (
        <div className={`grid gap-4 ${items.length > 1 ? 'lg:grid-cols-2' : ''}`}>
            {items.map((item) => (
                <div
                    key={item.title}
                    className="rounded-xl overflow-hidden bg-brand-brown/5 border border-brand-brown/8"
                >
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="min-h-[220px] flex items-center justify-center text-brand-brown/30 font-sans text-sm">
                            {item.title}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
