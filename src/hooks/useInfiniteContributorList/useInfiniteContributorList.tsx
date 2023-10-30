import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { PageData, PagesData } from "src/types";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { getEndpointUrl } from "src/utils/getEndpointUrl";
import { useHttpOptions } from "src/hooks/useHttpOptions/useHttpOptions";
import { components } from "src/__generated/api";

type ContributorsPageData = PageData<{ contributors: components["schemas"]["ContributorPageItemResponse"][] }>;
type ContributorsPagesData = PagesData<ContributorsPageData>;

type QueryParam = {
  key: string;
  value: Array<string | number | boolean>;
};

interface UseInfiniteContributorsProps {
  projectId: string;
  queryParams?: QueryParam[];
}

export default function useInfiniteContributorList({
  projectId,
  queryParams,
}: UseInfiniteContributorsProps): UseInfiniteQueryResult<ContributorsPagesData, unknown> {
  const options = useHttpOptions("GET");

  return useInfiniteQuery({
    queryKey: ["contributors", projectId, queryParams],
    queryFn: ({ pageParam }) =>
      fetch(
        getEndpointUrl({
          resourcePath: ApiResourcePaths.GET_PROJECT_CONTRIBUTORS,
          pageParam,
          pageSize: 15,
          pathParam: projectId,
          queryParams,
        }),
        options
      ).then(res => res.json()),
    initialPageParam: 0,
    getNextPageParam: lastPage => (lastPage?.hasMore ? lastPage.nextPageIndex : undefined),
  });
}