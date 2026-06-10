"use client";

import type { TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextareaWithLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={nameInSchema} className="mb-2">
            {fieldTitle}
          </FormLabel>
          <FormControl>
            <Textarea
              id={nameInSchema}
              {...field}
              className={cn(
                "w-full",
                "disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75",
                className,
              )}
              {...props}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
