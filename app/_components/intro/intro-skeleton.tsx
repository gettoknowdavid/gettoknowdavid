import {Skeleton} from "@/components/ui/skeleton";

export const IntroSkeleton = () => {
    return (
        <div className="flex flex-col h-screen justify-center">
            {/* Navigation/Persona buttons skeleton */}
            <div className="flex-shrink-0 relative">
                <ul className="flex flex-row flex-nowrap overflow-x-scroll mb-8 p-0 gap-5"
                    style={{scrollbarWidth: "none"}}>
                    {Array.from({length: 5}).map((_, index) => (
                        <li key={index} className="font-medium tracking-wide flex text-nowrap">
                            <Skeleton className="h-6 w-32"/>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content skeleton */}
            <div className="flex-shrink-1 max-h-[70vh] md:max-h-[60vh] h-full space-y-6">
                {/* Large text blocks mimicking the intro text */}
                <Skeleton className="h-10 md:h-14 lg:h-16 w-full"/>
                <Skeleton className="h-10 md:h-14 lg:h-16 w-full"/>
                <Skeleton className="h-10 md:h-14 lg:h-16 w-5/6"/>
                <Skeleton className="h-10 md:h-14 lg:h-16 w-full"/>
                <Skeleton className="h-10 md:h-14 lg:h-16 w-4/5"/>
            </div>
        </div>
    );
};
