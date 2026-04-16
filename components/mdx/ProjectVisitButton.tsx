import { GoLinkExternal } from "react-icons/go";

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
				className="rounded-[10px] border border-brand-brown px-6 py-4 text-brand-brown text-base flex flex-row justify-center items-center gap-2"
			>
				Visiter le site
				<GoLinkExternal className="text-xl" />
			</a>
		</div>
	);
}