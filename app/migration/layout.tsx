import { ReactNode } from "react";
import MigrationProviders from "./providers";

export default function MigrationLayout({ children }: { children: ReactNode }) {
  return (
    <MigrationProviders>
      <div className="flex h-[calc(100dvh)] w-screen flex-col xl:fixed">{children}</div>
    </MigrationProviders>
  );
}