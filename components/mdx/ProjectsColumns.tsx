type props = {
  children: React.ReactNode;
};

export function ProjectsColumns({ children }: props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {children}
    </div>
  );
}