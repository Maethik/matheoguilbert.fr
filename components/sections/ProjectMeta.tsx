type Props = {
    year: number;
    category: string;
    roles: string[];
    client: string;
};

function Item({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <p className="text-sm text-neutral-500">{label}</p>
            <div className="text-base text-neutral-900">{children}</div>
        </div>
    );
}

export function ProjectMeta({ year, category, roles, client }: Props) {
    return (
        <section className="grid gap-8 py-10 md:grid-cols-4">
            <Item label="Année">{year}</Item>
            <Item label="Catégorie">{category}</Item>
            <Item label="Rôles">
                <div className="flex flex-col gap-1">
                    {roles.map((role) => (
                        <span key={role}>{role}</span>
                    ))}
                </div>
            </Item>
            <Item label="Client">{client}</Item>
        </section>
    );
}