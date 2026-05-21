"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
      if (password !== password_confirmation) {
        toast.error("Passwords do not match");
        return;
      }
      setLoading(true);
      const email = localStorage.getItem("tempMail");
      const res = await axiosInstance.post("/reset-password", {
        password,
        password_confirmation,
        email,
      });

      if (res.data.success) {
        localStorage.removeItem("tempMail");
        toast.success("Password change success");
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
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
                  type={showpassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                  className="mt-1"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showpassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showpassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <Label
                htmlFor="password_confirmation"
                className="text-stone-700 text-sm font-medium"
              >
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  value={password_confirmation}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter Confirm Password"
                  required
                  className="mt-1"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  data-testid="signup-toggle-confirm-password"
                >
                  {showConfirmPassword ? (
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
              className="w-full rounded-full mt-4 bg-primary-500 hover:bg-primary-600 text-white font-medium py-4 h-auto text-base transition-all hover:scale-[1.02]"
              data-testid="login-submit-btn"
            >
              {loading ? "Submiting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
