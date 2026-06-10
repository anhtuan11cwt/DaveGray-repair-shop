import { LoaderCircle } from "lucide-react";

// Loading spinner toàn trang
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-800/80">
      <LoaderCircle className="size-48 animate-spin text-white" />
    </div>
  );
}
