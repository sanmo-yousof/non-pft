"use client";

import { format } from "date-fns";
import { useState } from "react";
import { CalendarIcon, Footprints, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { postApi } from "@/lib/apiHandler";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hook/useAuth";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function ActivityForm({ challangeId }: { challangeId: number }) {
  const queryClient = useQueryClient();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"steps" | "km">("steps");
  const [steps, setSteps] = useState("");
  const [km, setKm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "steps" && (!steps || parseInt(steps) <= 0)) {
      toast.error("Enter a valid step count");
      return;
    }
    if (mode === "km" && (!km || parseFloat(km) <= 0)) {
      toast.error("Enter a valid distance");
      return;
    }
    if (user?.is_onbording === false) {
      setOpenDialog(true);
      return;
    }
    setSubmitting(true);
    try {
      await postApi(`/walker/activity/store/${challangeId}`, {
        ...(mode === "steps"
          ? { steps: parseInt(steps) }
          : { distance: parseFloat(km) }),
        date: format(date, "yyyy-MM-dd HH:mm:ss"),
      });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      toast.success("Activity logged!");
      setSteps("");
      setKm("");
    } catch (err: unknown) {
      toast.error(
        (err as { response?: { data?: { detail?: string } } }).response?.data
          ?.detail || "Failed to log activity",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-stone-900 mb-4">Log Your Activity</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-stone-700 text-sm font-medium">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mt-1 justify-start text-left font-normal rounded-xl border-stone-200 h-12"
                  data-testid="activity-date-picker"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-stone-400" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="text-stone-700 text-sm font-medium">
              Input Mode
            </Label>
            <div className="flex gap-2 mt-1">
              <Button
                type="button"
                variant={mode === "steps" ? "default" : "outline"}
                onClick={() => setMode("steps")}
                className={`flex-1 rounded-xl ${mode === "steps" ? "bg-primary-500 hover:bg-primary-600 text-white" : "border-stone-200 text-stone-600"}`}
                data-testid="activity-mode-steps"
              >
                <Footprints className="w-4 h-4 mr-1" /> Steps
              </Button>
              <Button
                type="button"
                variant={mode === "km" ? "default" : "outline"}
                onClick={() => setMode("km")}
                className={`flex-1 rounded-xl ${mode === "km" ? "bg-primary-500 hover:bg-primary-600 text-white" : "border-stone-200 text-stone-600"}`}
                data-testid="activity-mode-km"
              >
                <MapPin className="w-4 h-4 mr-1" /> Kilometers
              </Button>
            </div>
          </div>

          {mode === "steps" ? (
            <div>
              <Label className="text-stone-700 text-sm font-medium">
                Steps
              </Label>
              <Input
                type="number"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="e.g. 10000"
                className="mt-1 rounded-xl border-stone-200 bg-stone-50 focus:bg-white h-12"
                data-testid="activity-steps-input"
              />
            </div>
          ) : (
            <div>
              <Label className="text-stone-700 text-sm font-medium">
                Kilometers
              </Label>
              <Input
                type="number"
                step="0.01"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                placeholder="e.g. 5.5"
                className="mt-1 rounded-xl border-stone-200 bg-stone-50 focus:bg-white h-12"
                data-testid="activity-km-input"
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={submitting}
            data-testid="activity-submit-btn"
            className="w-full rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-5 h-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            {submitting ? "Logging..." : "Log Activity"}
          </Button>
        </form>
      </CardContent>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
   <DialogContent className="sm:max-w-md rounded-2xl">
      <DialogHeader>
         <DialogTitle>
            Complete Onboarding
         </DialogTitle>

         <DialogDescription className="py-6">
            Please complete onboarding before logging activities.
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

         <Button
            className="rounded-full bg-primary-500 hover:bg-primary-600"
            onClick={() => {
               setOpenDialog(false);
               router.push("/onboarding")
            }}
         >
            Complete Now
         </Button>
      </DialogFooter>
   </DialogContent>
</Dialog>
    </Card>
  );
}
