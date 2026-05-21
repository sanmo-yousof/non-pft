"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postApi } from "@/lib/apiHandler";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const payloadData = {
      email: email,
      password: password,
    };

    try {
      const res = await postApi("/login", payloadData);
      if (res.status === 200) {
        toast.success("Welcome back!");
        localStorage.setItem("token", res.data?.data?.token);
        document.cookie = `token=${res.data.data?.token}; path=/; max-age=86400; SameSite=Lax`;
        queryClient.invalidateQueries({ queryKey: ["user"] });
        const user = res.data.data.user;
        const role = user?.role;
        if (role === "admin") {
          router.push("/admin-dashboard");
          router.refresh()
        } else if (role === "walker") {
          router.push("/walker-dashboard");
        } else {
          router.push("/supporter-dashboard");
        }
      }
    } catch (err:any) {
      const errorMessage =
        err?.response?.data?.errors?.email?.[0] ||
        err?.response?.data?.message ||
        "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Card
        className="w-full max-w-md bg-white rounded-2xl border border-stone-100 shadow-[0_4px_20px_-2px_rgba(87,83,78,0.1)]"
        data-testid="login-card"
      >
        <CardHeader className="text-center pb-2">
          <Image
            src="/logo/logo.png"
            alt="KEF"
            width={56}
            height={56}
            className="w-14 h-14 object-contain mx-auto mb-4"
          />
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: "#1a3660" }}
          >
            Welcome Back
          </CardTitle>
          <p className="text-sm text-stone-500 mt-1">
            Log in to continue your journey
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="text-stone-700 text-sm font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1"
                data-testid="login-email-input"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-stone-700 text-sm font-medium"
              >
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1 pr-11"
                  data-testid="login-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  data-testid="login-toggle-password"
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link
                className="text-stone-700 text-sm font-medium underline"
                href={"/forgot-password"}
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-6 h-auto text-base transition-all hover:scale-[1.02]"
              data-testid="login-submit-btn"
            >
              {loading ? "Logging in..." : "Log In"}
              <LogIn className="w-4 h-4 ml-2" />
            </Button>
          </form>
          <p className="text-center text-sm text-stone-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary-500 font-medium hover:text-primary-600"
              data-testid="login-signup-link"
            >
              Join the Challenge
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
