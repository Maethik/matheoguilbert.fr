type props = {
    children: React.ReactNode;
};

export function ProjectsColumns({ children }: props) {
    return (
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            {children}
        </div>
    );
}
