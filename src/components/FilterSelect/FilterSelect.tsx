import { Listbox, Transition } from "@headlessui/react";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { ReactElement, useCallback } from "react";
import { FilterField } from "src/components/FilterField/FilterField";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import CheckLine from "src/icons/CheckLine";
import { cn } from "src/utils/cn";

export type Item = {
  id: number | string;
  label: string;
  image?: string | null;
};

export function FilterSelect<T extends Item>({
  disabled = false,
  icon,
  items,
  label,
  multiple = false,
  onChange,
  selected,
  tokens,
}: {
  disabled?: boolean;
  icon?: (className: string) => ReactElement;
  items: T[];
  label: string;
  multiple?: boolean;
  onChange?: (value: T | T[]) => void;
  selected: T | T[];
  tokens: Record<"zero" | "other", string>;
}) {
  const { T } = useIntl();

  const renderToken = useCallback(() => {
    if (Array.isArray(selected)) {
      // Sometimes we have more items selected than items available in the list.
      // We need to filter to avoid showing "2 x selected" when there's only 1 item in the list for example.
      const filteredSelected = selected.filter(({ id }) => items.map(({ id }) => id).includes(id));

      return filteredSelected.length ? T(tokens.other, { count: filteredSelected.length }) : T(tokens.zero);
    }

    return selected?.label ?? T(tokens.zero);
  }, [selected, items, tokens, T]);

  return (
    <FilterField label={label}>
      <div className={cn("relative", { "opacity-50": disabled })}>
        <Listbox value={selected} onChange={onChange} multiple={multiple} disabled={disabled} by="id">
          {({ open }) => (
            <>
              <Listbox.Button
                className={cn(
                  "flex w-full items-center gap-6 rounded-lg border border-greyscale-50/8 bg-white/5 px-2.5 py-1.5 text-greyscale-50 shadow-lg",
                  {
                    "border-spacePurple-500 bg-spacePurple-900 text-spacePurple-200 outline-double outline-1 outline-spacePurple-500":
                      open,
                  }
                )}
              >
                <span className="flex flex-1 items-center gap-2">
                  {icon
                    ? icon(
                        cn("text-base leading-none", {
                          "text-spacePurple-500": open,
                        })
                      )
                    : null}
                  <span className="font-walsheim text-sm leading-none">{renderToken()}</span>
                </span>
                <ArrowDownSLine
                  className={cn("text-xl leading-none text-spaceBlue-200", {
                    "text-spacePurple-300": open,
                  })}
                />
              </Listbox.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                className="absolute -left-1.5 -right-1.5 z-10 origin-top translate-y-1.5 overflow-hidden rounded-2xl border border-greyscale-50/12 bg-whiteFakeOpacity-8 shadow-lg"
              >
                <Listbox.Options className="max-h-60 divide-y divide-greyscale-50/8 overflow-auto bg-white/5 py-2 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
                  {items.map(item => (
                    <Listbox.Option key={item.id} value={item}>
                      {({ selected, active }) => (
                        <div
                          className={cn("flex cursor-pointer items-center gap-3 px-4 py-2", { "bg-white/2": active })}
                        >
                          {typeof item.image !== "undefined" ? (
                            <RoundedImage
                              src={item?.image ?? onlyDustLogo}
                              alt={item.label}
                              rounding={Rounding.Corners}
                              size={ImageSize.Sm}
                            />
                          ) : null}
                          <span className="flex-1 truncate font-walsheim text-sm text-greyscale-50">{item.label}</span>
                          {selected ? <CheckLine className="text-xl leading-none text-greyscale-50" /> : null}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>
      </div>
    </FilterField>
  );
}