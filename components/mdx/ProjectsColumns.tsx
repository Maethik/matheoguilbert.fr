type props = {
	children: React.ReactNode;
};

export function ProjectsColumns({ children }: props) {
	return (
		<div className="grid gap-6 text-justify text-base font-sans lg:grid-cols-2 lg:space-x-6">
			{children}
		</div>
	);
}