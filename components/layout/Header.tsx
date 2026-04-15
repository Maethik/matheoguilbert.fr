export default function Header() {
  return (
    <header className="bg-brand-brown text-brand-beige py-6 px-10 flex justify-between items-center rounded-[10px] fixed left-2.75 right-2.75 z-50">
        <div className="font-serif text-2xl font-light">M. Guilbert</div>
        <nav>
            <ul className="flex gap-8 font-sans text-base font-light">
                <li>Accueil</li>
                <li>Projets</li>
                <li>À propos</li>
                <li>Blog</li>
            </ul>
        </nav>
        <div className="font-sans text-base font-light">France</div>
    </header>
  );
}