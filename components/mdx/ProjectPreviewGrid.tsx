'use client';

import { useState } from 'react';

type PreviewItem = {
    title: string;
    image: string;
};

type props = {
    items?: PreviewItem[];
};

function PreviewImage({ title, image }: PreviewItem) {
    const [failed, setFailed] = useState(false);

    if (failed) return null;

    return (
        <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
            onError={() => setFailed(true)}
        />
    );
}

export function ProjectPreviewGrid({ items = [] }: props) {
    return (
        <div className={`grid gap-4 ${items.length > 1 ? 'lg:grid-cols-2' : ''}`}>
            {items.map((item) => (
                <PreviewImage key={item.title} title={item.title} image={item.image} />
            ))}
        </div>
    );
}
