import type { ApolloError } from "@apollo/client";
import classNames from "classnames";
import { ComponentProps, PropsWithChildren, ReactNode, useMemo, useState } from "react";

import atomLogo from "assets/img/atom.png";
import { ContributionsOrderBy, GetAllContributionsQuery, OrderBy } from "src/__generated/graphql";
import IssueOpen from "src/assets/icons/IssueOpen";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionCard } from "src/components/Contribution/ContributionCard";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import Table from "src/components/Table";
import Cell, { CellHeight } from "src/components/Table/Cell";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import Line from "src/components/Table/Line";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import Folder3Line from "src/icons/Folder3Line";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
import SortingArrow from "src/pages/ProjectDetails/Contributors/ContributorsTable/SortingArrow";
import {
  DeepPartial,
  GithubContributionStatus,
  GithubContributionType,
  GithubItemStatus,
  GithubPullRequestDraft,
  GithubPullRequestStatus,
} from "src/types";
import { sortContributionsByLinked } from "src/utils/sortContributionsByLinked";
import { sortContributionsByNumber } from "src/utils/sortContributionsByNumber";
import { useMediaQuery } from "usehooks-ts";

export enum TableColumns {
  Date = "date",
  Project = "project",
  Id = "id",
  Linked = "linked",
}

export type TableSort = {
  column: TableColumns;
  direction: OrderBy.Asc | OrderBy.Desc;
  orderBy?: { [K in keyof Partial<ContributionsOrderBy>]: DeepPartial<ContributionsOrderBy[K]> };
};

function Message({ children }: PropsWithChildren) {
  return <p className="whitespace-pre-line text-center font-walsheim text-sm text-greyscale-50">{children}</p>;
}

function TableText({ children }: PropsWithChildren) {
  return (
    <tr>
      <td colSpan={4}>
        <div className="pt-6">
          <Message>{children}</Message>
        </div>
      </td>
    </tr>
  );
}

function Loader() {
  const { T } = useIntl();

  return (
    <div className="flex justify-center py-24">
      <img src={atomLogo} alt={T("state.loading")} className="animate-spin-medium" />
    </div>
  );
}

export function ContributionTable({
  data,
  description,
  error,
  icon,
  id,
  loading,
  onHeaderClick,
  fullTable = true,
  status,
  title,
  sort,
  onSort,
}: {
  data?: GetAllContributionsQuery;
  description: string;
  error?: ApolloError;
  icon(className: string): ReactNode;
  id: string;
  loading: boolean;
  onHeaderClick: () => void;
  fullTable?: boolean;
  status: GithubContributionStatus;
  title: string;
  sort: TableSort;
  onSort: (sort: TableSort) => void;
}) {
  const { T } = useIntl();
  const [showAll, setShowAll] = useState(false);

  // Used for performance optimization, avoid rendering large invisible DOM
  const isLg = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);

  const sortDirection = sort.direction === OrderBy.Asc ? "up" : "down";
  const newSortDirection = sort.direction === OrderBy.Asc ? OrderBy.Desc : OrderBy.Asc;

  const { contributions } = data ?? {};

  const memoizedContributions = useMemo(() => {
    if (sort.column === TableColumns.Id) {
      return contributions?.sort((a, b) => sortContributionsByNumber([a, b], sort.direction));
    }

    if (sort.column === TableColumns.Linked) {
      return contributions?.sort((a, b) => sortContributionsByLinked([a, b], sort.direction));
    }

    return contributions;
  }, [contributions, sort]);

  function renderMobileContent() {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div className="py-6">
          <Message>{T("contributions.table.error")}</Message>
        </div>
      );
    }

    if (memoizedContributions?.length === 0) {
      return (
        <div className="py-6">
          <Message>
            {T("contributions.table.empty", {
              time: Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
              }).format(new Date(data?.githubRepos[0].indexedAt)),
            })}
          </Message>
        </div>
      );
    }

    const nbContributions = memoizedContributions?.length ?? 0;
    const maxContributions = 2;
    const showAllContributions = nbContributions > maxContributions;
    const contributions = showAll ? memoizedContributions : memoizedContributions?.slice(0, maxContributions);

    return (
      <div className="flex flex-col gap-2">
        {contributions?.map(contribution => {
          return (
            <div
              key={contribution.id}
              className={classNames("rounded-xl", {
                "bg-whiteFakeOpacity-5/95 lg:bg-none": !fullTable,
              })}
            >
              <ContributionCard contribution={contribution} status={status} />
            </div>
          );
        })}

        {showAllContributions && !showAll ? (
          <div className="px-3 py-3.5">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-greyscale-50 bg-white/5 px-4 py-3.5 font-walsheim font-medium leading-none text-greyscale-50 shadow-lg"
              onClick={() => setShowAll(true)}
            >
              <ArrowDownSLine className="flex h-4 items-center justify-center text-xl" />
              {T("contributions.table.showAll", { count: nbContributions })}
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  function renderDesktopContent() {
    if (loading) {
      return (
        <tr>
          <td colSpan={4} className="pt-6">
            <Loader />
          </td>
        </tr>
      );
    }

    if (error) {
      return <TableText>{T("contributions.table.error")}</TableText>;
    }

    if (memoizedContributions?.length === 0) {
      return (
        <TableText>
          {T("contributions.table.empty", {
            time: Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(data?.githubRepos[0].indexedAt)),
          })}
        </TableText>
      );
    }

    return memoizedContributions?.map(contribution => {
      const lineDate = status === GithubContributionStatus.InProgress ? contribution.createdAt : contribution.closedAt;

      const { status: contributionStatus } = contribution.githubPullRequest ??
        contribution.githubIssue ??
        contribution.githubCodeReview ?? { status: GithubPullRequestStatus.Open };
      const { draft } = contribution?.githubPullRequest ?? {};

      return (
        <Line key={contribution.id}>
          <Cell height={CellHeight.Compact}>
            <ContributionDate
              id={contribution.id ?? ""}
              type={contribution.type as GithubContributionType}
              status={draft ? GithubPullRequestDraft.Draft : (contributionStatus as GithubItemStatus)}
              date={new Date(lineDate)}
            />
          </Cell>
          <Cell height={CellHeight.Compact}>
            <ContributionProjectRepo
              project={contribution.project as ComponentProps<typeof ContributionProjectRepo>["project"]}
              repo={contribution.githubRepo as ComponentProps<typeof ContributionProjectRepo>["repo"]}
            />
          </Cell>
          <Cell height={CellHeight.Compact}>
            <Contribution contribution={contribution} />
          </Cell>
          <Cell className="justify-end gap-1" height={CellHeight.Compact}>
            {ContributionLinked({ contribution }) ? <ContributionLinked contribution={contribution} /> : "-"}
          </Cell>
        </Line>
      );
    });
  }

  return (
    <section
      className={classNames("overflow-hidden rounded-2xl border-greyscale-50/8", {
        "border bg-whiteFakeOpacity-5/95 shadow-2xl": fullTable,
        "lg:border lg:bg-whiteFakeOpacity-5/95 lg:shadow-2xl": !fullTable,
      })}
    >
      {fullTable ? (
        <header
          className="flex cursor-pointer items-start gap-3 border-b border-greyscale-50/8 bg-white/2 px-6 py-4"
          onClick={onHeaderClick}
        >
          <div className="rounded-lg bg-white/5 p-3 text-greyscale-50">{icon("h-5 w-5")}</div>
          <div className="font-walsheim">
            <p className="text-base font-medium text-greyscale-50">{title}</p>
            <p className="text-sm text-spaceBlue-200">{description}</p>
          </div>
        </header>
      ) : null}
      <div className="p-3 lg:hidden">{!isLg ? renderMobileContent() : null}</div>

      <div className="hidden px-4 py-6 lg:block">
        <Table
          id={id}
          headers={
            <HeaderLine>
              <HeaderCell
                horizontalMargin
                onClick={() => {
                  const field = status === GithubContributionStatus.InProgress ? "createdAt" : "closedAt";

                  onSort({
                    column: TableColumns.Date,
                    direction: newSortDirection,
                    orderBy: { [field]: newSortDirection },
                  });
                }}
              >
                <TimeLine />
                <span>{T("contributions.table.date")}</span>
                <SortingArrow direction={sortDirection} visible={sort.column === TableColumns.Date} />
              </HeaderCell>
              <HeaderCell
                width={HeaderCellWidth.Quarter}
                horizontalMargin
                onClick={() => {
                  onSort({
                    column: TableColumns.Project,
                    direction: newSortDirection,
                    orderBy: { project: { name: newSortDirection }, githubRepo: { name: newSortDirection } },
                  });
                }}
              >
                <Folder3Line />
                <span>{T("contributions.table.projectRepo")}</span>
                <SortingArrow direction={sortDirection} visible={sort.column === TableColumns.Project} />
              </HeaderCell>
              <HeaderCell
                width={HeaderCellWidth.Half}
                horizontalMargin
                onClick={() => {
                  onSort({
                    column: TableColumns.Id,
                    direction: newSortDirection,
                  });
                }}
              >
                <StackLine />
                <span>{T("contributions.table.contribution")}</span>
                <SortingArrow direction={sortDirection} visible={sort.column === TableColumns.Id} />
              </HeaderCell>
              <HeaderCell
                horizontalMargin
                className="justify-end"
                onClick={() => {
                  onSort({
                    column: TableColumns.Linked,
                    direction: newSortDirection,
                  });
                }}
              >
                <span>
                  <IssueOpen className="h-3 w-3" />
                </span>
                <span>{T("contributions.table.linkedTo")}</span>
                <SortingArrow direction={sortDirection} visible={sort.column === TableColumns.Linked} />
              </HeaderCell>
            </HeaderLine>
          }
        >
          {isLg ? renderDesktopContent() : null}
        </Table>
      </div>
    </section>
  );
}