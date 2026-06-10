"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, TableOfContents } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// Bảng hiển thị danh sách khách hàng với action dropdown
export default function CustomerTable({ data }: Props) {
  const columnHelper = useMemo(
    () => createColumnHelper<SelectCustomerSchemaType>(),
    [],
  );

  const columns = useMemo(
    () => [
      // Cột action: tạo ticket mới hoặc chỉnh sửa
      columnHelper.display({
        id: "actions",
        header: "Hành động",
        cell: ({ row }) => (
          <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/tickets/form?customerId=${row.original.id}`}>
                    <TableOfContents className="size-4 mr-2" />
                    Tạo ticket mới
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/customers/form?customerId=${row.original.id}`}>
                    <MoreHorizontal className="size-4 mr-2" />
                    Chỉnh sửa khách hàng
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      }),
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
                <TableHead
                  key={header.id}
                  className={
                    header.id === "actions" ? "w-12 text-center" : undefined
                  }
                >
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
            <TableRow key={row.id}>
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
