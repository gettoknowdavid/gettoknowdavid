import {Skeleton} from "@/components/ui/skeleton";
import {WorksListSkeleton} from "@/app/works/_components/works-list";

export default function WorksLoading() {
    return (
        <div className='flex flex-col gap-8 py-16'>
            <div className='flex items-center gap-4'>
                <Skeleton className="h-6 w-24"/>
                <span className="h-px w-full bg-accent"/>
            </div>
            <WorksListSkeleton/>
        </div>
    );
}
