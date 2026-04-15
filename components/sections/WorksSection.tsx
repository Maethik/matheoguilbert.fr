import { ProjectCard } from "../ui/ProjectCard";

export default function WorksSection() {
    return (
        <div className="w-full flex flex-col items-start justify-start">
            <h2 className="text-9xl font-serif text-brand-brown">Travaux</h2>

            <ProjectCard 
                projectVideoPath={""} 
                projectName={"EVEREAST SOLUTIONS"} 
                projectType={"Application web"} 
                projectDate={"2026 - auj."} 
                roles={["Co-fondateur", "développeur full-stack"]} 
                projectDescription={"Plateforme de mise en relations clients - agences web et gestion de projet agile"} 
                projectPageLink={"/"} 
            />
            <ProjectCard 
                projectVideoPath={""} 
                projectName={"THREADBASE"} 
                projectType={"Application macOS"} 
                projectDate={"2026 - auj."} 
                roles={["Développeur full-stack"]} 
                projectDescription={"Application macOS qui sauvegarde les fenêtres, les notes mentales et le contexte Git d’un projet pour en faciliter la réouverture."} 
                projectPageLink={""} 
            />
            <ProjectCard 
                projectVideoPath={""} 
                projectName={"GGCG"} 
                projectType={"Application web"} 
                projectDate={"2026 - auj."} 
                roles={["Développeur full-stack"]} 
                projectDescription={"Une vue unifiée et élégante de toute votre activité de développement, centralisant les contributions de toutes vos forges Git dans une seule heatmap interactive."} 
                projectPageLink={""} 
            />
            <ProjectCard 
                projectVideoPath={""} 
                projectName={"MG DEV"} 
                projectType={"Site web"} 
                projectDate={"2026"} 
                roles={["Développeur full-stack"]} 
                projectDescription={"Un site web pour présenter mon profil, mes compétences et mes projets de développement."} 
                projectPageLink={""} 
                isTheLast={true}
            />
        </div>
    );
}