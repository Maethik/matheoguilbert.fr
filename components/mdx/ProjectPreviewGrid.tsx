type PreviewItem = {
	title: string;
	image: string;
};

type props = {
	items?: PreviewItem[];
};

export function ProjectPreviewGrid({ items = [] }: props) {
	return (
		<div className="grid gap-6 2xl:grid-cols-2 2xl:space-x-6">
			{items.map((item) => (
				<div
					key={item.title}
					className="rounded-[10px] overflow-hidden bg-[#2b160f] text-white min-h-65 flex items-center justify-center"
				>
					{item.image ? (
						<img
							src={item.image}
							alt={item.title}
							className="h-full w-full object-cover"
						/>
					) : (
						<span className="text-2xl">{item.title}</span>
					)}
				</div>
			))}
		</div>
	);
}
