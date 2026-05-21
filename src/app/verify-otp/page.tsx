"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    // Move back on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const otpString = otp.join("");

    // Optional validation
    if (otpString.length !== 6) {
      toast.error("Please enter full 6 digit OTP");
      return;
    }

    try {
      setLoading(true);
      const email = localStorage.getItem("tempMail")
      const res = await axiosInstance.post("/verify-otp", {
        otp: otpString,
        email
      });

      if (res.data.success) {
        toast.success("OTP verified success");
        router.push("/reset-password");
      }else{
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid OTP");
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
            OTP Verify
          </CardTitle>
        </CardHeader>
        <CardContent>
         <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <div className="flex justify-center gap-2 mt-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ))}
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full mt-4 bg-primary-500 hover:bg-primary-600 text-white font-medium py-4 h-auto text-base transition-all hover:scale-[1.02]"
              data-testid="login-submit-btn"
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
