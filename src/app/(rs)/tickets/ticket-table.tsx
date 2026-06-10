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

type TicketRow = {
  id: number;
  ticketDate: Date;
  title: string;
  fullName: string | null;
  email: string | null;
  tech: string | null;
};

type Props = {
  data: TicketRow[];
};

export default function TicketTable({ data }: Props) {
  const router = useRouter();

  const columnHelper = useMemo(() => createColumnHelper<TicketRow>(), []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("ticketDate", {
        id: "ticketDate",
        header: "Ngày tạo",
        cell: (info) => {
          const d = new Date(info.getValue());
          const y = d.getFullYear();
          const M = String(d.getMonth() + 1).padStart(2, "0");
          const D = String(d.getDate()).padStart(2, "0");
          const h = String(d.getHours()).padStart(2, "0");
          const m = String(d.getMinutes()).padStart(2, "0");
          return `${D}/${M}/${y} ${h}:${m}`;
        },
      }),
      columnHelper.accessor("title", {
        id: "title",
        header: "Tiêu đề",
      }),
      columnHelper.accessor("fullName", {
        id: "fullName",
        header: "Khách hàng",
      }),
      columnHelper.accessor("email", {
        id: "email",
        header: "Email",
      }),
      columnHelper.accessor("tech", {
        id: "tech",
        header: "Kỹ thuật viên",
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
                router.push(`/tickets/form?ticketId=${row.original.id}`)
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
