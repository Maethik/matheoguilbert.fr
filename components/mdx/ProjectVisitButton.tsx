type VisitButtonProps = {
  href: string;
};

export function ProjectVisitButton({ href }: VisitButtonProps) {
  return (
    <div className="flex justify-center">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-[#2b160f] px-4 py-2 text-white text-sm"
      >
        Visiter le site
      </a>
    </div>
  );
}