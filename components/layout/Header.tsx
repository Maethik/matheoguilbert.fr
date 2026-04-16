'use client';

import React, { MouseEvent } from 'react';

export default function Header() {

	const links = [
		{"text": "Accueil"		, "target": "/"},
		{"text": "Travaux"		, "target": "/#works"},
		{"text": "À propos"		, "target": "/#about"},
		{"text": "Blog"			, "target": "/blog"},
	];

	const handleAnchorClick = (e: MouseEvent<HTMLLIElement>, target: string) => {
		if (target.startsWith("/#")) { // only anchor links
			e.preventDefault();
			const id = target.slice(2);
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	return (
		<div className="bg-brand-beige h-20 fixed left-2.75 right-2.75 z-50 rounded-b-[20px]">
			<header className="h-20 bg-brand-brown text-brand-beige py-6 px-10 flex justify-between items-center rounded-[10px]">
				<div className="hidden md:block font-serif text-2xl font-light">M. Guilbert</div>
				<img className="block md:hidden w-auto h-15" src="/icons/logo.svg" alt="logo mg dev" />
				<nav className="hidden sm:block">
					<ul className="flex gap-8 font-sans text-base font-light">
						{links.map((link, index) => (
							<li key={index} onClick={(e) => handleAnchorClick(e, link.target)}><a href={link.target}>{link.text}</a></li>
						))}
					</ul>
				</nav>
				<div className="hidden sm:block font-sans text-base font-light">France</div>
			</header>
		</div>

	);
}