import {gql} from "@apollo/client";

export interface GitHubGraphQLContributionResponse {
    user: {
        contributionsCollection: {
            contributionCalendar: {
                weeks: Array<{
                    contributionDays: Array<{
                        contributionCount: number;
                        contributionLevel: string;
                        date: string;
                    }>;
                }>;
                totalContributions: number;
            };
        };
        repositories: {
            nodes: Array<{
                pushedAt: string;
            }>;
        };
    };
}

export interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

export const GET_CONTRIBUTIONS = gql`
  query GetContributions($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
            }
          }
          totalContributions
        }
      }
      repositories(
        first: 1 
        orderBy: { field: PUSHED_AT, direction: DESC } # Order by newest push date
        ownerAffiliations: OWNER
      ) {
        nodes {
          pushedAt
        }
      }
    }
  }
`;