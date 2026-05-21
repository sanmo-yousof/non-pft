"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.post("/forgot-password", { email });
      if (res.data.success) {
        localStorage.setItem("tempMail",email);
        toast.success("OTP sent success");
        router.push("/verify-otp");
      }else{
        toast.error("User not found");
      }
    } catch (error) {
      console.log(error);
      toast.error("User not found");
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
            Restore Account
          </CardTitle>
          {/* <p className="text-sm text-stone-500 mt-1">
            Send OTP on your email
          </p> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendOtp} className="space-y-4">
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
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full mt-4 bg-primary-500 hover:bg-primary-600 text-white font-medium py-4 h-auto text-base transition-all hover:scale-[1.02]"
              data-testid="login-submit-btn"
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
