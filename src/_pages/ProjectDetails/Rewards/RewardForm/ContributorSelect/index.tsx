import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Contributor } from "src/_pages/ProjectDetails/Rewards/RewardForm/types";
import ProjectApi from "src/api/Project";
import UsersApi from "src/api/Users";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";

import View from "./View";

enum ContributorsSortFields {
  ContributionCount = "CONTRIBUTION_COUNT",
  Earned = "EARNED",
  Login = "LOGIN",
  RewardCount = "REWARD_COUNT",
  ToRewardCount = "TO_REWARD_COUNT",
}

type Props = {
  projectId: string;
  contributor?: Contributor | null | undefined;
  sidePanelOpened?: boolean;
  setContributor: (contributor: Contributor | null | undefined) => void;
};

export default function ContributorSelect({ projectId, contributor, setContributor, sidePanelOpened }: Props) {
  const searchParams = useSearchParams();

  const githubLogin = searchParams.get("u");

  const [selectedGithubHandle, setSelectedGithubHandle] = useState<string | null>(githubLogin || null);

  const [search, setSearch] = useState<string>(githubLogin || "");

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const debounceSearch = useCallback(
    debounce(newSearch => {
      setDebouncedSearch(newSearch);
    }, 300),
    []
  );

  useEffect(() => {
    if (typeof search === "string") {
      debounceSearch(search);
    }
  }, [search, debounceSearch]);

  const { data: searchedUsers, isLoading: isUsersSearchLoading } = UsersApi.queries.useUsersSearchByLogin({
    params: { login: debouncedSearch, externalSearchOnly: "true" },
    options: { enabled: debouncedSearch.length >= 3 },
  });

  const { queryParams } = useQueryParamsSorting({
    field: ContributorsSortFields.Login,
    isAscending: true,
    storageKey: "ProjectContributionSorting",
  });

  const {
    data: ProjectContributors,
    isError,
    isLoading: isProjectContributorsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = ProjectApi.queries.useProjectContributorsInfiniteList({
    params: {
      projectId,
      queryParams: typeof queryParams === "object" ? { ...queryParams, login: debouncedSearch } : {},
    },
  });

  const contributors = ProjectContributors?.pages.flatMap(({ contributors }) => contributors) ?? [];

  const internalContributors: Contributor[] = contributors.map(c => {
    const completedUnpaidPullRequestCount = c.pullRequestToReward || 0;
    const completedUnpaidIssueCount = c.issueToReward || 0;
    const completedUnpaidCodeReviewCount = c.codeReviewToReward || 0;

    return {
      githubUserId: c.githubUserId,
      login: c.login || "",
      avatarUrl: c.avatarUrl || "",
      unpaidCompletedContributions:
        completedUnpaidPullRequestCount + completedUnpaidIssueCount + completedUnpaidCodeReviewCount,
      unpaidMergedPullsCount: completedUnpaidPullRequestCount,
      unpaidCompletedIssuesCount: completedUnpaidIssueCount,
      unpaidCompletedCodeReviewsCount: completedUnpaidCodeReviewCount,
      isRegistered: c.isRegistered,
    };
  });

  const filteredExternalContributors: Contributor[] = sortListByLogin(searchedUsers?.externalContributors)
    ?.slice(0, 5)
    .filter(
      contributor =>
        !internalContributors
          .map(filteredContributor => filteredContributor.login?.toLocaleLowerCase())
          .includes(contributor.login.toLocaleLowerCase())
    )
    .map(c => ({
      githubUserId: c.githubUserId,
      login: c.login,
      avatarUrl: c.avatarUrl,
      unpaidCompletedContributions: 0,
      isRegistered: c.isRegistered,
    }));

  useEffect(() => {
    if (!contributor || (contributor && contributor.login !== selectedGithubHandle)) {
      setContributor(
        internalContributors?.find(contributor => contributor.login === selectedGithubHandle) ||
          filteredExternalContributors?.find(contributor => contributor.login === selectedGithubHandle)
      );
    }
  }, [selectedGithubHandle, contributor, internalContributors, filteredExternalContributors, internalContributors]);

  return (
    <View
      {...{
        selectedGithubHandle,
        setSelectedGithubHandle,
        search,
        setSearch,
        internalContributors,
        filteredExternalContributors,
        isSearchGithubUsersByHandleSubstringQueryLoading: isUsersSearchLoading || isProjectContributorsLoading,
        contributor,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        sidePanelOpened,
      }}
    />
  );
}

function sortListByLogin<T extends { login: string }>(objectsWithLogin: T[] | null | undefined) {
  return objectsWithLogin
    ? [...objectsWithLogin].sort((objectWithLoginA, objectWithLoginB) =>
        objectWithLoginA.login.localeCompare(objectWithLoginB.login)
      )
    : [];
}
