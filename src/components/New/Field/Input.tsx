import { ChangeEventHandler, FC, FocusEventHandler, ReactNode } from "react";
import { Field, FieldProps } from "./Field";
import { cn } from "src/utils/cn";

export interface FieldInputProps extends Omit<FieldProps, "children"> {
  type?: string;
  min?: string;
  value?: string | number | readonly string[] | undefined;
  className?: string;
  inputClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  startIcon?: ({ className }: { className: string }) => ReactNode;
  endIcon?: ({ className }: { className: string }) => ReactNode;
}

export const FieldInput: FC<FieldInputProps> = ({
  type,
  onBlur,
  onFocus,
  onChange,
  className,
  inputClassName,
  min,
  value,
  startIcon,
  endIcon,
  ...rest
}) => {
  return (
    <Field {...rest}>
      <div
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border border-greyscale-50/8 bg-white/5 px-3 py-2 text-sm leading-none focus-within:border-spacePurple-500 focus-within:bg-spacePurple-900 focus-within:ring-1 focus-within:ring-spacePurple-500",
          className
        )}
      >
        {startIcon ? startIcon({ className: "w-3.5 h-3.5 text-spaceBlue-200" }) : null}
        <input
          min={min}
          value={value}
          type={type}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          className={cn(
            "w-full bg-transparent text-greyscale-50 outline-none placeholder:text-spaceBlue-200",
            inputClassName
          )}
        />
        {endIcon ? endIcon({ className: "w-3.5 h-3.5 text-spaceBlue-200" }) : null}
      </div>
    </Field>
  );
};