"use client";

import Link from "next/link";
import React, { useState, useEffect, MouseEvent } from "react";
import { useParams, usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";

import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Header() {
    const params = useParams<{ locale?: string }>();
    const pathname = usePathname();
    const locale = params?.locale ?? "fr";
    const t = useTranslations('header');
    const homePath = `/${locale}`;

    const links = [
        { text: t('home'), target: `${homePath}#home` },
        { text: t('works'), target: `${homePath}#works` },
        { text: t('about'), target: `${homePath}#about` },
        { text: t('blog'), target: `${homePath}/blog` },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [showText, setShowText] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return false;

        element.scrollIntoView({ behavior: "smooth" });
        return true;
    };

    const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
        const isAnchor = target.includes("#");
        const isOnHome = pathname === homePath || pathname === `${homePath}/`;

        if (isAnchor && isOnHome) {
            e.preventDefault();
            const sectionId = target.split("#")[1];
            scrollToSection(sectionId);
        }

        setIsOpen(false);
    };

    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (!hash) return;

        if (scrollToSection(hash)) return;

        const timer = window.setTimeout(() => {
            scrollToSection(hash);
        }, 120);

        return () => window.clearTimeout(timer);
    }, [pathname]);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setShowText(true), 450);
            return () => clearTimeout(timer);
        }

        setShowText(false);
    }, [isOpen]);

    return (
        <div className="bg-brand-beige h-20 fixed left-2.75 right-2.75 z-50 rounded-b-[20px]">
            <header className="h-20 bg-brand-brown text-brand-beige py-6 px-10 flex justify-between items-center rounded-[10px]">
                <Link href={`${homePath}#home`}>
                    <div className="hidden md:block font-serif text-2xl font-light cursor-pointer">M. Guilbert</div>
                    <img className="block md:hidden w-auto h-15 cursor-pointer" src="/icons/logo.svg" alt="logo mg dev" />
                </Link>

                <nav className="hidden sm:block">
                    <ul className="flex gap-8 font-sans text-base font-light">
                        {links.map((link, index) => (
                            <li key={index} className="cursor-pointer">
                                <Link href={link.target} onClick={(e) => handleAnchorClick(e, link.target)}>
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="hidden sm:block">
                    <LanguageSwitcher />
                </div>

                <nav className="block sm:hidden">
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer"
                        aria-label="Ouvrir le menu"
                    >
                        <CiMenuFries className="text-3xl" />
                    </button>
                </nav>
            </header>

            <div className={`sm:hidden fixed inset-2.75 z-60 overflow-hidden rounded-[10px] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                <div className={`absolute right-6 top-2 h-14 w-14 rounded-full bg-[#5a4336] transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "scale-[38]" : "scale-0"} origin-center`} />

                <div className={`relative z-10 flex h-full flex-col justify-between px-10 pt-5 pb-10 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                    <div className="flex items-center justify-between">
                        <div className="font-serif text-2xl font-light text-brand-beige">
                            M. Guilbert
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="text-brand-beige text-3xl leading-none"
                            aria-label="Fermer le menu"
                        >
                            <IoCloseOutline />
                        </button>
                    </div>

                    <nav>
                        <ul className="flex flex-col gap-4">
                            {links.map((link, index) => (
                                <li
                                    key={index}
                                    className={`
                                        cursor-pointer text-brand-beige font-serif text-[clamp(2.4rem,9vw,5rem)] leading-[0.95]
                                        transition-all duration-700 ease-out
                                        ${showText ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}
                                    `}
                                    style={{
                                        transitionDelay: showText ? `${index * 140}ms` : "0ms",
                                    }}
                                >
                                    <Link href={link.target} onClick={(e) => handleAnchorClick(e, link.target)} className="inline-block">
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div
                        className={`text-brand-beige/80 text-sm font-sans transition-all duration-700 flex justify-between items-center ${showText ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
                        style={{ transitionDelay: showText ? "650ms" : "0ms" }}
                    >
                        <span>Sélection de la langue</span>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
}
