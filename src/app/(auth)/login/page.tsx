"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginAction } from "../actions";

// Trang đăng nhập
export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: null,
    success: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      toast.success("Đăng nhập thành công");
      router.push("/home");
    }
  }, [state.error, state.success, router]);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Đăng Nhập</CardTitle>
            <CardDescription>
              Nhập email và mật khẩu để đăng nhập
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    disabled={isPending}
                    aria-disabled={isPending}
                    className={isPending ? "opacity-60" : ""}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      disabled={isPending}
                      aria-disabled={isPending}
                      className={`pr-10 ${isPending ? "opacity-60" : ""}`}
                    />
                    <button
                      type="button"
                      disabled={isPending}
                      aria-disabled={isPending}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </Field>

                <Field>
                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? "Đang đăng nhập..." : "Đăng Nhập"}
                  </Button>
                  <FieldDescription className="text-center">
                    {isPending ? (
                      <span className="text-muted-foreground opacity-60">
                        Chưa có tài khoản?{" "}
                        <span className="text-primary">Đăng ký ngay</span>
                      </span>
                    ) : (
                      <>
                        Chưa có tài khoản?{" "}
                        <Link
                          href="/register"
                          className="text-primary hover:underline"
                        >
                          Đăng ký ngay
                        </Link>
                      </>
                    )}
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
