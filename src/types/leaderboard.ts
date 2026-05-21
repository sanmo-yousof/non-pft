export type TRegistration = {
  id:number;
  user_id:number;
}

export type TDistance = {
  id: number;
  full_name: string;
  display_name: string;
  total_distance: string;
  registrations?: TRegistration | null;
};

export type TRaised = {
  id: number;
  full_name: string;
  display_name: string;
  total_amount: string;
  registrations?: TRegistration | null;
};

export type TTeamsDistance = {
  id: number;
  name: string;
  total_distance: string;
  team_members_count: number;
};
export type TTeamsFundraising = {
  id: number;
  name: string;
  total_raised: string;
  team_members_count: number;
};

export type TLeaderBoard = {
  distance: TDistance[];
  raised: TRaised[];
  teamsDistance: TTeamsDistance[];
  teamsFundraising: TTeamsFundraising[];
};
