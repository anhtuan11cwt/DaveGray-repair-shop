"use client";

import type { Column } from "@tanstack/react-table";
import DebouncedInput from "@/components/react-table/debounced-input";

type Props<T> = {
  column: Column<T, unknown>;
  filteredRows?: string[];
};

// Filter input cho bảng react-table
export default function Filter<T>({ column, filteredRows }: Props<T>) {
  const filterValue = column.getFilterValue() as string;

  const formatValue = (v: unknown) =>
    v instanceof Date
      ? v.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : String(v);

  const uniqueFilteredValues = filteredRows
    ? Array.from(new Set(filteredRows.map((v) => formatValue(v))))
    : Array.from(column.getFacetedUniqueValues().keys()).map(formatValue);

  const sortedUniqueValues = uniqueFilteredValues.sort();

  return (
    <>
      <DebouncedInput
        key={filterValue ?? ""}
        type="text"
        value={filterValue ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Lọc... (${uniqueFilteredValues.length})`}
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
