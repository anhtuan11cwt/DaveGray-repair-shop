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
import { registerAction } from "../actions";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerAction, {
    error: null,
    success: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      toast.success("Đăng ký thành công");
      router.push("/home");
    }
  }, [state.error, state.success, router]);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Đăng Ký</CardTitle>
            <CardDescription>
              Nhập thông tin để tạo tài khoản mới
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Họ và tên</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    required
                    disabled={isPending}
                    aria-disabled={isPending}
                    className={isPending ? "opacity-60" : ""}
                  />
                </Field>

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
                  <FieldDescription>
                    Chúng tôi sẽ sử dụng email để liên hệ với bạn.
                  </FieldDescription>
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Tối thiểu 6 ký tự"
                      required
                      minLength={6}
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
                  <FieldDescription>
                    Mật khẩu phải có ít nhất 6 ký tự.
                  </FieldDescription>
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Xác nhận mật khẩu
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      required
                      minLength={6}
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
                    {isPending ? "Đang đăng ký..." : "Đăng Ký"}
                  </Button>
                  <FieldDescription className="text-center">
                    {isPending ? (
                      <span className="text-muted-foreground opacity-60">
                        Đã có tài khoản?{" "}
                        <span className="text-primary">Đăng nhập</span>
                      </span>
                    ) : (
                      <>
                        Đã có tài khoản?{" "}
                        <Link
                          href="/login"
                          className="text-primary hover:underline"
                        >
                          Đăng nhập
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
