type VisitButtonProps = {
    href: string;
};

export function ProjectVisitButton({ href }: VisitButtonProps) {
    if (!href) return null;

    return (
        <div className="flex justify-center py-6">
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 bg-brand-brown text-brand-beige font-sans text-sm uppercase tracking-[0.18em] px-8 py-4 rounded-full hover:bg-brand-brown/85 transition-colors duration-200 cursor-pointer"
            >
                Visiter le projet
                <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </div>
    );
}
