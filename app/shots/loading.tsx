import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent} from "@/components/ui/card";

export default function ShotsLoading() {
    // Generate a mix of aspect ratios for more realistic skeleton
    const aspectRatios: Array<"portrait" | "landscape" | "square"> = [
        "portrait", "landscape", "portrait", "square", "portrait", "landscape",
        "square", "portrait", "landscape", "portrait", "portrait", "landscape",
        "portrait", "square", "landscape", "portrait", "landscape", "portrait",
    ];

    return (
        <div className='flex flex-col gap-8 pb-16'>
            <ul className="columns-2 md:columns-3 gap-1 space-1">
                {aspectRatios.map((ratio, index) => (
                    <li key={index} className="break-inside-avoid mb-4">
                        <ShotItemSkeleton aspectRatio={ratio}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}


// Individual shot item skeleton
const ShotItemSkeleton = ({aspectRatio = "portrait"}: { aspectRatio?: "portrait" | "landscape" | "square" }) => {
    const aspectRatioClass = {
        portrait: "aspect-[3/4]",
        landscape: "aspect-[4/3]",
        square: "aspect-square"
    }[aspectRatio];

    return (
        <Card className="rounded-none bg-transparent shadow-none border-0 p-0 m-0 relative overflow-hidden">
            <CardContent className="p-0 m-0 relative">
                <Skeleton className={`w-full ${aspectRatioClass}`}/>
            </CardContent>
        </Card>
    );
};
