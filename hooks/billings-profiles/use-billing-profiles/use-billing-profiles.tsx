import { useMemo } from "react";

import BillingProfilesApi from "src/api/BillingProfiles";
import { BillingProfileConstant } from "src/api/BillingProfiles/constant";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { TUseBillingProfiles } from "./use-billing-profiles.types";

export const useBillingProfiles = (): TUseBillingProfiles.Return => {
  const { data, isLoading } = BillingProfilesApi.queries.useBillingProfiles({});

  const profiles = useMemo(() => {
    if (!data?.billingProfiles?.length) {
      return [];
    }

    return data.billingProfiles.map(profile => ({
      data: profile,
      icon: BillingProfileConstant.profileTypeMapping[profile.type].icon,
    }));
  }, [data]);

  const hasIndividualProfile = useMemo(() => {
    return profiles.some(profile => profile.data.type === BillingProfilesTypes.type.Individual);
  }, [profiles]);

  return { data, isLoading, profiles, hasIndividualProfile };
};