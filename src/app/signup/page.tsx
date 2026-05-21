"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hook/useAuth";
import { postApi } from "@/lib/apiHandler";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    display_name: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const joinCode = searchParams.get("join");
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (form.password !== form.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);

    const payloadData = {
      full_name: form.full_name,
      display_name: form.display_name,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirm_password,
    };

    try {
      const res = await postApi("/register", payloadData);
      if (res.status === 200) {
        toast.success("Welcome to The Kenya Challenge!");
        localStorage.setItem("token", res.data?.data?.token);
        document.cookie = `token=${res.data.data?.token}; path=/; max-age=86400; SameSite=Lax`;
        queryClient.invalidateQueries({ queryKey: ["user"] });
        if (joinCode) {
          router.push(`/teams/join/${joinCode}`);
        } else {
          router.push("/onboarding");
        }
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.errors?.email?.[0] ||
        err?.response?.data?.message ||
        "Signup failed";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Card
        className="w-full max-w-md bg-white rounded-2xl border border-stone-100 shadow-[0_4px_20px_-2px_rgba(87,83,78,0.1)]"
        data-testid="signup-card"
      >
        <CardHeader className="text-center pb-2">
          <Image
            src="/logo/logo.png"
            alt="KEF"
            width={56}
            height={56}
            className="object-contain mx-auto mb-4 w-14 h-14"
          />
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: "#1a3660" }}
          >
            Join The Challenge
          </CardTitle>
          <p className="text-sm text-stone-500 mt-1">
            {joinCode
              ? "Sign up to join your team"
              : "Create your walker account"}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-stone-700 text-sm font-medium">
                Full Name
              </Label>
              <Input
                value={form.full_name}
                onChange={(e) => update("full_name", e.target.value)}
                placeholder="Your full name"
                required
                className="mt-1"
                data-testid="signup-name-input"
              />
            </div>
            <div>
              <Label className="text-stone-700 text-sm font-medium">
                Display Name{" "}
              </Label>
              <Input
                value={form.display_name}
                onChange={(e) => update("display_name", e.target.value)}
                placeholder="Your walker nickname"
                className="mt-1"
                data-testid="signup-display-name-input"
              />
            </div>
            <div>
              <Label className="text-stone-700 text-sm font-medium">
                Email
              </Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1"
                data-testid="signup-email-input"
              />
            </div>
            <div>
              <Label className="text-stone-700 text-sm font-medium">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className=" pr-11"
                  data-testid="signup-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  data-testid="signup-toggle-password"
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <Label className="text-stone-700 text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  type={showConfirmPw ? "text" : "password"}
                  value={form.confirm_password}
                  onChange={(e) => update("confirm_password", e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  className=" pr-11"
                  data-testid="signup-confirm-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  data-testid="signup-toggle-confirm-password"
                >
                  {showConfirmPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-6 h-auto text-base transition-all hover:scale-[1.02]"
              data-testid="signup-submit-btn"
            >
              {loading ? "Creating account..." : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
          <p className="text-center text-sm text-stone-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary-500 hover:text-primary-600 font-medium hover:text-primary"
              data-testid="signup-login-link"
            >
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
