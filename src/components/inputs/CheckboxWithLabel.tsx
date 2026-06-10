"use client";

import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  message: string;
  disabled?: boolean;
};

export function CheckboxWithLabel<S>({
  fieldTitle,
  nameInSchema,
  message,
  disabled = false,
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="w-full flex items-center gap-2">
          <FormLabel className="w-1/3 mt-2">{fieldTitle}</FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                id={nameInSchema}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            <label htmlFor={nameInSchema}>{message}</label>
          </div>
        </FormItem>
      )}
    />
  );
}
