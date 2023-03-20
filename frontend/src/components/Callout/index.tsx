import { PropsWithChildren } from "react";

export default function Callout({ children }: PropsWithChildren) {
  return (
    <div className="py-3 px-4 rounded-lg w-full bg-noise-heavy bg-white/8 font-walsheim font-medium text-sm text-white">
      {children}
    </div>
  );
}