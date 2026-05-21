"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { useAdminUsers } from "@/hook/useAdminUsers";
import Spinner from "../shared/Spinner";
import axiosInstance from "@/lib/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const User = () => {
  const { data, isLoading, error, refetch, isFetching } = useAdminUsers();
  const [deleting, setDeleting] = useState<number | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    display_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const resetForm = () => {
    setForm({
      full_name: "",
      display_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const handleRegistration = async () => {
    try {
      if (!form.full_name || !form.email || !form.password) {
        toast.error("All field required");
        return;
      }
      if (form.password !== form.password_confirmation) {
        toast.error("Password and confirmation do not match");
        return;
      }
      if (form.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }

      setLoading(true);

      if (isEditing && editingId) {
        await axiosInstance.post(
          `/users/update/${editingId}`,
          form,
        );
        toast.success("User information updated");
      } else {
        await axiosInstance.post("/users/store", form);
        toast.success("User created successfully");
      }
      setOpen(false);
      resetForm();
      refetch();
    } catch (error) {
      toast.error(isEditing ? "Update failed" : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeleting(id);
      await axiosInstance.delete(`/users/${id}`);
      toast.success("User deleted ");
      refetch();
    } catch (error) {
    } finally {
      setDeleting(null);
    }
  };

  if (isLoading) return <Spinner />;
  return (
    <Card className="bg-white rounded-2xl border border-stone-100">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-stone-900 mb-4">
            All Users ({data?.length})
          </h3>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setOpen(true);
                }}
                className="rounded-full bg-orange-600 hover:bg-orange-700 text-white"
                data-testid="admin-add-walker-type-btn"
              >
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit User Info" : "Create New User"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Full Name</Label>
                  <Input
                    type="text"
                    value={form.full_name}
                    placeholder="Enter your full name"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, full_name: e.target.value }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-wt-name"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm">Display Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your display name"
                    value={form.display_name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, display_name: e.target.value }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-wt-cost"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm">Email</Label>
                  <Input
                    type="email"
                    value={form.email}
                    placeholder="Enter your email"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-wt-order"
                    required
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
                      onChange={(e) =>
                        setForm((f) => ({ ...f, password: e.target.value }))
                      }
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
                      value={form.password_confirmation}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          password_confirmation: e.target.value,
                        }))
                      }
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
                {isEditing ? (
                  <Button
                    disabled={loading}
                    onClick={handleRegistration}
                    className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                  >
                    {loading ? "Updating..." : "Update"}
                  </Button>
                ) : (
                  <Button
                    disabled={loading}
                    onClick={handleRegistration}
                    className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                  >
                    {loading ? "Creating.." : "Create "}
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          {data?.map((u, indx) => (
            <div
              key={indx}
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50"
            >
              <div>
                <p className="text-sm font-medium text-stone-900">
                  {u.display_name}
                </p>
                <p className="text-xs text-stone-400">{u.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className={`rounded-full text-xs ${u.role === "admin" ? "bg-primary-50/10 text-primary-700" : u.role === "supporter" ? "bg-blue-100 text-blue-700" : "bg-stone-100 text-stone-600"}`}
                >
                  {u.role}
                </Badge>
                {u.payment_status === "paid" && (
                  <Badge className="rounded-full text-xs bg-emerald-100 text-emerald-700">
                    paid
                  </Badge>
                )}

                {u.role !== "admin" && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsEditing(true);
                        setEditingId(u.id);
                        setOpen(true);
                        setForm({
                          full_name: u.full_name ?? "",
                          display_name: u.display_name ?? "",
                          email: u.email ?? "",
                          password: "",
                          password_confirmation: "",
                        });
                      }}
                      className="rounded-full"
                    >
                      <Pencil className="w-4 h-4 text-stone-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(u.id)}
                      disabled={deleting === u.id}
                      className="text-red-400 hover:text-red-600 h-7 w-7 p-0"
                      data-testid={`admin-delete-user-${indx}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default User;
