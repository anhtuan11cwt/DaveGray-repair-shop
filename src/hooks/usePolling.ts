"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Hook tự động refresh trang theo khoảng thời gian (ms)
// Dừng polling khi có searchParam
export function usePolling(ms = 60000, searchParam: string | null = null) {
  const router = useRouter();

  useEffect(() => {
    if (searchParam) return;

    const intervalId = setInterval(() => {
      router.refresh();
    }, ms);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, ms, router.refresh]);
}
