import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { postApi } from "@/lib/apiHandler";
import { TTeam } from "@/types/team";
import { Copy, Plus, Send, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Invite = {
  name: string;
  email: string;
};

function fallbackCopy(text: string) {
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
}

function copyToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Link copied!"))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

export default function InviteSection({
  inviteUrl,
  isLeader,
  teamId
}: {
  inviteUrl: string;
  isLeader: boolean;
  teamId?: number | null;
}) {
  const [newInvites, setNewInvites] = useState<Invite[]>([
    { name: "", email: "" },
  ]);

  const [sendingInvites, setSendingInvites] = useState<boolean>(false);

  const copyInvite = () => {
    if (inviteUrl) {
      const url = `${window.location.origin}/join-team/${inviteUrl}`;
      copyToClipboard(url);
    }
  };

  const handleSendInvites = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = newInvites.filter((i) => i.name.trim() && i.email.trim());
    if (valid.length === 0) {
      toast.error("Please add at least one name and email");
      return;
    }
    setSendingInvites(true);
    try {
      if (isLeader) {
        await postApi("/invite/teams", {members: newInvites});
      } else {
        await postApi(`/invite/teams/member/${teamId}`,{members: newInvites})
      }
      toast.success(`Invites sent!`);
      setNewInvites([{ name: "", email: "" }]);
    } catch {
      toast.error("Failed to send invites");
    } finally {
      setSendingInvites(false);
    }
  };

  return (
    <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <CardContent className="p-6">
        <div className="text-center mb-5">
          <UserPlus className="w-8 h-8 text-primary-100 mx-auto mb-2" />
          <h3 className="text-base font-bold text-stone-900">
            Invite friends, family and colleagues to join your Team
          </h3>
        </div>

        {/* Copy invite link */}
        <div className="flex gap-2 mb-5 max-w-md mx-auto">
          <Input
            readOnly
            value={
              inviteUrl
                ? `${window.location.origin}/join-team/${inviteUrl}`
                : ""
            }
            className="rounded-xl bg-stone-50 border-stone-200 text-xs h-10 text-stone-600"
            data-testid="team-invite-link"
          />
          <Button
            onClick={copyInvite}
            className="rounded-xl bg-primary-500 hover:bg-primary-600 text-white shrink-0"
            data-testid="team-copy-invite-btn"
          >
            <Copy className="w-4 h-4 mr-1" /> Copy
          </Button>
        </div>

        {/* Invite Teammates by Email */}
        <form
          className="border-t border-stone-100 pt-5"
          onSubmit={handleSendInvites}
        >
          <h4 className="text-sm font-bold text-stone-900 mb-3">
            Invite Teammates
          </h4>
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
                  className="rounded-xl border-stone-200 bg-stone-50 h-12 flex-1"
                  data-testid={`team-invite-name-${i}`}
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
                  className="rounded-xl border-stone-200 bg-stone-50 h-12 flex-1"
                  data-testid={`team-invite-email-${i}`}
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
              className="rounded-xl border-stone-200 text-stone-600"
              data-testid="team-add-invite-row"
            >
              <Plus className="w-4 h-4 mr-1" /> Add More
            </Button>
            <Button
              disabled={sendingInvites}
              className="rounded-xl bg-primary-500 hover:bg-primary-600 text-white"
              data-testid="team-send-invites"
            >
              <Send className="w-4 h-4 mr-1" />{" "}
              {sendingInvites ? "Sending..." : "Send Invites"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
