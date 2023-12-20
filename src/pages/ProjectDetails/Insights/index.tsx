import { generatePath, useNavigate, useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";
import Title from "../Title";
import { RoutePaths, ProjectRoutePaths, ProjectRewardsRoutePaths } from "src/App";
import { withTooltip } from "src/components/Tooltip";
import Flex from "src/components/Utils/Flex";
import { EditProjectButton } from "../components/EditProjectButton";
import { useIntl } from "src/hooks/useIntl";
import Button, { ButtonOnBackground, ButtonSize, Width } from "src/components/Button";
import NewcomersContributors from "./NewcomersContributors";
import MostActiveContributors from "./MostActiveContributors";
import StrugglingContributors from "./StrugglingContributors";
import ChurnedContributors from "./ChurnedContributors";

export default function Insights() {
  const { T } = useIntl();
  const navigate = useNavigate();
  const { projectKey = "" } = useParams<{ projectKey?: string }>();

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const isRewardDisabled = !project?.hasRemainingBudget;
  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
        <Title>{T("project.details.insights.title")}</Title>
        {!hasOrgsWithUnauthorizedRepos ? (
          <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
            <EditProjectButton projectKey={projectKey} />
            <Button
              width={Width.Fit}
              className="flex-1 md:flex-initial"
              size={ButtonSize.Sm}
              disabled={isRewardDisabled}
              onBackground={ButtonOnBackground.Blue}
              onClick={() => {
                return navigate(
                  generatePath(
                    `${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`,
                    {
                      projectKey,
                    }
                  )
                );
              }}
              {...withTooltip(T("contributor.table.noBudgetLeft"), {
                visible: isRewardDisabled,
              })}
            >
              <span>{T("project.details.remainingBudget.newReward")}</span>
            </Button>
          </Flex>
        ) : null}
      </div>

      <div className="h-full overflow-y-auto">
        <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
          <div className="relative flex min-h-full flex-col gap-6">
            <NewcomersContributors projectId={project?.id} />
            <MostActiveContributors projectId={project?.id} />
            <StrugglingContributors projectId={project?.id} />
            <ChurnedContributors projectId={project?.id} />
          </div>
        </div>
      </div>
    </>
  );
}