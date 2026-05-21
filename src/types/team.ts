import { TUser } from "./auth";

export type TTeam = {
  id: number;
  owner_id: number;
  owner: TUser;
  name: string;
  tagline: string;
  team_members_count: number;
  invite_url: string;
  created_at: string;
  updated_at: string;
};

export type TTeamMember = {
  id: number;
  team_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: TUser;
};
