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
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
import type { TicketSearchResultsType } from "@/lib/queries/get-ticket-search-results";

type RowType = TicketSearchResultsType[number];

type Props = {
  data: TicketSearchResultsType;
};

export default function TicketTable({ data }: Props) {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "ticketDate", desc: false },
  ]);

  const columnHelper = useMemo(() => createColumnHelper<RowType>(), []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("ticketDate", {
        id: "ticketDate",
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
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  const totalResults = table.getFilteredRowModel().rows.length;
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="rounded-lg overflow-hidden border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {header.column.getCanFilter() ? (
                      <div className="grid place-content-center">
                        <Filter column={header.column} />
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

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Trang {currentPage} / {totalPages} ({totalResults} kết quả)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Đặt lại bộ lọc
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
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
