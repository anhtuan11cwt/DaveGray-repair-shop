"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, Suspense } from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

// Định nghĩa đường dẫn breadcrumbs tĩnh cho từng trang
const staticPaths: Record<string, BreadcrumbItem[]> = {
  "/home": [{ label: "Trang chủ" }],
  "/tickets": [
    { label: "Phiếu sửa chữa", href: "/tickets" },
    { label: "Tìm kiếm" },
  ],
  "/customers": [
    { label: "Khách hàng", href: "/customers" },
    { label: "Tìm kiếm" },
  ],
};

function BreadcrumbsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pathname === "/tickets" || pathname === "/customers") {
    const items = staticPaths[pathname];
    return <BreadcrumbRender items={items} />;
  }

  if (pathname === "/home") {
    return <BreadcrumbRender items={staticPaths["/home"]} />;
  }

  if (pathname === "/tickets/form") {
    const ticketId = searchParams.get("ticketId");
    const items: BreadcrumbItem[] = [
      { label: "Phiếu sửa chữa", href: "/tickets" },
      { label: ticketId ? `Chi tiết phiếu #${ticketId}` : "Thêm phiếu" },
    ];
    return <BreadcrumbRender items={items} />;
  }

  if (pathname === "/customers/form") {
    const customerId = searchParams.get("customerId");
    const items: BreadcrumbItem[] = [
      { label: "Khách hàng", href: "/customers" },
      {
        label: customerId
          ? `Chi tiết khách hàng #${customerId}`
          : "Thêm khách hàng",
      },
    ];
    return <BreadcrumbRender items={items} />;
  }

  return null;
}

function BreadcrumbRender({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tickets"
            className="hover:text-foreground transition-colors"
          >
            <Home className="size-4" />
          </Link>
        </li>
        <li>
          <ChevronRight className="size-4" />
        </li>
        {items.map((item, index) => (
          <Fragment key={item.label}>
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">
                  {item.label}
                </span>
              )}
            </li>
            {index < items.length - 1 && (
              <li>
                <ChevronRight className="size-4" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

// Breadcrumbs bọc trong Suspense để xử lý useSearchParams
export default function Breadcrumbs() {
  return (
    <Suspense>
      <BreadcrumbsInner />
    </Suspense>
  );
}
