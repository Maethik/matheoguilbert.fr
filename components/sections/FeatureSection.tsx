import { FeatureColumn } from '@/components/ui/FeatureColumn';

export default function FeatureSection() {
    return (
        <div className="w-full h-180 flex flex-row justify-center items-center">
            <FeatureColumn 
                imagePath={"/icons/brain.svg"} 
                title={"Plus qu'un simple exécutant"} 
                text={"Grâce à mon background en conception numérique et mobile, je ne me contente pas de coder. J'apporte un regard critique et constructif sur l'ensemble de votre projet."} 
            />
            <FeatureColumn 
                imagePath={"/icons/building.svg"} 
                title={"Des fondations en béton"} 
                text={"Ma spécialité : l'architecture. Je construis des solutions pérennes, évolutives et capables d'absorber la croissance de votre produit dans le temps."} 
            />
            <FeatureColumn 
                imagePath={"/icons/people.svg"} 
                title={"L'utilisateur au centre"} 
                text={"Le code parfait n'est rien si le produit ne répond pas à un besoin. Je place l'expérience utilisateur et la fonctionnalité au cœur de mes développements."} 
            />
        </div>
    );
}