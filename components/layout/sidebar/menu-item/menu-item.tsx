import Link from "next/link";

import { cn } from "src/utils/cn";

import { TMenuItem } from "components/layout/sidebar/menu-item/menu-item.types";

export function MenuItem({ href, label, onClick, isActive }: TMenuItem.Props) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("rounded-xl px-4 py-2.5 text-base", {
        "bg-white/8 text-white": isActive,
        "text-neutral-400": !isActive,
      })}
    >
      {label}
    </Link>
  );
}