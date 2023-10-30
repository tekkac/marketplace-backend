import { useIntl } from "src/hooks/useIntl";

type LeftToSpendProps = {
  budget: { initialAmount: number; remaining: number };
};

export function LeftToSpend({ budget }: LeftToSpendProps) {
  const { T } = useIntl();

  return (
    <div className="flex shrink-0 text-sm text-white">
      {Math.round(budget.initialAmount ? (budget.remaining / budget.initialAmount) * 100 : 0)}%{" "}
      {T("project.details.remainingBudget.leftToSpend")}
    </div>
  );
}