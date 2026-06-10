"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

// Nút tìm kiếm với trạng thái loading tự động
export default function SearchButton() {
  const status = useFormStatus();

  return (
    <Button type="submit" disabled={status.pending} className="w-20">
      {status.pending ? <LoaderCircle className="animate-spin" /> : "Tìm kiếm"}
    </Button>
  );
}
