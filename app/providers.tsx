"use client";

import { NextUIProvider } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

import { IntlProvider } from "src/hooks/useIntl";

import { QueryProvider } from "components/features/api/providers/query-provider";
import { Auth0ProviderWithNavigate } from "components/features/auth0/providers/auth0-provider-with-navigate";
import { ImpersonationProvider } from "components/features/impersonation/impersonation.provider";
import { PosthogProvider } from "components/features/posthog/providers/posthog.provider";

const StackProvider = dynamic(() => import("src/libs/react-stack").then(mod => mod.StackProvider), { ssr: false });
const SidePanelStackProvider = dynamic(
  () => import("src/hooks/useSidePanelStack").then(mod => mod.SidePanelStackProvider),
  { ssr: false }
);
const SidePanelProvider = dynamic(() => import("src/hooks/useSidePanel").then(mod => mod.SidePanelProvider), {
  ssr: false,
});

export default function Providers({ children }: PropsWithChildren) {
  return (
    <PosthogProvider>
      <ImpersonationProvider>
        <Auth0ProviderWithNavigate>
          <IntlProvider>
            <QueryProvider>
              <NextUIProvider>
                <StackProvider>
                  <SidePanelStackProvider>
                    <SidePanelProvider>{children}</SidePanelProvider>
                  </SidePanelStackProvider>
                </StackProvider>
              </NextUIProvider>
            </QueryProvider>
          </IntlProvider>
        </Auth0ProviderWithNavigate>
      </ImpersonationProvider>
    </PosthogProvider>
  );
}