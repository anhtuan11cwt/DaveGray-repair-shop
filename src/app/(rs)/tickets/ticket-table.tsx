"use client";

import {
  type ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Filter from "@/components/react-table/filter";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePolling } from "@/hooks/usePolling";
import type { TicketSearchResultsType } from "@/lib/queries/get-ticket-search-results";

type RowType = TicketSearchResultsType[number];

type Props = {
  data: TicketSearchResultsType;
};

const columnWidths: Record<string, number> = {
  completed: 150,
  ticketDate: 150,
  title: 250,
  tech: 225,
  email: 225,
};

export default function TicketTable({ data }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "ticketDate", desc: false },
  ]);

  usePolling(10000, searchParams.get("searchText"));

  const pageIndex = useMemo(() => {
    const page = searchParams.get("page");
    return page ? Math.max(0, Number.parseInt(page, 10) - 1) : 0;
  }, [searchParams]);

  const columnHelper = useMemo(() => createColumnHelper<RowType>(), []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("ticketDate", {
        id: "ticketDate",
        size: columnWidths.ticketDate,
        header: ({ column }) => {
          const sorted = column.getIsSorted();
          return (
            <Button
              variant="ghost"
              className="pl-1 w-full flex justify-between"
              onClick={() => column.toggleSorting(sorted === "asc")}
            >
              Ngày tạo
              {sorted === "asc" ? (
                <ArrowUp className="size-4" />
              ) : sorted === "desc" ? (
                <ArrowDown className="size-4" />
              ) : (
                <ArrowUpDown className="size-4" />
              )}
            </Button>
          );
        },
        cell: (info) => {
          const d = new Date(info.getValue());
          const y = d.getFullYear();
          const M = String(d.getMonth() + 1).padStart(2, "0");
          const D = String(d.getDate()).padStart(2, "0");
          return `${D}/${M}/${y}`;
        },
      }),
      columnHelper.accessor("title", {
        id: "title",
        size: columnWidths.title,
        header: ({ column }) => {
          const sorted = column.getIsSorted();
          return (
            <Button
              variant="ghost"
              className="pl-1 w-full flex justify-between"
              onClick={() => column.toggleSorting(sorted === "asc")}
            >
              Tiêu đề
              {sorted === "asc" ? (
                <ArrowUp className="size-4" />
              ) : sorted === "desc" ? (
                <ArrowDown className="size-4" />
              ) : (
                <ArrowUpDown className="size-4" />
              )}
            </Button>
          );
        },
      }),
      columnHelper.accessor("tech", {
        id: "tech",
        size: columnWidths.tech,
        header: ({ column }) => {
          const sorted = column.getIsSorted();
          return (
            <Button
              variant="ghost"
              className="pl-1 w-full flex justify-between"
              onClick={() => column.toggleSorting(sorted === "asc")}
            >
              Kỹ thuật viên
              {sorted === "asc" ? (
                <ArrowUp className="size-4" />
              ) : sorted === "desc" ? (
                <ArrowDown className="size-4" />
              ) : (
                <ArrowUpDown className="size-4" />
              )}
            </Button>
          );
        },
      }),
      columnHelper.accessor("fullName", {
        id: "fullName",
        header: ({ column }) => {
          const sorted = column.getIsSorted();
          return (
            <Button
              variant="ghost"
              className="pl-1 w-full flex justify-between"
              onClick={() => column.toggleSorting(sorted === "asc")}
            >
              Khách hàng
              {sorted === "asc" ? (
                <ArrowUp className="size-4" />
              ) : sorted === "desc" ? (
                <ArrowDown className="size-4" />
              ) : (
                <ArrowUpDown className="size-4" />
              )}
            </Button>
          );
        },
      }),
      columnHelper.accessor("email", {
        id: "email",
        size: columnWidths.email,
        header: ({ column }) => {
          const sorted = column.getIsSorted();
          return (
            <Button
              variant="ghost"
              className="pl-1 w-full flex justify-between"
              onClick={() => column.toggleSorting(sorted === "asc")}
            >
              Email
              {sorted === "asc" ? (
                <ArrowUp className="size-4" />
              ) : sorted === "desc" ? (
                <ArrowDown className="size-4" />
              ) : (
                <ArrowUpDown className="size-4" />
              )}
            </Button>
          );
        },
      }),
      columnHelper.accessor("completed", {
        id: "completed",
        size: columnWidths.completed,
        header: ({ column }) => {
          const sorted = column.getIsSorted();
          return (
            <Button
              variant="ghost"
              className="pl-1 w-full flex justify-between"
              onClick={() => column.toggleSorting(sorted === "asc")}
            >
              Trạng thái
              {sorted === "asc" ? (
                <ArrowUp className="size-4" />
              ) : sorted === "desc" ? (
                <ArrowDown className="size-4" />
              ) : (
                <ArrowUpDown className="size-4" />
              )}
            </Button>
          );
        },
        cell: ({ getValue }) => {
          const completed = getValue();
          return completed ? (
            <div className="grid place-content-center">
              <CircleCheck className="text-green-600" />
            </div>
          ) : (
            <div className="grid place-content-center">
              <CircleX className="opacity-25" />
            </div>
          );
        },
      }),
    ],
    [columnHelper],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
      pagination: { pageIndex, pageSize: 10 },
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
  });

  const updatePage = (newPageIndex: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPageIndex + 1));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const totalResults = table.getFilteredRowModel().rows.length;
  const totalPages = Math.max(1, table.getPageCount());

  useEffect(() => {
    const currentIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();
    if (pageCount <= currentIndex && currentIndex > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchParams.toString,
    table.getState,
    table.getPageCount,
    router.replace,
  ]);

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="rounded-lg overflow-hidden border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.column.getSize() || undefined }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {header.column.getCanFilter() ? (
                      <div className="grid place-content-center">
                        <Filter
                          column={header.column}
                          filteredRows={table
                            .getFilteredRowModel()
                            .rows.map((row) =>
                              String(row.getValue(header.column.id)),
                            )}
                        />
                      </div>
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                  onClick={() =>
                    router.push(`/tickets/form?ticketId=${row.original.id}`)
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8"
                >
                  Không tìm thấy kết quả
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="text-sm text-muted-foreground">
          Trang {pageIndex + 1} / {totalPages} ({totalResults} kết quả)
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <div className="flex flex-row gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updatePage(pageIndex - 1)}
              disabled={!table.getCanPreviousPage()}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updatePage(pageIndex + 1)}
              disabled={!table.getCanNextPage()}
            >
              Sau
            </Button>
          </div>
          <div className="flex flex-row gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.refresh()}
            >
              Làm mới
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.resetSorting()}
            >
              Đặt lại sắp xếp
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.resetColumnFilters()}
            >
              Đặt lại bộ lọc
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
