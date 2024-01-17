import { components } from "src/__generated/api";
import { API_PATH } from "../ApiPath";
import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { useAuth0 } from "@auth0/auth0-react";
import { MIXED_TAGS } from "./tags.ts";

export type UseGetRewards = components["schemas"]["RewardDetailsResponse"];
const useGetMixedReward = ({
  options = {},
  params,
}: UseQueryProps<UseGetRewards, { isMine: boolean; projectId?: string; rewardId: string }>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetRewards>({
    resourcePath: params?.isMine
      ? API_PATH.ME_REWARD_DETAIL(params.rewardId)
      : API_PATH.PROJECT_REWARD_DETAIL(params?.rewardId || "", params?.projectId || ""),
    method: "GET",
    tags: params?.isMine ? MIXED_TAGS.me_rewards(params?.rewardId) : MIXED_TAGS.project_rewards(params?.rewardId || ""),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export default {
  useGetMixedReward,
};