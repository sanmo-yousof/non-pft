import Link from "next/link";
import React from "react";

type LeaderRowProps = {
  rank: number;
  name: string;
  value: string;
  unit?: string | "";
  userId?: string | number;
  member?: string | "";
};

const getMedal = (i: number): string | number => {
  if (i === 0) return "🥇";
  if (i === 1) return "🥈";
  if (i === 2) return "🥉";
  return i + 1;
};

const LeaderRow = ({
  rank,
  name,
  value,
  unit,
  userId,
  member,
}: LeaderRowProps) => {
  const content = (
    <div
      className={`flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors ${userId ? "cursor-pointer" : ""}`}
      data-testid={`leader-row-${rank}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
            rank < 3
              ? "bg-primary/20 text-primary"
              : "bg-stone-200 text-stone-600"
          }`}
        >
          {rank < 3 ? getMedal(rank) : rank + 1}
        </div>
        <div>
          <p
            className={`text-sm font-medium ${userId ? "text-primary hover:underline" : "text-stone-900"}`}
          >
            {name}
          </p>
          {member && <p className="text-xs text-stone-400">{member}</p>}
        </div>
      </div>
      <p className="text-sm font-bold text-stone-900">
        {value} {unit}
      </p>
    </div>
  );
  if (userId) {
    return (
      <Link href={`/fundraise/${userId}`} data-testid={`leader-link-${userId}`}>
        {content}
      </Link>
    );
  }
  return content;
};

export default LeaderRow;
