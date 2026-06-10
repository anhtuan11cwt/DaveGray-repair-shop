"use client";

import type { Column } from "@tanstack/react-table";
import DebouncedInput from "@/components/react-table/debounced-input";

type Props<T> = {
  column: Column<T, unknown>;
};

export default function Filter<T>({ column }: Props<T>) {
  const filterValue = column.getFilterValue() as string;
  const uniqueValues = column.getFacetedUniqueValues();

  const formatValue = (v: unknown) =>
    v instanceof Date
      ? v.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : String(v);

  const sortedUniqueValues = Array.from(
    new Set(Array.from(uniqueValues.keys()).map(formatValue)),
  ).sort();

  return (
    <>
      <DebouncedInput
        key={filterValue ?? ""}
        type="text"
        value={filterValue ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Lọc... (${uniqueValues.size})`}
        list={`${column.id}list`}
        className="w-full border shadow rounded bg-card"
      />
      <datalist id={`${column.id}list`}>
        {sortedUniqueValues.map((value) => (
          <option value={value} key={`${column.id}-${value}`} />
        ))}
      </datalist>
    </>
  );
}
