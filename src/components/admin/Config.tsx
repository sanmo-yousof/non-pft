"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAdminConfig } from "@/hook/useAdminConfig";
import { postApi } from "@/lib/apiHandler";
import { toast } from "sonner";

const Config = () => {
  const { data, isLoading, refetch } = useAdminConfig();

  const [form, setForm] = useState({
    name: "",
    // logo_url: "",
    primary_color: "",
    secondary_color: "",
    steps: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        // logo_url: data.logo_url || "",
        primary_color: data.primary_color || "",
        secondary_color: data.secondary_color || "",
        steps: data.steps || "",
      });
    }
  }, [data]);

  const handleSave = async () => {
    try {
      setSaving(true);

      await postApi("/settings/update", {
        ...form,
      });
      toast.success("config save successfull");
      await refetch();
    } catch (err) {
      console.error("Failed to save config:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="bg-white rounded-2xl border border-stone-100 max-w-lg">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-stone-900 mb-4">
          App Configuration
        </h3>

        <div className="space-y-3">
          <div>
            <Label className="text-sm">App Name</Label>
            <Input
              value={form.name}
              placeholder="App Name"
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 rounded-xl"
            />
          </div>

          {/* <div>
            <Label className="text-sm">Logo URL</Label>
            <Input
              value={form.logo_url}
              placeholder="https://example.com"
              onChange={(e) =>
                setForm((f) => ({ ...f, logo_url: e.target.value }))
              }
              className="mt-1 rounded-xl"
            />
          </div> */}

          <div>
            <Label className="text-sm">Primary Color</Label>
            <Input
              placeholder="#000000"
              value={form.primary_color}
              onChange={(e) =>
                setForm((f) => ({ ...f, primary_color: e.target.value }))
              }
              className="mt-1 rounded-xl"
            />
          </div>

          <div>
            <Label className="text-sm">Secondary Color</Label>
            <Input
              value={form.secondary_color}
              placeholder="#000000"
              onChange={(e) =>
                setForm((f) => ({ ...f, secondary_color: e.target.value }))
              }
              className="mt-1 rounded-xl"
            />
          </div>

          <div>
            <Label className="text-sm">Steps per Kilometer</Label>
            <Input
              type="number"
              min={1100}
              placeholder="4000"
              max={1600}
              value={form.steps}
              onChange={(e) =>
                setForm((f) => ({ ...f, steps: e.target.value }))
              }
              className="mt-1 rounded-xl"
            />
            <p className="text-[10px] text-stone-400 mt-1">
              Used to convert steps to km when logging activity (min 1100, max
              1600)
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-primary-600 hover:bg-primary-700 text-white"
          >
            {saving ? "Saving..." : "Save Config"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Config;
