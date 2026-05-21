import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postApi } from "@/lib/apiHandler";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Users } from 'lucide-react';
import { useState } from "react";
import { toast } from "sonner";

export default function CreateTeam() {
    const queryClient = useQueryClient();
    const [creating, setCreating] = useState<boolean>(false);
    const [form, setForm] = useState<{ name: string; tagline: string }>({
        name: "",
        tagline: "",
    });
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            toast.error("Team name required");
            return;
        }
        setCreating(true);
        try {
            await postApi("/teams/store", form);
            toast.success("Team created!");
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        } catch (err: unknown) {
            toast.error((err as { response?: { data?: { detail?: string } } }).response?.data?.detail || "Failed to create team");
        } finally {
            setCreating(false);
        }
    };
    return (
        <div className="max-w-lg mx-auto" data-testid="create-team-section">
            <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <CardContent className="p-8 text-center">
                    <Users className="w-12 h-12 text-primary-50/50 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-stone-900 mb-2">Create a Team</h2>
                    <p className="text-stone-500 mb-6">Walk together and raise more. Create a team and invite friends to join your challenge.</p>
                    <form onSubmit={handleCreate} className="space-y-4 text-left">
                        <div>
                            <Label className="text-stone-700 text-sm font-medium">Team Name</Label>
                            <Input
                                value={form.name}
                                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                                placeholder="e.g. KEF Trailblazers"
                                required
                                className="mt-1 rounded-xl border-stone-200 bg-stone-50 h-12"
                                data-testid="team-name-input"
                            />
                        </div>
                        <div>
                            <Label className="text-stone-700 text-sm font-medium">Description</Label>
                            <Textarea
                                value={form.tagline}
                                onChange={(e) => setForm(f => ({ ...f, tagline: e.target.value }))}
                                placeholder="Tell others about your team..."
                                className="mt-1 rounded-xl border-stone-200 bg-stone-50"
                                data-testid="team-desc-input"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={creating}
                            className="rounded-full flex bg-primary-500 hover:bg-primary-600 text-white font-medium py-5 h-auto px-10 mx-auto"
                            data-testid="team-create-btn"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            {creating ? 'Creating...' : 'Create Team'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
