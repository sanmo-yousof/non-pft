"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAdminAchivments } from "@/hook/useAdminAchievments";
import Spinner from "../shared/Spinner";
import axiosInstance from "@/lib/api";
import { toast } from "sonner";
import { formatNumber } from "@/lib/formatNumber";

const Achievment = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, error, refetch, isFetching } = useAdminAchivments();
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    amount: "",
    achievement: "",
    swag: "",
    display_order: "",
  });

  const resetForm = () => {
    setForm({
      amount: "",
      achievement: "",
      swag: "",
      display_order: "",
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const handleAchievments = async () => {
    try {
      if (
        !form.amount ||
        !form.achievement ||
        !form.swag ||
        !form.display_order
      ) {
        toast.error("All field required");
        return;
      }

      setLoading(true);

      if (isEditing && editingId) {
        await axiosInstance.post(
          `/achievement-levels/update/${editingId}`,
          form,
        );
        toast.success("Achievments Levels updated");
      } else {
        await axiosInstance.post("/achievement-levels/store", form);
        toast.success("Achievments Levels created");
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
      await axiosInstance.delete(`/achievement-levels/${id}`);
      toast.success("Achievments Level deleted ");
      refetch();
    } catch (error) {
    }
  };

  if (isLoading) return <Spinner />;
  return (
    <Card className="bg-white rounded-2xl border border-stone-100">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Achievement Levels ({data?.length})
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Based on total amount raised (walker fee + teammates + supporters)
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setOpen(true);
                }}
                className="rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                data-testid="admin-add-achievement-btn"
              >
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing
                    ? "Edit Achievement Level"
                    : "New Achievement Level"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Total Amount (USD)</Label>
                  <Input
                    type="number"
                    value={form.amount}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        amount: e.target.value,
                      }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-al-amount"
                  />
                </div>
                <div>
                  <Label className="text-sm">Achievement</Label>
                  <Input
                    value={form.achievement}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, achievement: e.target.value }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-al-achievement"
                  />
                </div>
                <div>
                  <Label className="text-sm">Thank You Swag</Label>
                  <Input
                    value={form.swag}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, swag: e.target.value }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-al-swag"
                  />
                </div>
                <div>
                  <Label className="text-sm">Display Order</Label>
                  <Input
                    type="number"
                    min="1"
                    value={form.display_order}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, display_order: e.target.value }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-al-order"
                  />
                </div>
                {isEditing ? (
                  <Button
                    disabled={loading}
                    onClick={handleAchievments}
                    className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                    data-testid="admin-al-save-btn"
                  >
                    {loading ? "Updating.." : "Update"}
                  </Button>
                ) : (
                  <Button
                    disabled={loading}
                    onClick={handleAchievments}
                    className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                    data-testid="admin-al-save-btn"
                  >
                    {loading ? "Creating.." : "Create"}
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-2">
          {data?.map((al, indx) => (
            <div
              key={indx}
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50"
              data-testid={`admin-al-${indx}`}
            >
              <div>
                <p className="text-sm font-medium text-stone-900">
                  ${formatNumber(al.amount)} - {al.achievement}
                </p>
                <p className="text-xs text-stone-400">Swag: {al.swag}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsEditing(true);
                    setEditingId(al.id);
                    setOpen(true);
                    setForm({
                      amount: String(al.amount ?? ""),
                      achievement: al.achievement ?? "",
                      swag: al.swag ?? "",
                      display_order: String(al.display_order ?? ""),
                    });
                  }}
                  className="rounded-full"
                >
                  <Pencil className="w-4 h-4 text-stone-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(al.id)}
                  className="rounded-full"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievment;
