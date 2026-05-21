import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useAuth from "@/hook/useAuth";
import { postApi } from "@/lib/apiHandler";
import { formatNumber } from "@/lib/formatNumber";
import { TUser } from "@/types/auth";
import { TNewInvite } from "@/types/walker-support";
import { useQueryClient } from "@tanstack/react-query";
import { Copy, Heart, Send, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const copyToClipboard = (text: string): void => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Link copied!"))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
};

const fallbackCopy = (text: string): void => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
    toast.success("Link copied!");
  } catch {
    toast.error("Copy manually: " + text);
  }

  document.body.removeChild(textarea);
};

type WalkerInviteProps = {
  raised: number;
  totalSupporter: number;
  challenge?: number | null;
};

export default function WalkerInvite({
  raised,
  totalSupporter,
  challenge,
}: WalkerInviteProps) {
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [newInvites, setNewInvites] = useState<TNewInvite[]>([
    { name: "", email: "" },
  ]);
  const { user: authuser } = useAuth();
  const fundraiseUrl: string = `${window.location.origin}/fundraise/${authuser?.registrations?.id}`;

  const handleInvite = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const valid = newInvites.filter((i) => i.name.trim() && i.email.trim());

    if (valid.length === 0) {
      toast.error("Please add at least one supporter name and email");
      return;
    }

    setSubmitting(true);

    try {
      await postApi("/invite/supporters", {
        members: valid,
      });

      toast.success(`Members invited!`);

      queryClient.invalidateQueries({ queryKey: ["supports"] });

      setNewInvites([{ name: "", email: "" }]);
      // loadData();
    } catch {
      toast.error("Failed to send invites");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Fundraising Link */}
      <Card className="bg-stone-900 rounded-2xl border-none">
        <CardContent className="p-5">
          <Heart className="w-8 h-8 text-primary-400 mx-auto mb-2" />
          <p className="text-white text-sm font-bold text-center mb-1">
            Your Fundraising Page
          </p>
          <p className="text-stone-400 text-xs text-center mb-3">
            Share this link with supporters
          </p>
          {!challenge ? (
            <p className="text-xs text-amber-500 text-center mb-3">
              * Your invite link will be generated after completing onboarding.
            </p>
          ) : (
            <div className="flex gap-2">
              <Input
                readOnly
                value={fundraiseUrl}
                className="rounded-xl bg-stone-800 border-stone-700 text-stone-300 text-xs h-10 flex-1"
                data-testid="supporters-fundraise-link"
              />
              <Button
                onClick={() => copyToClipboard(fundraiseUrl)}
                className="rounded-xl bg-primary-500 hover:bg-primary-600 text-white shrink-0"
                data-testid="supporters-copy-link-btn"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invite Form */}
      <form onSubmit={handleInvite}>
        <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <CardContent className="p-5">
            <h3 className="text-base font-bold text-stone-900 mb-3">
              Invite Supporters
            </h3>
            <div className="space-y-2 mb-4">
              {newInvites.map((inv, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={inv.name}
                    onChange={(e) => {
                      const copy = [...newInvites];
                      copy[i].name = e.target.value;
                      setNewInvites(copy);
                    }}
                    placeholder="Name"
                    className="rounded-xl border-stone-200 bg-stone-50 h-10 flex-1"
                    data-testid={`invite-name-${i}`}
                  />
                  <Input
                    type="email"
                    value={inv.email}
                    onChange={(e) => {
                      const copy = [...newInvites];
                      copy[i].email = e.target.value;
                      setNewInvites(copy);
                    }}
                    placeholder="Email"
                    className="rounded-xl border-stone-200 bg-stone-50 h-10 flex-1"
                    data-testid={`invite-email-${i}`}
                  />
                  {newInvites.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setNewInvites(newInvites.filter((_, j) => j !== i))
                      }
                      className="text-stone-300 hover:text-red-500 shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setNewInvites([...newInvites, { name: "", email: "" }])
                }
                className="rounded-xl border-stone-200 text-stone-600 flex-1"
                data-testid="add-invite-row-btn"
              >
                <UserPlus className="w-4 h-4 mr-1" /> Add More
              </Button>
              <Button
                // onClick={handleInvite}
                disabled={submitting}
                className="rounded-xl bg-primary-500 hover:bg-primary-600 text-white flex-1"
                data-testid="send-invites-btn"
              >
                <Send className="w-4 h-4 mr-1" />{" "}
                {submitting ? "Sending..." : "Invite"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-stone-900">
              {formatNumber(totalSupporter)}
            </p>
            <p className="text-xs text-stone-400">Supporters</p>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-2xl border border-stone-100">
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-emerald-600">
              ${formatNumber(raised)}
            </p>
            <p className="text-xs text-stone-400">Raised</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
