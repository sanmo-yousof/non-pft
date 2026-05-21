"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useAdminTeams } from "@/hook/useAdminTeams";
import Spinner from "../shared/Spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import axiosInstance from "@/lib/api";

const Teams = () => {
  const { data, isLoading, error, refetch, isFetching } = useAdminTeams();
  console.log(data);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [form, setForm] = useState({
    user_id: "",
    name: "",
    tagline: "",
  });

  const resetForm = () => {
    setForm({
      user_id: "",
      name: "",
      tagline: "",
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const handleTeams = async () => {
    try {
      if (!form.name || !form.user_id || !form.tagline) {
        toast.error("All field required");
        return;
      }
      setLoading(true);
      if (isEditing && editingId) {
        await axiosInstance.post(`/user-teams/update/${editingId}`, form);
        toast.success("Team updated successfully");
      } else {
        await axiosInstance.post("/user-teams/store", form);
        toast.success("Team added successfully");
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
      await axiosInstance.delete(`/user-teams/delete/${id}`);
      toast.success("Team deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete team");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <Card className="bg-white rounded-2xl border border-stone-100">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-stone-900 mb-4">
            All Teams ({data?.team.length})
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
                  {isEditing ? "Edit Team" : "New Team"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Team Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-wt-name"
                    placeholder="Enter team name"
                  />
                </div>
                <div>
                  <Label className="text-sm">Tagline</Label>
                  <Input
                    value={form.tagline}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, tagline: e.target.value }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-wt-tagline"
                    placeholder="Enter tagline"
                  />
                </div>
                <div>
                  <Label className="text-sm">Select Leader</Label>
                  <Select
                    value={form.user_id}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, user_id: v }))
                    }
                  >
                    <SelectTrigger
                      className="mt-1 rounded-xl"
                      data-testid="admin-sponsor-level"
                    >
                      <SelectValue placeholder="Select Leader" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {data?.user.map((l, indx) => {
                        return (
                          <SelectItem key={indx} value={l.id.toString()}>
                            {l.display_name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                {isEditing ? (
                  <Button
                    disabled={loading}
                    onClick={handleTeams}
                    className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                  >
                    {loading ? "Updating..." : "Update"}
                  </Button>
                ) : (
                  <Button
                    disabled={loading}
                    onClick={handleTeams}
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
          {data?.team.map((t, indx) => (
            <div
              key={indx}
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50"
            >
              <div>
                <p className="text-sm font-medium text-stone-900">{t.name}</p>
                <p className="text-xs text-stone-400">{t.tagline}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsEditing(true);
                    setEditingId(t.id);
                    setOpen(true);
                    setForm({
                      user_id: String(t.owner_id ?? ""),
                      name: t.name ?? "",
                      tagline: t.tagline ?? "",
                    });
                  }}
                  className="rounded-full"
                >
                  <Pencil className="w-4 h-4 text-stone-400" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(t.id)}
                  className="text-red-400 hover:text-red-600 h-7 w-7 p-0"
                  data-testid={`admin-delete-team-${indx}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-stone-400 h-7 w-7 p-0"
                  onClick={() => {
                    setSelectedTeam(t);
                    setDetailsOpen(true);
                  }}
                >
                  <Eye className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Team Details</DialogTitle>
          </DialogHeader>

          {selectedTeam && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">{selectedTeam.name}</h2>
                <p className="text-sm text-stone-500">{selectedTeam.tagline}</p>
              </div>

              <div className="border rounded-xl p-4">
                <h3 className="font-semibold mb-3">Owner</h3>

                <div className="flex items-center gap-3">
                  {selectedTeam.owner?.image ? (
                    <img
                      src={selectedTeam.owner.image}
                      alt="owner"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center">
                      {selectedTeam.owner?.display_name?.charAt(0)}
                    </div>
                  )}

                  <div>
                    <p className="font-medium">
                      {selectedTeam.owner?.full_name}
                    </p>
                    <p className="text-sm text-stone-500">
                      @{selectedTeam.owner?.display_name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Team Members</h3>

                  <span className="text-sm bg-stone-100 px-3 py-1 rounded-full">
                    Total: {selectedTeam.team_members?.length || 0}
                  </span>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {selectedTeam.team_members?.map((member: any) => (
                    <div
                      key={member?.id}
                      className="flex items-center justify-between border rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        {member?.user?.image ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${member?.user?.image}`}
                            alt="user"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center">
                            {member?.user?.display_name?.charAt(0)}
                          </div>
                        )}

                        <div>
                          <p className="font-medium">
                            {member?.user?.full_name}
                          </p>

                          <p className="text-xs text-stone-500">
                            {member?.user?.email}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs text-stone-400">
                        @{member?.user?.display_name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Teams;
