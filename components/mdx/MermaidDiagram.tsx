"use client";

import { useEffect, useId, useState } from "react";

export function MermaidDiagram({ code }: { code: string }) {
    const id = useId().replace(/:/g, "");
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        let cancelled = false;

        async function render() {
            try {
                const mermaid = (await import("mermaid")).default;
                mermaid.initialize({ startOnLoad: false, theme: "neutral" });
                const { svg: rendered } = await mermaid.render(`mermaid-${id}`, code);
                if (!cancelled) setSvg(rendered);
            } catch (e) {
                if (!cancelled) setError(e instanceof Error ? e.message : String(e));
            }
        }

        render();
        return () => { cancelled = true; };
    }, [code, id]);

    if (error) {
        return (
            <pre className="text-red-500 text-xs p-4 bg-red-50 rounded-lg border border-red-200 overflow-auto">
                {error}
            </pre>
        );
    }

    if (!svg) {
        return <div className="h-32 bg-brand-beige/50 rounded-lg animate-pulse" />;
    }

    return (
        <div
            className="overflow-auto py-6 flex justify-center"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
