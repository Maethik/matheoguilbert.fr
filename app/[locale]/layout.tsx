import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from 'next-intl/server';

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

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
    const messages = await getMessages();

	return (
		<html lang={locale} className={`${playfairDisplay.variable} ${inter.variable} bg-brand-beige overflow-hidden antialiased`}>
			
			<body className="h-screen w-screen bg-brand-beige text-brand-brown flex flex-col overflow-hidden">
				<NextIntlClientProvider messages={messages}>
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
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
