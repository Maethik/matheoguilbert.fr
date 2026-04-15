export default function Header() {
  return (
    <header className="bg-brand-brown text-brand-beige w-full py-6 px-10 flex justify-between items-center">
        <div className="font-serif text-2xl font-bold">M. Guilbert</div>
        <nav>
            <ul className="flex gap-8 font-sans uppercase text-sm tracking-widest">
                <li>Accueil</li>
                <li>Projets</li>
                <li>À propos</li>
                <li>Blog</li>
            </ul>
        </nav>
        <div>🇫🇷</div>
    </header>
  );
}