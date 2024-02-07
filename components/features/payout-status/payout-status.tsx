import { TPayoutStatus } from "components/features/payout-status/payout-status.types";
import { StatusTag } from "components/features/payout-status/status-tag/status-tag";

export function PayoutStatus({ status, dates }: TPayoutStatus.Props) {
  return <StatusTag status={status} date={dates?.[status === "LOCKED" ? "unlockDate" : "processedAt"]} />;
}