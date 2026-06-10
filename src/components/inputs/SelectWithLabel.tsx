"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type DataObj = {
  id: string;
  description: string;
};

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  data: DataObj[];
  className?: string;
  disabled?: boolean;
};

export function SelectWithLabel<S>({
  fieldTitle,
  nameInSchema,
  data,
  className,
  disabled = false,
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={nameInSchema}>{fieldTitle}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger
                id={nameInSchema}
                className={cn(
                  "w-full",
                  "disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75",
                  className,
                )}
              >
                <SelectValue placeholder="Chọn" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((item) => (
                <SelectItem key={`${nameInSchema}-${item.id}`} value={item.id}>
                  {item.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
