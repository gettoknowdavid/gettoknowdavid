import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

export default function WorkDetailsLoading() {
    return (
        <div className='flex flex-col gap-8 py-16'>
            {/* Back Button Skeleton */}
            <Skeleton className="h-10 w-24"/>

            {/* Hero Card Skeleton */}
            <Card className="relative overflow-hidden bg-card/80 min-h-[320px] flex flex-col justify-end">
                <Skeleton className="absolute inset-0"/>
                <CardHeader className="relative z-10">
                    <Skeleton className="h-12 md:h-16 w-3/4 mb-3"/>
                    <Skeleton className="h-6 w-1/2 mb-2"/>
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-5/6"/>
                </CardHeader>
            </Card>

            {/* Content Grid */}
            <div className='grid md:grid-cols-12 gap-4 items-start'>
                {/* Main Content Skeleton */}
                <div className="grid col-span-7 md:col-span-8">
                    <Card className="w-full bg-card/80 gap-2">
                        <CardHeader>
                            <Skeleton className="h-6 w-1/3"/>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-5/6"/>
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-4/5"/>
                        </CardContent>

                        <span className="h-5"/>

                        <CardHeader>
                            <Skeleton className="h-6 w-1/3"/>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-5/6"/>
                            <Skeleton className="h-4 w-full"/>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Skeleton */}
                <div className="grid col-span-5 md:col-span-4 gap-5">
                    {/* Project Details Card */}
                    <Card className="w-full bg-card/80 gap-2">
                        <CardHeader className="py-0 my-0 mb-0">
                            <Skeleton className="h-6 w-1/2"/>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Skeleton className="h-4 w-16 mb-1"/>
                                <Skeleton className="h-5 w-3/4"/>
                            </div>
                            <div>
                                <Skeleton className="h-4 w-16 mb-1"/>
                                <Skeleton className="h-5 w-full"/>
                            </div>
                            <div>
                                <Skeleton className="h-4 w-16 mb-1"/>
                                <Skeleton className="h-5 w-2/3"/>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Technologies Card */}
                    <Card className="w-full bg-card/80 gap-2">
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4"/>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-row flex-wrap gap-2">
                                <Skeleton className="h-5 w-16"/>
                                <Skeleton className="h-5 w-20"/>
                                <Skeleton className="h-5 w-24"/>
                                <Skeleton className="h-5 w-16"/>
                                <Skeleton className="h-5 w-20"/>
                                <Skeleton className="h-5 w-18"/>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Links Card */}
                    <Card className="w-full bg-card/80 gap-2">
                        <CardHeader>
                            <Skeleton className="h-6 w-1/3"/>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-row flex-wrap gap-2">
                                <Skeleton className="h-9 w-24"/>
                                <Skeleton className="h-9 w-28"/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Gallery Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {Array.from({length: 6}).map((_, index) => (
                    <Skeleton key={index} className="aspect-video w-full"/>
                ))}
            </div>
        </div>
    );
}