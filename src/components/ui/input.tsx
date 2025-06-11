import * as React from "react";
import { cn } from "@/lib/utils";
import { inputVariants, type InputVariants } from "@/lib/component-variants";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    InputVariants {}

function Input({ className, type, size, variant, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size, variant }), className)}
      {...props}
    />
  );
}

export { Input };
