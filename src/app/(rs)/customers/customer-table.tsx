"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SelectCustomerSchemaType } from "@/zod-schemas/customer";

type Props = {
  data: SelectCustomerSchemaType[];
};

export default function CustomerTable({ data }: Props) {
  const router = useRouter();

  const columnHelper = useMemo(
    () => createColumnHelper<SelectCustomerSchemaType>(),
    [],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("fullName", {
        id: "fullName",
        header: "Họ và tên",
      }),
      columnHelper.accessor("email", {
        id: "email",
        header: "Email",
      }),
      columnHelper.accessor("phone", {
        id: "phone",
        header: "Số điện thoại",
      }),
      columnHelper.accessor("city", {
        id: "city",
        header: "Thành phố",
      }),
      columnHelper.accessor("zip", {
        id: "zip",
        header: "Mã bưu chính",
      }),
    ],
    [columnHelper],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
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
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
              onClick={() =>
                router.push(`/customers/form?customerId=${row.original.id}`)
              }
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
