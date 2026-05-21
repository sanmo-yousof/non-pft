"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hook/useAuth";
import axiosInstance from "@/lib/api";
import { TUser } from "@/types/auth";
import { useQueryClient } from "@tanstack/react-query";
import { Save, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProfileClient = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth() as { user: TUser };
  const router = useRouter();
  const [form, setForm] = useState<Pick<TUser, "full_name" | "display_name">>({
    full_name: "",
    display_name: "",
  });
  const [saving, setSaving] = useState<boolean>(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    if (!form.full_name || !form.display_name) {
      toast.error("All field is required");
      return;
    }
    // console.log(form);
    try {
      await axiosInstance.post("/profile/update", form);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("profile updated");
      router.refresh();
    } catch (error) {
      toast.error("Update profile faild");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      full_name: user.full_name,
      display_name: user.display_name,
    });
  }, [user]);

  return (
    <div className="container-app py-8 md:py-12" data-testid="profile-page">
      <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">
        Your Profile
      </h1>

      <div className="max-w-lg">
        <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              {/* <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="w-7 h-7 text-primary-600" />
              </div> */}
              <div className="w-14 h-14 rounded-full overflow-hidden bg-primary-50/10 flex items-center justify-center border-2 border-primary-100/50">
                {user?.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${user.image}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={56}
                    height={56}
                  />
                ) : (
                  <User className="w-7 h-7 text-primary-600" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg">
                  {user?.display_name || user?.full_name}
                </CardTitle>
                <p className="text-sm text-stone-400">{user?.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4 mt-4">
              <div>
                <Label className="text-stone-700 text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  value={form.full_name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, full_name: e.target.value }))
                  }
                  className="mt-1 rounded-xl border-stone-200 bg-stone-50 focus:bg-white h-12"
                  data-testid="profile-full-name-input"
                />
              </div>
              <div>
                <Label className="text-stone-700 text-sm font-medium">
                  Display Name
                </Label>
                <Input
                  value={form.display_name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, display_name: e.target.value }))
                  }
                  className="mt-1 rounded-xl border-stone-200 bg-stone-50 focus:bg-white h-12"
                  data-testid="profile-display-name-input"
                />
              </div>
              <div className="pt-2">
                <p className="text-xs text-stone-400 mb-1">Email</p>
                <p className="text-sm text-stone-600">{user?.email}</p>
                <p className="text-xs text-stone-400 mt-2">
                  Role: <span className="capitalize">{user?.role}</span>
                </p>
              </div>
              <Button
                type="submit"
                disabled={saving}
                className="rounded-full bg-primary-500 hover:bg-primary-600  text-white font-medium px-8 py-5 h-auto"
                data-testid="profile-save-btn"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileClient;
