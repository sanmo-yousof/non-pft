"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import useAuth from "@/hook/useAuth";
import axiosInstance from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useRouter } from "next/navigation";

const Pledge = ({
  pledgeTo,
  totalChallenge,
  displayName,
  fullName,
  challengeId,
}: {
  pledgeTo: string;
  totalChallenge: number;
  displayName: string;
  fullName: string;
  challengeId?: number | null;
}) => {
  const [pledgeTotal, setPledgeTotal] = useState<string>("");
  const [pledgePerKm, setPledgePerKm] = useState<string>("");
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showPw, setShowPw] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const { user } = useAuth();

  const [signUpForm, setSignUpForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  const computePledgeTotal = () => {
    let total = 0;
    const totalVal = parseFloat(pledgeTotal) || 0;
    const perKmVal = parseFloat(pledgePerKm) || 0;
    // const routeKm = data?.challenge?.total_distance_km || 0;
    total = totalVal + perKmVal * totalChallenge;
    return total;
  };

  const hasAnyPledge = () => {
    return parseFloat(pledgeTotal) > 0 || parseFloat(pledgePerKm) > 0;
  };

  const progressPct = Math.min(100, (50 / 2888) * 100);

  const calculatedTotal = computePledgeTotal();

  const handleContinue = async () => {
    try {
      if (challengeId === null) {
        setOpenDialog(true);
        return;
      }
      setLoading(true);
      if (!hasAnyPledge()) {
        toast.error("Please enter at least one pledge amount");
        return;
      } else {
        if (user) {
          await axiosInstance.post(`/fundraises/${pledgeTo}`, {
            fixed_amount: parseFloat(pledgeTotal),
            per_km_amount: parseFloat(pledgePerKm),
            km_amount: totalChallenge * parseFloat(pledgePerKm),
          });
          toast.success("Pledge submit success");
          router.push("/thank-you");
        } else {
          setShowSignup(true);
        }
      }
    } catch (error) {
      toast.error("Faild to submit");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      if (signUpForm.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
      if (!hasAnyPledge()) {
        toast.error("Please enter at least one pledge amount");
        return;
      }
      const res = await axiosInstance.post(
        `/supporters/register/${displayName}`,
        {
          ...signUpForm,
          fixed_amount: parseFloat(pledgeTotal),
          per_km_amount: parseFloat(pledgePerKm),
          km_amount: totalChallenge * parseFloat(pledgePerKm),
        },
      );

      toast.success("Created account & Pledge submit success");
      router.push("/thank-you");
      localStorage.setItem("token", res.data?.data?.token);
      document.cookie = `token=${res.data.data?.token}; path=/; max-age=86400; SameSite=Lax`;
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setShowSignup(false);
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!hasAnyPledge()) {
        toast.error("Please enter at least one pledge amount");
        return;
      }
      const res = await axiosInstance.post(`/supporters/login/${displayName}`, {
        ...loginForm,
        fixed_amount: parseFloat(pledgeTotal),
        per_km_amount: parseFloat(pledgePerKm),
        km_amount: totalChallenge * parseFloat(pledgePerKm),
      });

      toast.success("Login & Pledge submit success");
      router.push("/thank-you");
      localStorage.setItem("token", res.data?.data?.token);
      document.cookie = `token=${res.data.data?.token}; path=/; max-age=86400; SameSite=Lax`;
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setShowLogin(false);
    } catch (err: any) {
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
    <Card
      className="bg-white rounded-2xl border-2 border-primary-200 shadow-[0_8px_30px_-4px_rgba(234,88,12,0.15)] mb-8"
      data-testid="pledge-form-card"
    >
      <CardContent className="p-6 md:p-8">
        {!showSignup ? (
          <div>
            <div className="text-center mb-6">
              <h2
                className="text-xl md:text-2xl font-bold text-stone-900 mb-2"
                data-testid="pledge-headline"
              >
                Pledge Your Support For {fullName} Today
              </h2>
              <p className="text-sm text-stone-600 mb-1">
                Every dollar goes to Kenyan students&apos; education
              </p>
              <p className="text-xs text-stone-400">
                Choose an option below. Type in your donation amount & click
                continue.
              </p>
            </div>

            {/* Two pledge options side by side */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5"
              data-testid="pledge-options"
            >
              <div className="p-4 rounded-xl border-2 border-stone-100 bg-stone-50 hover:border-primary-200 transition-colors">
                <Label className="text-sm font-bold text-stone-900 block mb-2">
                  Total Pledge
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-medium">
                    $
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={pledgeTotal}
                    onChange={(e) => setPledgeTotal(e.target.value)}
                    placeholder="0.00"
                    className="no-arrows pl-7 rounded-xl border-stone-200 bg-white h-12 text-lg font-medium"
                    data-testid="pledge-total-input"
                  />
                </div>
                <p className="text-xs text-stone-400 mt-1.5">
                  Fixed amount donation
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-stone-100 bg-stone-50 hover:border-primary-200 transition-colors">
                <Label className="text-sm font-bold text-stone-900 block mb-2">
                  Pledge Per KM
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-medium">
                    $
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={pledgePerKm}
                    onChange={(e) => setPledgePerKm(e.target.value)}
                    placeholder="0.00"
                    className="no-arrows pl-7 rounded-xl border-stone-200 bg-white h-12 text-lg font-medium"
                    data-testid="pledge-per-km-input"
                  />
                </div>
                <p className="text-xs text-stone-400 mt-1.5">Per km walked</p>
              </div>
            </div>

            {/* Combined total display */}
            {calculatedTotal > 0 && (
              <div
                className="p-3 rounded-xl bg-primary-50/10 border border-primary-100/20 mb-5 text-center"
                data-testid="pledge-total-display"
              >
                <p className="text-xs text-primary-700 font-medium">
                  {parseFloat(pledgeTotal) > 0 &&
                  parseFloat(pledgePerKm) > 0 ? (
                    <>
                      ${pledgeTotal} total + ${pledgePerKm}/km x{" "}
                      {totalChallenge} km ={" "}
                      <span className="text-lg font-bold">
                        ${calculatedTotal.toFixed(2)}
                      </span>
                    </>
                  ) : parseFloat(pledgePerKm) > 0 ? (
                    <>
                      Estimated total if route completed:{" "}
                      <span className="text-lg font-bold">
                        ${calculatedTotal.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <>
                      Your pledge:{" "}
                      <span className="text-lg font-bold">
                        ${calculatedTotal.toFixed(2)}
                      </span>
                    </>
                  )}
                </p>
              </div>
            )}

            <Button
              onClick={handleContinue}
              disabled={!hasAnyPledge() || loading}
              className="rounded-full bg-primary-600 flex hover:bg-primary-700 text-white font-bold py-5 h-auto text-base disabled:opacity-50 transition-all hover:scale-[1.01] px-12 mx-auto "
              data-testid="pledge-continue-btn"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {user && (
              <p className="text-xs text-stone-400 text-center mt-3">
                Pledging as {user.display_name || user.full_name}
              </p>
            )}
          </div>
        ) : (
          <div data-testid="supporter-auth-section">
            {!showLogin ? (
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1 text-center">
                  Sign Up to Support
                </h3>
                <p className="text-sm text-stone-500 mb-4 text-center">
                  Create an account to track your pledge for {fullName}.
                </p>
                <form className="space-y-3">
                  <div>
                    <Label className="text-stone-700 text-xs font-medium">
                      Full Name
                    </Label>
                    <Input
                      value={signUpForm.full_name}
                      onChange={(e) =>
                        setSignUpForm((f) => ({
                          ...f,
                          full_name: e.target.value,
                        }))
                      }
                      placeholder="Your full name"
                      required
                      className="mt-1 rounded-xl border-stone-200 bg-stone-50 h-11"
                      data-testid="supporter-signup-name"
                    />
                  </div>
                  <div>
                    <Label className="text-stone-700 text-xs font-medium">
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={signUpForm.email}
                      onChange={(e) =>
                        setSignUpForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="you@example.com"
                      required
                      className="mt-1 rounded-xl border-stone-200 bg-stone-50 h-11"
                      data-testid="supporter-signup-email"
                    />
                  </div>
                  <div>
                    <Label className="text-stone-700 text-xs font-medium">
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        type={showPw ? "text" : "password"}
                        value={signUpForm.password}
                        onChange={(e) =>
                          setSignUpForm((f) => ({
                            ...f,
                            password: e.target.value,
                          }))
                        }
                        placeholder="At least 8 characters"
                        required
                        className="rounded-xl border-stone-200 bg-stone-50 h-11 pr-10"
                        data-testid="supporter-signup-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                      >
                        {showPw ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl  bg-primary-50/10 border border-primary-100/20 ">
                    <p className="text-xs font-medium text-primary-800">
                      Your pledge:
                    </p>
                    <p className="text-sm font-bold text-primary-600">
                      ${calculatedTotal.toFixed(2)} total
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    onClick={handleSignUp}
                    className="rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-5 h-auto px-10 mx-auto block"
                    data-testid="supporter-signup-submit"
                  >
                    Sign Up & Pledge
                  </Button>
                </form>
                <p className="text-center text-xs text-stone-500 mt-4">
                  Already have an account?{" "}
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-primary-600 font-medium"
                    data-testid="supporter-login-toggle"
                  >
                    Log In
                  </button>
                </p>
                <button
                  onClick={() => setShowSignup(false)}
                  className="flex items-center gap-1 mx-auto text-xs text-stone-400 mt-2 hover:text-stone-600"
                  data-testid="supporter-back-btn"
                >
                  <ArrowLeft className="w-3 h-3" /> Back to pledge options
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1 text-center">
                  Log In to Support
                </h3>
                <p className="text-sm text-stone-500 mb-4 text-center">
                  Log in to record your pledge.
                </p>
                <form onSubmit={handleLogin} className="space-y-3">
                  <div>
                    <Label className="text-stone-700 text-xs font-medium">
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) =>
                        setloginForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="you@example.com"
                      required
                      className="mt-1 rounded-xl border-stone-200 bg-stone-50 h-11"
                      data-testid="supporter-login-email"
                    />
                  </div>
                  <div>
                    <Label className="text-stone-700 text-xs font-medium">
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        type={showPw ? "text" : "password"}
                        value={loginForm.password}
                        onChange={(e) =>
                          setloginForm((f) => ({
                            ...f,
                            password: e.target.value,
                          }))
                        }
                        required
                        className="rounded-xl border-stone-200 bg-stone-50 h-11 pr-10"
                        data-testid="supporter-login-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                      >
                        {showPw ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl  bg-primary-50/10 border border-primary-100/20 ">
                    <p className="text-xs font-medium text-primary-800">
                      Your pledge:
                    </p>
                    <p className="text-sm font-bold text-primary-600">
                      ${calculatedTotal.toFixed(2)} total
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-5 h-auto px-10 mx-auto block"
                    data-testid="supporter-login-submit"
                  >
                    Log In & Pledge
                  </Button>
                </form>
                <p className="text-center text-xs text-stone-500 mt-4">
                  Need an account?{" "}
                  <button
                    onClick={() => setShowLogin(false)}
                    className="text-primary-600 font-medium"
                  >
                    Sign Up
                  </button>
                </p>
                <button
                  onClick={() => {
                    setShowSignup(false);
                    setShowLogin(false);
                  }}
                  className="flex items-center gap-1 mx-auto text-xs text-stone-400 mt-2 hover:text-stone-600"
                >
                  <ArrowLeft className="w-3 h-3" /> Back to pledge options
                </button>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Complete Onboarding</DialogTitle>
            <DialogDescription className="py-6">
              {user?.role === "walker" &&
              user?.registrations?.id === parseInt(pledgeTo)
                ? "Please complete onboarding before pledging your support."
                : "This fundraiser hasn't completed their onboarding yet. Please check back later."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="outline"
              className="rounded-full"
            >
              Cancel
            </Button>

            {user?.role === "walker" &&
            user?.registrations?.id === parseInt(pledgeTo) ? (
              <Button
                className="rounded-full bg-primary-500 hover:bg-primary-600"
                onClick={() => {
                  setOpenDialog(false);
                  router.push("/onboarding");
                }}
              >
                Complete Now
              </Button>
            ) : (
              <Button
                className="rounded-full bg-primary-500 hover:bg-primary-600"
                onClick={() => setOpenDialog(false)}
              >
                Got It
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Pledge;
