import {fakeProjects} from "@/lib/fake-projects";

export default async function ProjectDetails({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const project = fakeProjects.find(p => p.slug === slug);

    if (!project) {
        return (
            <section className='grid app-margin w-full gap-4 items-center grid--app-columns'>
                <div className='flex flex-col content mt-24'>
                    <h1>No Project Found</h1>
                </div>
            </section>
        );
    }

    return (
        <section className='grid app-margin w-full gap-4 items-center grid--app-columns'>
            <div className='flex flex-col content mt-24'>
                <h1 className="text-6xl font-thin">{project.title}</h1>
            </div>
        </section>
    );
}
