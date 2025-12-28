'use client';

import {GithubLogoIcon} from "@phosphor-icons/react/dist/icons/GithubLogo";
import React from "react";
import {
    ContributionDay,
    GET_CONTRIBUTIONS,
    GitHubGraphQLContributionResponse
} from "@/app/_graphql/github-contribution";
import {useSuspenseQuery} from "@apollo/client/react";
import {formatDateVerbose} from "@/utils/date-formatter";

const GITHUB_USERNAME = "gettoknowdavid";

const WEEKS_IN_YEAR = 53;
const DAYS_IN_WEEK = 7;
const TOTAL_SQUARES = WEEKS_IN_YEAR * DAYS_IN_WEEK; // 371 squares

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

export const GithubContributionGraph: React.FC = () => {
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