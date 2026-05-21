"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Mountain,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import axiosInstance from "@/lib/api";
import { useAdminChallenges } from "@/hook/useAdminChallenge";
import Spinner from "../shared/Spinner";
import { toast } from "sonner";
import { formatNumber } from "@/lib/formatNumber";

const Challenges = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data, isLoading, error, refetch, isFetching } = useAdminChallenges();
  const [loading, setLoading] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loadingMilestoneImage, setLoadingMilestoneImage] = useState<
    number | null
  >(null);
  const [routeMapFile, setRouteMapFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    distance: "",
    milestone: "",
    is_active: false,
    send_postcard: false,
  });

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      distance: "",
      milestone: "",
      is_active: false,
      send_postcard: false,
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const handleChallangeAdd = async () => {
    try {
      if (
        !form.name ||
        !form.description ||
        !form.distance ||
        !form.milestone
      ) {
        toast.error("All field required");
        return;
      }

      setLoading(true);

      if (isEditing && editingId) {
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("distance", form.distance);
        formData.append("milestone", form.milestone);
        formData.append("is_active", form.is_active ? "1" : "0");
        formData.append("send_postcard", form.send_postcard ? "1" : "0");

        if (routeMapFile) {
          formData.append("route_map", routeMapFile);
        }

        await axiosInstance.post(`/challenges/update/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Challenge updated successfully");
      } else {
        await axiosInstance.post("/challenges/store", form);
        toast.success("Challenge created successfully");
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

  // const handleUploadMap = async (id: number, file: File) => {
  //   try {
  //     setLoadingRouteMap(id);
  //     const formData = new FormData();
  //     formData.append("route_map", file);

  //     await axiosInstance.post(`/challenges/map/${id}`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     toast.success("Route map updated successfully");
  //     refetch();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Route map upload failed");
  //   } finally {
  //     setLoadingRouteMap(null);
  //   }
  // };

  const handleToggleActive = async (id: number, value: boolean) => {
    try {
      await axiosInstance.post(`/challenges/status/${id}`, {
        is_active: value,
      });

      toast.success("Challenge status updated");
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/challenges/${id}`);
      toast.success("Challenge deleted ");
      refetch();
    } catch (error) {
    }
  };

  const handleAddMilestoneImage = async (id: number, file: File) => {
    try {
      setLoadingMilestoneImage(id);
      const formData = new FormData();
      formData.append("image", file);

      await axiosInstance.post(`/challenges/milestone/photo/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image updated successfully");
      refetch();
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setLoadingMilestoneImage(null);
    }
  };

  if (isLoading) return <Spinner />;
  return (
    <Card className="bg-white rounded-2xl border border-stone-100">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Challenges ({data?.total})
            </h3>
            <p className="text-xs text-stone-400">
              {data?.active} active, {data?.inactive} inactive
            </p>
          </div>
          <Dialog
            open={open}
            onOpenChange={(value) => {
              setOpen(value);
              if (!value) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setOpen(true);
                }}
                className="rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                data-testid="admin-add-challenge-btn"
              >
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit Challenge" : "New Challenge"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Name (unique)</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="e.g., Nairobi to Naivasha"
                    className="mt-1 rounded-xl"
                    data-testid="admin-challenge-name"
                  />
                </div>
                <div>
                  <Label className="text-sm">
                    Description (50-2000 characters)
                  </Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="Describe the journey, what walkers will experience..."
                    rows={4}
                    className="mt-1 rounded-xl"
                    data-testid="admin-challenge-desc"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">
                    0/2000 characters
                  </p>
                </div>
                <div>
                  <Label className="text-sm">Total Distance (km)</Label>
                  <Input
                    type="number"
                    value={form.distance}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        distance: e.target.value,
                      }))
                    }
                    className="mt-1 rounded-xl"
                    data-testid="admin-challenge-distance"
                  />
                </div>
                <div>
                  <Label className="text-sm">
                    Milestones (one per line: distance:title:description)
                  </Label>
                  <Textarea
                    value={form.milestone}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        milestone: e.target.value,
                      }))
                    }
                    placeholder={`10:Checkpoint1:A scenic viewpoint\n10:Checkpoint2:A scenic viewpoint`}
                    rows={5}
                    className="mt-1 rounded-xl font-mono text-xs"
                    data-testid="admin-challenge-milestones"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">
                    Format: distance_km:title:what walker sees/smells/hears
                  </p>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50">
                  <div>
                    <p className="text-sm font-medium text-stone-900">Active</p>
                    <p className="text-xs text-stone-400">
                      Show this challenge to walkers
                    </p>
                  </div>
                  <Switch
                    checked={form.is_active}
                    onCheckedChange={(v) =>
                      setForm((f) => ({ ...f, is_active: v }))
                    }
                    data-testid="admin-challenge-active"
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50">
                  <div>
                    <p className="text-sm font-medium text-stone-900">
                      Send a Postcard?
                    </p>
                    <p className="text-xs text-stone-400">
                      Enable surprise email postcards at distance milestones
                    </p>
                  </div>
                  <Switch
                    checked={form.send_postcard}
                    onCheckedChange={(v) =>
                      setForm((f) => ({ ...f, send_postcard: v }))
                    }
                    data-testid="admin-challenge-postcards-toggle"
                  />
                </div>
                {isEditing && (
                  <div>
                    <Label className="text-sm">Route Map</Label>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setRouteMapFile(file);
                      }}
                    />
                  </div>
                )}

                {isEditing ? (
                  <Button
                    disabled={loading}
                    onClick={handleChallangeAdd}
                    className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                    data-testid="admin-challenge-save-btn"
                  >
                    {loading ? "Updating.." : "Update Challenge"}
                  </Button>
                ) : (
                  <Button
                    disabled={loading}
                    onClick={handleChallangeAdd}
                    className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                    data-testid="admin-challenge-save-btn"
                  >
                    {loading ? "Creating.." : "Create Challenge"}
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-3">
          {data?.challenges?.map((ch, idx) => (
            <div
              key={idx}
              className={`rounded-xl ${ch.is_active !== false ? "bg-stone-50" : "bg-stone-100 opacity-60"}`}
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      disabled={idx === 0}
                      //   onClick={() => handleMove(idx, -1)}
                    >
                      <ChevronUp className="w-4 h-4 text-stone-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      //   disabled={idx === challenges.length - 1}
                      //   onClick={() => handleMove(idx, 1)}
                      //   data-testid={`challenge-move-down-${ch.id}`}
                    >
                      <ChevronDown className="w-4 h-4 text-stone-500" />
                    </Button>
                  </div>
                  <Switch
                    checked={ch.is_active}
                    onCheckedChange={(value) =>
                      handleToggleActive(ch.id, value)
                    }
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-stone-900">
                        {ch.name}
                      </p>
                      {ch.is_active === false && (
                        <Badge className="bg-stone-200 text-stone-500 text-[10px] rounded-full">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-stone-400">
                      {formatNumber(ch.distance)} km &middot;{" "}
                      {ch.milestones?.length || 0} milestones &middot; Order:{" "}
                      {idx + 1}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setOpen(true);
                      setIsEditing(true);
                      setEditingId(ch.id);

                      setForm({
                        name: ch.name || "",
                        description: ch.description || "",
                        distance: String(ch.distance || ""),
                        milestone:
                          ch.milestones
                            ?.map(
                              (m) =>
                                `${m.distance}:${m.title}:${m.description}`,
                            )
                            .join("\n") || "",
                        is_active: ch.is_active || false,
                        send_postcard: ch.send_postcard || false,
                      });
                    }}
                    className="rounded-full"
                  >
                    <Pencil className="w-4 h-4 text-stone-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(ch.id)}
                    className="rounded-full"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
              {/* Route Map + Milestone Photos */}
              <div className="px-3 pb-3 space-y-2">
                {/* Route Map */}
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-stone-100">
                  <div className="shrink-0">
                    {ch.route_map ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${ch.route_map}`}
                        alt="Route map"
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-stone-100 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-stone-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-stone-700">
                      Route Map
                    </p>
                    <p className="text-[10px] text-stone-400">
                      {ch.route_map ? "Uploaded" : "No map uploaded"}
                    </p>
                  </div>
                  {/* <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUploadMap(ch.id, f);
                      }}
                    />
                    <Badge className="bg-primary-50/10 text-primary-700 hover:bg-primary-100/20 cursor-pointer text-[10px] rounded-full">
                      {loadingRouteMap === ch.id
                        ? "Uploading..."
                        : ch.route_map
                          ? "Replace"
                          : "Upload"}
                    </Badge>
                  </label> */}
                </div>
                {/* Milestone Photos */}
                {ch.milestones?.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider px-1">
                      Milestone Photos
                    </p>
                    {ch.milestones.map((m, mi) => (
                      <div
                        key={mi}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white border border-stone-100"
                      >
                        <div className="flex gap-1 shrink-0">
                          {/* {(m.image || []).map((p, pi) => (
                            <img
                              key={pi}
                              src={p}
                              alt=""
                              className="w-8 h-8 rounded object-cover"
                            />
                          ))}
                          {(!m.images || m.images.length === 0) && (
                            <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center">
                              <Mountain className="w-3 h-3 text-stone-300" />
                            </div>
                          )} */}
                          {m.image ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_BASE_URL}${m.image}`}
                              alt="Route map"
                              className="w-8 h-8 rounded object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center">
                              <Mountain className="w-4 h-4 text-stone-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-stone-700 truncate">
                            {m.title}
                          </p>
                          {/* <p className="text-[10px] text-stone-400">
                            {m.distance}km &middot;{" "}
                            {m.image ? "1 photo" : "0 photo"}
                          </p> */}
                        </div>
                        <label className="cursor-pointer shrink-0">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleAddMilestoneImage(m.id, f);
                            }}
                          />
                          <Badge className="bg-stone-100 text-stone-600 hover:bg-stone-200 cursor-pointer text-[10px] rounded-full">
                            {loadingMilestoneImage === m.id
                              ? "uploading..."
                              : m.image
                                ? "update"
                                : "+ Photo"}
                          </Badge>
                        </label>
                      </div>
                    ))}
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

export default Challenges;
