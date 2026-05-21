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
import { Image, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import Spinner from "../shared/Spinner";
import { useAdminSponsorship } from "@/hook/useAdminSponsorship";
import { toast } from "sonner";
import axiosInstance from "@/lib/api";
import { useAdminCorporate } from "@/hook/useAdminCorporate";

const CorporateSponsorsAdmin = () => {
  const [spEditingId, setSpEditingId] = useState<number | null>(null);
  const [spIsEditing, setspIsEditing] = useState<boolean>(false);
  const [spLoading, setSpLoading] = useState<boolean>(false);
  const [levelOpen, setLevelOpen] = useState<boolean>(false);
  const { data, isLoading, error, refetch, isFetching } = useAdminSponsorship();
  console.log("sponsorship", data);
  const {
    data: corporate,
    isLoading: corporateLoading,
    refetch: refc,
  } = useAdminCorporate();

  const [sponsor, setSponsor] = useState({
    name: "",
    max_sponsors: "",
    display_order: "",
  });

  const resetSponsor = () => {
    setSponsor({
      name: "",
      max_sponsors: "",
      display_order: "",
    });
    setSpEditingId(null);
    setspIsEditing(false);
  };

  const handleLevel = async () => {
    try {
      if (!sponsor.name || !sponsor.max_sponsors || !sponsor.display_order) {
        toast.error("All field required");
        return;
      }

      setSpLoading(true);

      if (spEditingId && spIsEditing) {
        await axiosInstance.post(
          `/sponsorship-levels/update/${spEditingId}`,
          sponsor,
        );
        toast.success("Sponsors Levels updated");
      } else {
        await axiosInstance.post("/sponsorship-levels/store", sponsor);
        toast.success("Sponsors  Levels created");
      }

      setLevelOpen(false);
      resetSponsor();
      refetch();
    } catch (error) {
      toast.error(spIsEditing ? "Update failed" : "Submission failed");
    } finally {
      setSpLoading(false);
    }
  };

  const handleDeleteLevel = async (id: number) => {
    try {
      await axiosInstance.delete(`/sponsorship-levels/${id}`);
      toast.success("Sponsorship Level deleted ");
      refetch();
    } catch (error) {}
  };

  const [csEditingId, setCsEditingId] = useState<number | null>(null);
  const [csIsEditing, setCsIsEditing] = useState<boolean>(false);
  const [csLoading, setCsLoading] = useState<boolean>(false);
  const [csOpen, setCsOpen] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<number | null>(null);

  const [cs, setCs] = useState({
    name: "",
    sponsorship_level: "",
    url: "",
  });

  const resetCs = () => {
    setCs({
      name: "",
      sponsorship_level: "",
      url: "",
    });
    setCsEditingId(null);
    setCsIsEditing(false);
  };

  const handleSponsors = async () => {
    try {
      if (!cs.name || !cs.sponsorship_level || !cs.url) {
        toast.error("All field required");
        return;
      }

      setCsLoading(true);

      if (csEditingId && csIsEditing) {
        await axiosInstance.post(
          `/corporate-sponsors/update/${csEditingId}`,
          cs,
        );
        toast.success("Corporate sponsorship updated");
      } else {
        await axiosInstance.post("/corporate-sponsors/store", cs);
        toast.success("Corporate sponsorship created");
      }

      setCsOpen(false);
      resetCs();
      refc();
    } catch (error) {
      toast.error(csIsEditing ? "Update failed" : "Submission failed");
    } finally {
      setCsLoading(false);
    }
  };

  const handleDeleteCorporate = async (id: number) => {
    try {
      await axiosInstance.delete(`/corporate-sponsors/${id}`);
      toast.success("Corporate sponsorship deleted ");
      refc();
    } catch (error) {}
  };

  const handleUploadLogo = async (id: number, file: File) => {
    try {
      setImageLoading(id);
      const formData = new FormData();
      formData.append("logo", file);

      await axiosInstance.post(
        `/corporate-sponsors/upload/logo/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Logo updated successfully");
      refc();
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setImageLoading(null);
    }
  };

  const handleDeleteLogo = async (id: number) => {
    try {
      await axiosInstance.delete(`/corporate-sponsors/delete/logo/${id}`);
      toast.success("Logo deleted ");
      refc();
    } catch (error) {}
  };

  return (
    <div className="space-y-6">
      {/* Sponsorship Levels */}
      {isLoading ? (
        <Spinner />
      ) : (
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  Sponsorship Levels ({data?.length})
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Define sponsorship tiers (e.g., Title, Gold, Silver)
                </p>
              </div>
              <Dialog open={levelOpen} onOpenChange={setLevelOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      resetSponsor();
                      setLevelOpen(true);
                    }}
                    className="rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                    data-testid="admin-add-sponsor-level-btn"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Level
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {spIsEditing ? "Edit Level" : "New Sponsorship Level"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm">Level Name</Label>
                      <Input
                        value={sponsor.name}
                        onChange={(e) =>
                          setSponsor((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="e.g., Title Sponsor"
                        className="mt-1 rounded-xl"
                        data-testid="admin-level-name"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">
                        Max Sponsors (leave empty for unlimited)
                      </Label>
                      <Input
                        type="number"
                        value={sponsor.max_sponsors}
                        onChange={(e) =>
                          setSponsor((f) => ({
                            ...f,
                            max_sponsors: e.target.value,
                          }))
                        }
                        placeholder="e.g., 1"
                        className="mt-1 rounded-xl"
                        data-testid="admin-level-max"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Display Order</Label>
                      <Input
                        type="number"
                        min="1"
                        value={sponsor.display_order}
                        onChange={(e) =>
                          setSponsor((f) => ({
                            ...f,
                            display_order: e.target.value,
                          }))
                        }
                        placeholder="1"
                        className="mt-1 rounded-xl"
                        data-testid="admin-level-order"
                      />
                    </div>
                    {spIsEditing ? (
                      <Button
                        onClick={handleLevel}
                        disabled={spLoading}
                        className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                        data-testid="admin-level-save-btn"
                      >
                        {spLoading ? "Updating.." : "Update"}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleLevel}
                        disabled={spLoading}
                        className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                        data-testid="admin-level-save-btn"
                      >
                        {spLoading ? "Creating.." : "Create"}
                      </Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-2">
              {data?.length === 0 ? (
                <p className="text-stone-400 text-center py-4">
                  No sponsorship levels yet. Add one to get started.
                </p>
              ) : (
                data?.map((l, indx) => {
                  // const sponsorCount = sponsors.filter(
                  //   (s) => s.level_id === l.id,
                  // ).length;
                  return (
                    <div
                      key={indx}
                      className="flex items-center justify-between p-3 rounded-xl bg-stone-50"
                      data-testid={`admin-level-${indx}`}
                    >
                      <div>
                        <p className="text-sm font-medium text-stone-900">
                          {l.name}
                        </p>
                        <p className="text-xs text-stone-400">
                          {/* {sponsorCount} sponsor{sponsorCount !== 1 ? "s" : ""}
                        {l.max_sponsors
                          ? ` / max ${l.max_sponsors}`
                          : " / unlimited"}
                        {" · Order: "}
                        {l.display_order} */}
                          max {l.max_sponsors} · Order: {l.display_order}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={() => {
                            setspIsEditing(true);
                            setSpEditingId(l.id);
                            setLevelOpen(true);
                            setSponsor({
                              name: l.name ?? "",
                              max_sponsors: String(l.max_sponsors ?? ""),
                              display_order: String(l.display_order ?? ""),
                            });
                          }}
                        >
                          <Pencil className="w-4 h-4 text-stone-400" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteLevel(l.id)}
                          className="rounded-full"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Corporate Sponsors */}
      {corporateLoading ? (
        <Spinner />
      ) : (
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  Sponsors ({corporate?.length})
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Manage sponsor names and logos
                </p>
              </div>
              <Dialog open={csOpen} onOpenChange={setCsOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      resetCs();
                      setCsOpen(true);
                    }}
                    //   disabled={levels.length === 0}
                    className="rounded-full bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50"
                    data-testid="admin-add-sponsor-btn"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Sponsor
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {csIsEditing ? "Edit Sponsor" : "New Sponsor"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm">Sponsor Name</Label>
                      <Input
                        value={cs.name}
                        onChange={(e) =>
                          setCs((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="Company name"
                        className="mt-1 rounded-xl"
                        data-testid="admin-sponsor-name"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Sponsorship Level</Label>
                      <Select
                        value={cs.sponsorship_level}
                        onValueChange={(v) =>
                          setCs((f) => ({ ...f, sponsorship_level: v }))
                        }
                      >
                        <SelectTrigger
                          className="mt-1 rounded-xl"
                          data-testid="admin-sponsor-level"
                        >
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.map((l, indx) => {
                            //   const count = getSponsorCount(l.id);
                            //   const full =
                            //     l.max_sponsors && count >= l.max_sponsors;
                            return (
                              <SelectItem
                                key={indx}
                                value={l.name}

                                // value={l.id}
                                // disabled={full && !editingSponsor}
                              >
                                {l.name}({l.max_sponsors || "Unlimited"})
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Website URL (optional)</Label>
                      <Input
                        value={cs.url}
                        onChange={(e) =>
                          setCs((f) => ({
                            ...f,
                            url: e.target.value,
                          }))
                        }
                        placeholder="https://..."
                        className="mt-1 rounded-xl"
                        data-testid="admin-sponsor-website"
                      />
                    </div>
                    {csIsEditing ? (
                      <Button
                        onClick={handleSponsors}
                        disabled={csLoading}
                        className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                        data-testid="admin-level-save-btn"
                      >
                        {csLoading ? "Updating.." : "Update"}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSponsors}
                        disabled={csLoading}
                        className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                        data-testid="admin-level-save-btn"
                      >
                        {csLoading ? "Creating.." : "Create"}
                      </Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {corporate?.length === 0 ? (
              <p className="text-stone-400 text-center py-4">
                Create sponsorship levels first before adding sponsors.
              </p>
            ) : (
              <div className="space-y-3">
                {corporate?.map((s, indx) => (
                  <div
                    key={indx}
                    className="flex items-center gap-4 p-4 rounded-xl bg-stone-50"
                    data-testid={`admin-sponsor-${indx}`}
                  >
                    {/* Logo */}
                    <div className="w-16 h-16 rounded-xl bg-white border border-stone-200 flex items-center justify-center overflow-hidden shrink-0">
                      {s.logo ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}${s.logo}`}
                          alt={s.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <Image className="w-6 h-6 text-stone-300" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-900">
                        {s.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="rounded-full text-xs bg-primary-100/20 text-primary-700">
                          {s.sponsorship_level}
                        </Badge>
                        {s.url && (
                          <span className="text-xs text-stone-400 truncate">
                            {s.url}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleUploadLogo(s.id, f);
                          }}
                          data-testid={`upload-input-${indx}`}
                        />
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors"
                          data-testid={`upload-logo-${indx}`}
                        >
                          {imageLoading === s.id ? (
                            <div className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4 text-stone-400" />
                          )}
                        </div>
                      </label>
                      {s.logo && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteLogo(s.id)}
                          className="rounded-full"
                          data-testid={`delete-logo-${indx}`}
                        >
                          <X className="w-4 h-4 text-stone-400" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCsIsEditing(true);
                          setCsEditingId(s.id);
                          setCsOpen(true);
                          setCs({
                            name: s.name ?? "",
                            sponsorship_level: s.sponsorship_level ?? "",
                            url: s.url ?? "",
                          });
                        }}
                        className="rounded-full"
                      >
                        <Pencil className="w-4 h-4 text-stone-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCorporate(s.id)}
                        className="rounded-full"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CorporateSponsorsAdmin;
