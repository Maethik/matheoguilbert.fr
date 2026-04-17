"use client";

import { usePathname, useRouter } from "next/navigation";

import { locales, defaultLocale } from "@/middleware";

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    // Extract the language from the url
    const currentLocale = pathname.split('/')[1] || defaultLocale;

    const switchLanguage = (newLocale: string) => {
        if (currentLocale === newLocale) return;
        
        // Switch language in the url
        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPath = segments.join('/');
        
        // Redirect user
        router.push(newPath);
    };

    return (
        <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-brand-beige">
            {locales.map((language, index) => (
                <div key={index}>
                    <button 
                        onClick={() => switchLanguage(language)}
                        className={`transition-opacity duration-200 cursor-pointer ${currentLocale === language ? 'opacity-100 font-medium' : 'opacity-40 hover:opacity-70'}`}
                        aria-label="Passer en français"
                    >
                        {language}
                    </button>
                    {index < locales.length - 1 && <span className="opacity-20">|</span>}
                </div>
            ))}
        </div>
    );
}