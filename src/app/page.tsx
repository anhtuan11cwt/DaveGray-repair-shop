import { Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";

// Trang chủ landing page - hiển thị thông tin liên hệ cửa hàng
export default function Home() {
  return (
    <div className="relative flex flex-col justify-center items-center mx-auto min-h-dvh animate-appear">
      {/* Background decoration - hiệu ứng blur trang trí */}
      <div className="-z-10 absolute inset-0 overflow-hidden">
        <div className="-top-40 -left-40 absolute bg-primary/10 rounded-full dark:bg-primary/5 w-[500px] h-[500px] blur-3xl" />
        <div className="-bottom-40 -right-40 absolute bg-primary/10 rounded-full dark:bg-primary/5 w-[500px] h-[500px] blur-3xl" />
      </div>
      <div className="flex flex-col items-center gap-8 mx-4 w-full max-w-lg">
        <h1 className="font-bold text-center text-4xl tracking-tight md:text-5xl">
          Cửa Hàng Sửa Chữa
          <br />
          Máy Tính
        </h1>
        {/* Thông tin liên hệ - địa chỉ và giờ làm việc */}
        <div className="grid gap-4 w-full">
          <div className="flex items-center gap-3 bg-card p-4 rounded-xl border shadow-sm">
            <MapPin className="shrink-0 text-primary size-5" />
            <p className="text-sm md:text-base">
              12 Nguyễn Văn Bảo, P4
              <br />
              Gò Vấp, TP. Hồ Chí Minh
            </p>
          </div>
          <div className="flex items-center gap-3 bg-card p-4 rounded-xl border shadow-sm">
            <Clock className="shrink-0 text-primary size-5" />
            <div className="text-sm md:text-base">
              <p>T2-T6: 9:00 SA - 6:00 CH</p>
              <p>T7: 10:00 SA - 4:00 CH</p>
              <p>CN: Đóng cửa</p>
            </div>
          </div>
        </div>
        {/* Nút gọi điện thoại */}
        <Link
          href="tel:+14155551234"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium text-lg shadow-sm hover:opacity-90 transition-opacity"
        >
          <Phone className="size-5" />
          (415) 555-1234
        </Link>
      </div>
    </div>
  );
}
