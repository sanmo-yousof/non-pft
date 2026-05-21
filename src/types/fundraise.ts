import { TAchievements, TUsers } from "./admin";
import { TChallenge, TMilestone } from "./shared";

export type TFunraiseRegustration = {
  id: number;
  user_id: number;
  challenge_id: number;
  team_id?: number | null;
  registration_level_id: number;
  created_at: string;
  updated_at: string;
  user: TUsers;
  challenge: TChallenge;
};

export type TFundraiseTeam = {
  id: number;
  owner_id: number;
  name: string;
}

export type TFundraiseSupporter = {
  id: number;
  supporter_id: number;
  walker_id: number;
  registration_id: number;
  type: string;
  amount: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type TFunraise = {
  registration: TFunraiseRegustration;
  team?: TFundraiseTeam | null;
  totalDistance: number;
  totalSteps: number;
  raised: number;
  challenge: TChallenge;
  distancePercentage: number;
  remainingDistance: number;
  milestone: TMilestone[];
  currentAchievement?: TAchievements | null;
  supporters?: TFundraiseSupporter[] | [];
};
