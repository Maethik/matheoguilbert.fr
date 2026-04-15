import { FiFacebook, FiInstagram, FiLinkedin, FiGithub } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="w-[calc(100vw - 11px*2)] bg-brand-brown rounded-t-[10px] mx-2.75 flex flex-col items-center justify-center py-15 text-brand-beige gap-6">
            {/* Logo */}
            <img src="/icons/logo.svg" alt="logo mg dev mb-4" />

            <div className="flex flex-row justify-center items-start gap-16">
                <div className="flex flex-col items-start justify-start gap-4">
                    <h3 className="font-serif text-3xl">Mathéo Guilbert EI</h3>
                    <p className="font-sans text-base">Développeur Full Stack & Architecte Web</p>
                </div>

                <div className="flex flex-col items-start justify-start gap-4">
                    <h3 className="font-serif text-3xl">Légal</h3>
                    <p className="font-sans text-base">Mentions Légales</p>
                    <p className="font-sans text-base">Conditions Générales de Vente</p>
                </div>
                
                <div className="flex flex-col items-start justify-start gap-4">
                    <h3 className="font-serif text-3xl">Contact</h3>
                    <p className="font-sans text-base">+33 6 71 03 67 12</p>
                </div>
            </div>

            {/* Links */}
            <div className="w-4/5 border-t border-brand-beige/20 pt-4 flex flex-row justify-center items-center gap-6 text-2xl">
                <FiFacebook />
                <FiInstagram />
                <FiLinkedin />
                <FiGithub />
            </div>

            <p className="text-brand-beige/70 font-sans text-sm">© 2026 M. Guilbert. Tous droits réservés.</p>
        </footer>
    );
}