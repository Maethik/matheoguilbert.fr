import { GoArrowRight } from "react-icons/go";

type props = {
    projectVideoPath    : String;
    projectName         : String;
    projectType         : String;
    projectDate         : String;
    roles               : String[];
    projectDescription  : String;
    projectPageLink     : String;
    isTheLast?          : boolean;
};

export const ProjectCard = ({ 
    projectVideoPath,
    projectName, 
    projectType, 
    projectDate, 
    roles, 
    projectDescription, 
    projectPageLink, 
    isTheLast = false 
}: props) => {
    return (
        <div className="w-full">
            {/* Top separator */}
            <div className="w-full h-px bg-brand-brown/20" />

            {/* *** Content *** */}
            <div className="flex flex-row justify-between items-center gap-14 relative">
                <div className="absolute top-1 right-1 text-5xl font-serif text-brand-brown/40 font-semibold">{projectDate}</div>
                
                {/* Left image/video */}
                <div className="w-3/5 h-92.5 bg-gray-600"></div>
            
                {/* Texts */}
                <div className="flex flex-col items-start justify-center w-full gap-7.5">
                    <div className="flex flex-col items-start justify-center w-full">
                        <div className="p-1.5 bg-brand-brown rounded-px text-brand-beige font-sans">{projectType}</div>
                        <div className="text-5xl text-brand-brown font-serif uppercase">{projectName}</div>
                        <div className="text-2xl  font-serif font-light">
                            <p>(
                                {roles.map((role, index) => (
                                    role + (index < roles.length - 1 ? ", " : "")
                                ))}
                            )</p>
                        </div>
                    </div>

                    <div className="text-base font-normal font-sans">{projectDescription}</div>

                    <div className="border-b text-base flex flex-row justify-center items-center gap-0.5">
                        <p>READ</p>
                        <GoArrowRight />
                    </div>
                </div>
            </div>
            


            
            {/* Bottom separator */}
            {isTheLast && <div className="w-full h-px bg-brand-brown/20" />}
        </div>
    );
};