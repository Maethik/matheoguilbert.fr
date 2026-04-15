import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomScrollArea from "@/components/layout/CustomScrollArea";

const playfairDisplay = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Mathéo Guilbert - Développeur Full Stack",
	description: "Portfolio de Mathéo Guilbert, développeur web freelance.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className={`${playfairDisplay.variable} ${inter.variable} bg-brand-beige overflow-hidden antialiased`}>
			
			<body className="h-screen w-screen bg-brand-beige text-brand-brown flex flex-col overflow-hidden">
				<div className="sticky top-0 z-50 bg-brand-beige w-full px-2.75 pt-2.75">
					<Header />
				</div>
				{/* Scrolling bloc */}
				<CustomScrollArea>
					
					
					<main className="px-2.75 pb-2.75">
						{children}
					</main>
					
					<Footer />
				</CustomScrollArea>
			</body>
		</html>
	);
}