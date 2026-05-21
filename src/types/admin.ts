export type TChallagesStats = {
  challenge: string;
  status: string;
  walkers: number;
  teams: number;
  pledged: number;
};

export type TStatics = {
  totalWalkers: number;
  totalTeams: number;
  totalDistance: string;
  totalSteps: string;
  totalPledged: string;
  totalSponsors: number;
  challengeStats: TChallagesStats[];
};

export type TMilestones = {
  id: number;
  challenge_id: number;
  distance: number;
  title: string;
  description: string;
  image?: string | null;
  created_at: string;
  updated_at: string;
};

export type TSingleChallange = {
  id: number;
  name: string;
  description: string;
  distance: number;
  is_active: boolean;
  send_postcard: boolean;
  route_map?: string | null;
  created_at: string;
  updated_at: string;
  milestones_count: number;
  milestones: TMilestones[];
};

export type TChallenges = {
  total: number;
  active: number;
  inactive: number;
  challenges: TSingleChallange[];
};

export type TRegistrationLevels = {
  id: number;
  name: string;
  cost: number;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type TAchievements = {
  id: number;
  amount: number;
  achievement: string;
  swag: string;
  display_order: number;
  created_at: string;
  updated_at: string;
};


export type TConfig = {
  id: number;
  name: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  steps: string;
  created_at: string;
  updated_at: string;
};

export type TUsers = {
  id: number;
  full_name: string;
  display_name: string;
  email: string;
  role: string;
  payment_status: string;
};

export type TSponsors = {
  name: string;
  max_sponsors: number;
  display_order: number;
  updated_at: string;
  created_at: string;
  id: 1;
};

export type TCorporate = {
  id: number;
  name: string;
  sponsorship_level: string;
  url: string;
  logo?: string | null;
};



export type TUserTeams = {
  team: {
    id: number;
    owner_id: number;
    name: string;
    tagline: string;
  }[];

  user: {
    id: number;
    full_name: string;
    display_name: string;
  }[];
};