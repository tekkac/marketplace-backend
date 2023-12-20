import Card from "src/components/Card";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { ProjectOverviewLead } from "src/components/Project/Overview/OverviewLead";
import { ProjectOverviewContributor } from "src/components/Project/Overview/OverviewContributors";
import { ProjectOverviewSponsors } from "src/components/Project/Overview/OverviewSponsors";
import { ProjectOverviewMoreInfo } from "src/components/Project/Overview/OverviewMoreInfo";

interface Props {
  project: UseGetProjectBySlugResponse;
}

export default function OverviewPanel({ project }: Props) {
  return (
    <Card fullWidth={false} className="flex h-fit flex-col divide-y divide-greyscale-50/8 p-0" padded={false}>
      <ProjectOverviewLead project={project} />
      <ProjectOverviewContributor project={project} />
      <ProjectOverviewSponsors project={project} />
      <ProjectOverviewMoreInfo project={project} />
    </Card>
  );
}