import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TTeam } from "@/types/team";
import { postApi } from "@/lib/apiHandler";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import useAuth from "@/hook/useAuth";

export default function JoinTeamCreateAccount({
  team,
  setStep,
}: {
  team: TTeam;
  setStep: (step: number) => void;
}) {
  const params = useParams();

  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Part 1: Account creation
  const [showLogin, setShowLogin] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    display_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [showLoginPw, setShowLoginPw] = useState(false);

  // Handle signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (form.password !== form.password_confirmation) {
      toast.error("Passwords do not match");
      return;
    }
    setSubmitting(true);
    try {
      const res = await postApi(`/invite/register/${params?.slug}`, form);
      toast.success(`Welcome to ${team?.name}!`);
      localStorage.setItem("token", res.data?.data?.token);
      document.cookie = `token=${res.data.data?.token}; path=/; max-age=86400; SameSite=Lax`;
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setStep(1);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.errors?.email?.[0] ||
        err?.response?.data?.message ||
        "Signup failed";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await postApi(`/invite/login/${params?.slug}`, {
        email: form.email,
        password: form.password,
      });
      toast.success(`Welcome back! You've joined ${team?.name}`);
      localStorage.setItem("token", res.data?.data?.token);
      document.cookie = `token=${res.data.data?.token}; path=/; max-age=86400; SameSite=Lax`;
      queryClient.invalidateQueries({ queryKey: ["user"] });
      const user = res.data.data.user;
      if (user?.is_onbording) {
        router.push("/walker-dashboard");
      } else {
        setStep(1);
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.errors?.email?.[0] ||
        err?.response?.data?.message ||
        "Login failed";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <Card
      className="bg-white rounded-2xl border border-stone-100 shadow-[0_4px_20px_-2px_rgba(87,83,78,0.1)]"
      data-testid="teammate-step-account"
    >
      <CardContent className="p-6 md:p-8">
        {!showLogin ? (
          // Signup Form
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-1">
              Create Your Account
            </h2>
            <p className="text-sm text-stone-500 mb-6">
              Join {team.name} as a walker
            </p>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label className="text-stone-700 text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  value={form.full_name}
                  onChange={(e) => update("full_name", e.target.value)}
                  placeholder="Your full name"
                  required
                  className="mt-1 rounded-xl border-stone-200 bg-stone-50 h-12"
                  data-testid="teammate-signup-name"
                />
              </div>
              <div>
                <Label className="text-stone-700 text-sm font-medium">
                  Display Name
                </Label>
                <Input
                  value={form.display_name}
                  onChange={(e) => update("display_name", e.target.value)}
                  placeholder="Your walker nickname"
                  className="mt-1 rounded-xl border-stone-200 bg-stone-50 h-12"
                  data-testid="teammate-signup-display-name"
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
                  className="mt-1 rounded-xl border-stone-200 bg-stone-50 h-12"
                  data-testid="teammate-signup-email"
                />
              </div>
              <div>
                <Label className="text-stone-700 text-sm font-medium">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    type={showSignupPw ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    className="rounded-xl border-stone-200 bg-stone-50 h-12 pr-11"
                    data-testid="teammate-signup-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPw(!showSignupPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showSignupPw ? (
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
                    value={form.password_confirmation}
                    onChange={(e) =>
                      update("password_confirmation", e.target.value)
                    }
                    placeholder="Re-enter your password"
                    required
                    className="rounded-xl border-stone-200 bg-stone-50 h-12 pr-11"
                    data-testid="teammate-signup-confirm-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showConfirmPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="w-fit mx-auto">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-5 h-auto px-10 mx-auto"
                  data-testid="teammate-signup-submit"
                >
                  {submitting
                    ? "Creating Account..."
                    : "Create Account & Join Team"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
            <p className="text-center text-sm text-stone-500 mt-6">
              Already have an account?{" "}
              <button
                onClick={() => setShowLogin(true)}
                className="text-orange-600 font-medium hover:text-orange-700"
                data-testid="teammate-login-toggle"
              >
                Log In
              </button>
            </p>
          </div>
        ) : (
          // Login Form
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-1">
              Log In to Join
            </h2>
            <p className="text-sm text-stone-500 mb-6">
              Sign in to join {team.name}
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
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
                  className="mt-1 rounded-xl border-stone-200 bg-stone-50 h-12"
                  data-testid="teammate-login-email"
                />
              </div>
              <div>
                <Label className="text-stone-700 text-sm font-medium">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    type={showLoginPw ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="rounded-xl border-stone-200 bg-stone-50 h-12 pr-11"
                    data-testid="teammate-login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPw(!showLoginPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showLoginPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="w-fit mx-auto">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-5 h-auto px-10 mx-auto"
                  data-testid="teammate-login-submit"
                >
                  {submitting ? "Logging in..." : "Log In & Join Team"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
            <p className="text-center text-sm text-stone-500 mt-6">
              Need an account?{" "}
              <button
                onClick={() => setShowLogin(false)}
                className="text-orange-600 font-medium hover:text-orange-700"
              >
                Sign Up
              </button>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
