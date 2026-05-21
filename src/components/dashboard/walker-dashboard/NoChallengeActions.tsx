"use client";

import { Card, CardContent } from "@/components/ui/card";
import useAuth from "@/hook/useAuth";
import { Heart, Share2, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { TTeam } from "@/types/team";

type TNoChallengeActionsProps = {
  team: null | TTeam;
}

export default function NoChallengeActions({ team }: TNoChallengeActionsProps) {
  const { user } = useAuth();

  function fallbackCopy(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      toast.success('Link copied!');
    } catch {
      toast.error('Failed to copy. Please copy manually: ' + text);
    }
    document.body.removeChild(textarea);
  }

  function copyToClipboard(text: string) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        toast.success('Link copied!');
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  const copyFundraiseLink = () => {
    const url = `${window.location.origin}/fundraise/${user?.registrations?.id}`;
    copyToClipboard(url);
  };

  if (!user) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Link href="/walker-activity" className="block">
        <Card className="py-0 bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer h-full">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="font-bold text-stone-900 text-sm">Log Activity</p>
              <p className="text-xs text-stone-500">Add today&apos;s steps or km</p>
            </div>
          </CardContent>
        </Card>
      </Link>

      <button onClick={copyFundraiseLink} className="block w-full text-left">
        <Card className="py-0 bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer h-full">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-stone-900 text-sm">Share Fundraising Page</p>
              <p className="text-xs text-stone-500">Copy your supporter link</p>
            </div>
          </CardContent>
        </Card>
      </button>

      <Link href="/walker-team" className="block">
        <Card className="py-0 bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer h-full">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="font-bold text-stone-900 text-sm">Your Team</p>
              <p className="text-xs text-stone-500">{team ? team.name : 'Create or join a team'}</p>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/walker-support" className="block">
        <Card className="py-0 bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer h-full">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="font-bold text-stone-900 text-sm">Your Supporters</p>
              <p className="text-xs text-stone-500">Review and invite supporters</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
