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
import { useAdminRegistrationLevels } from "@/hook/useAdminRegistrationLevels";
import Spinner from "../shared/Spinner";
import { toast } from "sonner";
import axiosInstance from "@/lib/api";
import { formatNumber } from "@/lib/formatNumber";

const RegistrationLevel = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, error, refetch, isFetching } =
    useAdminRegistrationLevels();
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    name: "",
    cost: "",
    display_order: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      cost: "",
      display_order: "",
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const handleRegistration = async () => {
    try {
      if (!form.name || !form.cost || !form.display_order) {
        toast.error("All field required");
        return;
      }

      setLoading(true);

      if (isEditing && editingId) {
        await axiosInstance.post(
          `/registration-levels/update/${editingId}`,
          form,
        );
        toast.success("Registration Levels updated");
      } else {
        await axiosInstance.post("/registration-levels/store", form);
        toast.success("Registration Levels updated");
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
      await axiosInstance.delete(`/registration-levels/${id}`);
      toast.success("Registration Level deleted ");
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
              Registration Levels ({data?.length})
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Registration fee levels for walkers
            </p>
          </div>
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
                  {isEditing
                    ? "Edit Registration Level"
                    : "New Registration Level"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-wt-name"
                  />
                </div>
                <div>
                  <Label className="text-sm">Cost (USD)</Label>
                  <Input
                    type="number"
                    value={form.cost}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, cost: e.target.value }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-wt-cost"
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
                    data-testid="admin-wt-order"
                  />
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
          {data?.map((wt, indx) => (
            <div
              key={indx}
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50"
              data-testid={`admin-wt-${indx}`}
            >
              <div>
                <p className="text-sm font-medium text-stone-900">
                  {wt.name} - ${formatNumber(wt.cost)} 
                </p>
                <p className="text-xs text-stone-400">
                  Order: {wt.display_order || 0}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsEditing(true);
                    setEditingId(wt.id);
                    setOpen(true);
                    setForm({
                      name: wt.name ?? "",
                      cost: String(wt.cost ?? ""),
                      display_order: String(wt.display_order ?? ""),
                    });
                  }}
                  className="rounded-full"
                >
                  <Pencil className="w-4 h-4 text-stone-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(wt.id)}
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

export default RegistrationLevel;
