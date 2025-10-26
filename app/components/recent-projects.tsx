'use client';

import {GithubLogoIcon} from "@phosphor-icons/react/dist/icons/GithubLogo";
import {MapPinIcon} from "@phosphor-icons/react/dist/icons/MapPin";
import React from "react";
import Image from "next/image";
import tongueOut from "../../public/tongue-out.jpeg";
import {ContributionDay, GET_CONTRIBUTIONS, GitHubGraphQLContributionResponse} from "@/app/graphql/github-contribution";
import {useSuspenseQuery} from "@apollo/client/react";
import {formatDateVerbose} from "@/utils/date-formatter";
import {StackIcon} from "@phosphor-icons/react/dist/icons/Stack";
import {ToolboxIcon} from "@phosphor-icons/react/dist/icons/Toolbox";

import flutterIcon from '../../public/flutter.svg';
import dartIcon from '../../public/dart.svg';
import reactIcon from '../../public/react.svg';
import kotlinIcon from '../../public/kotlin.svg';
import firebaseIcon from '../../public/firebase.svg';

const GITHUB_USERNAME = "gettoknowdavid";

const WEEKS_IN_YEAR = 53;
const DAYS_IN_WEEK = 7;
const TOTAL_SQUARES = WEEKS_IN_YEAR * DAYS_IN_WEEK; // 371 squares

const ContributionsSkeleton = () => {
    return (
        // Add the animate-pulse class to the container to apply the shimmer effect
        <div className="animate-pulse">
            {/* Skeleton for the total contributions text */}
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>

            {/* Skeleton for the contribution grid itself */}
            <div
                className="grid grid-flow-col grid-rows-7 gap-1 p-2 border rounded-md dark:border-gray-700 overflow-x-auto bg-white dark:bg-gray-900/50"
                // Set explicit dimensions for a good placeholder fit
                style={{height: `${(DAYS_IN_WEEK * 12) + 20}px`}} // 7 rows * 12px height/gap + padding
            >
                {/* Map a static array to create the placeholder squares */}
                {Array.from({length: TOTAL_SQUARES}).map((_, i) => (
                    <div
                        key={i}
                        // Mimic the size of the actual squares: w-3 h-3 m-0.5
                        className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-800"
                    />
                ))}
            </div>
        </div>
    );
};

export default ContributionsSkeleton;

// Utility function to map the contribution level
const mapContributionLevel = (level: string): number => {
    switch (level) {
        case "NONE":
            return 0;
        case "FIRST_QUARTILE":
            return 1;
        case "SECOND_QUARTILE":
            return 2;
        case "THIRD_QUARTILE":
            return 3;
        case "FOURTH_QUARTILE":
            return 4;
        default:
            return 0;
    }
};

export function ContributionGraph() {
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const fromDate = oneYearAgo.toISOString().split("T")[0]; // YYYY-MM-DD
    const toDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

    const {error, data} = useSuspenseQuery<GitHubGraphQLContributionResponse>(
        GET_CONTRIBUTIONS,
        {
            variables: {
                username: GITHUB_USERNAME,
                from: `${fromDate}T00:00:00Z`,
                to: `${toDate}T23:59:59Z`,
            },
            fetchPolicy: "cache-first",
            context: {useGithub: true}
        }
    );


    const [contributions, setContributions] = React.useState<ContributionDay[]>([]);
    const [totalContributions, setTotalContributions] = React.useState<number>(0);

    React.useEffect(() => {
        if (data?.user?.contributionsCollection) {
            const contributionCalendar = data.user.contributionsCollection.contributionCalendar;

            const contributionDays = contributionCalendar.weeks.flatMap(
                week => week.contributionDays,
            );

            const mappedContributions: ContributionDay[] = contributionDays.map(day => ({
                date: day.date,
                count: day.contributionCount,
                level: mapContributionLevel(day.contributionLevel),
            }));

            setContributions(mappedContributions);
            setTotalContributions(contributionCalendar.totalContributions);
        }
    }, [data]);

    const lastPushedAt = data?.user?.repositories?.nodes?.[0]?.pushedAt;

    if (error) return <p>Error loading contributions: {error.message}</p>;

    return (
        <React.Suspense fallback={<ContributionsSkeleton/>}>
            <div className='dashboard-card-content'>
                <div className='relative flex flex-col justify-between h-full px-4 pb-5 pt-4 gap-3'>
                    <div className='flex items-baseline justify-between gap-4 max-sm:flex-col'>
                        <div className='card-tag '>
                            <GithubLogoIcon size={12}/>
                            <h3>Github Activity</h3>
                        </div>
                        <div>
                            <p className="line-clamp-1 text-sm">
                                {totalContributions.toLocaleString()} contributions in the last year
                            </p>
                        </div>
                    </div>

                    <div
                        className="relative grid grid-flow-col h-fit grid-rows-7 gap-0.5 p-2 overflow-x-auto bg-gray-900/50 scrollbar">
                        {contributions.map(day => (
                            <div
                                key={day.date}
                                className={`w-5 h-5 rounded-sm ${getLevelColor(day.level)}`}
                                title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`} // Tooltip
                            />
                        ))}
                    </div>

                    <div>
                        <p className="text-sm text-slate-200 max-sm:text-xs sm:max-lg:mt-4">
                            {lastPushedAt
                                ? `Last pushed on ${formatDateVerbose(lastPushedAt)}`
                                : 'No recent pushes found'}
                        </p>
                    </div>
                </div>
            </div>
        </React.Suspense>
    );
}

const getLevelColor = (level: number): string => {
    // Tailwind classes for different contribution levels
    // Adjust colors to match your site's theme
    switch (level) {
        case 0:
            return "bg-gray-100 dark:bg-gray-800"; // No contributions
        case 1:
            return "bg-green-200 dark:bg-green-900"; // Low
        case 2:
            return "bg-green-400 dark:bg-green-700"; // Medium
        case 3:
            return "bg-green-600 dark:bg-green-500"; // High
        case 4:
            return "bg-green-800 dark:bg-green-300"; // Very high
        default:
            return "bg-gray-100 dark:bg-gray-800";
    }
};


export const RecentProjects = () => {
    return (
        <section className='h-screen w-full section items-center'>
            <div className='grid content'>
                <div
                    className='grid-cols-[repeat(36,_minmax(0,_1fr))] gap-4 flex-col auto-rows-[minmax(0,1fr)] max-lg:grid-cols-6 max-md:flex max-md:gap-4 md:grid'>
                    <div className='dashboard-card col-start-1 col-end-3 aspect-square row-start-1 row-end-8'>
                        <div className='dashboard-card-content'>
                            <div className='relative flex flex-col items-baseline h-full px-3 pb-5 pt-3 gap-3'>
                                <div className='card-tag'>
                                    <MapPinIcon size={12}/>
                                    <h3>Location</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-card col-start-3 col-end-5 aspect-square row-start-1 row-end-8'>
                        <div className='dashboard-card-content'>
                            <Image
                                src={tongueOut}
                                fill={true}
                                alt="Picture of the author"
                                className='rounded-3xl border'
                            />
                        </div>
                    </div>

                    <div className='dashboard-card col-start-1 col-end-5 row-start-8 row-end-15'>
                        <ContributionGraph/>
                    </div>
                    <div className='dashboard-card col-start-5 col-end-8 row-start-1 row-end-6'>
                        <div className='dashboard-card-content'>
                            <div className='card-tag'>
                                <GithubLogoIcon size={12}/>
                                <h3>Current Deep Dive</h3>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-card col-start-5 col-end-8 row-start-6 row-end-12'>
                        <div className='dashboard-card-content'>
                            <div className='relative flex flex-col items-baseline h-full px-3 pb-5 pt-3 gap-3'>
                                <div className='card-tag'>
                                    <StackIcon size={12}/>
                                    <h3>Tech Stack</h3>
                                </div>
                            </div>
                            <div className='flex grow'>
                                <div
                                    className='relative flex w-full flex-col items-center justify-center overflow-hidden md:shadow-xl'>
                                    <div
                                        className="group flex overflow-hidden p-2 gap-8 flex-row">
                                        <div className="tech-stack-component">
                                            <Image src={flutterIcon} alt='Flutter Icon' unoptimized/>
                                        </div>
                                        <div className="tech-stack-component">
                                            <Image src={dartIcon} alt='Dart Icon' unoptimized/>
                                        </div>
                                        <div className="tech-stack-component">
                                            <Image src={reactIcon} alt='React Icon' unoptimized/>
                                        </div>
                                        <div className="tech-stack-component">
                                            <Image src={kotlinIcon} alt='Kotlin Icon' unoptimized/>
                                        </div>
                                        <div className="tech-stack-component">
                                            <Image src={firebaseIcon} alt='Firebase Icon' unoptimized/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 p-4">
                                <p className="text-lg">Languages & Tools I'm familiar with</p>
                                <p className="text-sm text-gray-300">
                                    Primarily focused on mobile development with Flutter and Kotlin, but always
                                    eager to explore and learn new technologies.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-card col-start-5 col-end-8 row-start-12 row-end-15'>
                        <div className='dashboard-card-content'>
                            <div className='relative flex flex-col items-baseline h-full px-3 pb-5 pt-3 gap-3'>
                                <div className='card-tag'>
                                    <ToolboxIcon size={12}/>
                                    <h3>Tools</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
        ;
}