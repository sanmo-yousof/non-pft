import React from "react";
import { Badge } from "../ui/badge";
import { Users } from "lucide-react";
import { TUsers } from "@/types/admin";
import { TFundraiseTeam } from "@/types/fundraise";

const Banner = ({
  user,
  team,
}: {
  user: TUsers;
  team?: TFundraiseTeam | null;
}) => {
  return (
    <div className="bg-stone-900 py-10 md:py-14">
      <div className="container-app text-center">
        <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold uppercase text-white">
            {user.display_name[0]}
          </span>
        </div>
        <h1
          className="text-2xl md:text-3xl font-bold text-white mb-1"
          data-testid="walker-name-header"
        >
          {user.full_name}{" "}
          <span className="text-primary-300">"{user.display_name}"</span>
        </h1>
        <p className="text-stone-400 text-sm">
          is walking for Kenya Education Fund
        </p>

        {team && (
          <Badge className="mt-3 bg-white/10 text-white rounded-full border-none">
            <Users className="w-3 h-3 mr-1" /> {team?.name}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default Banner;
