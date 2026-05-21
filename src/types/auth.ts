export type TUser = {
  id: number;
  full_name: string;
  display_name: string;
  role: Role;
  challenge_id?: string | null;
  email?: string | null;
  profile_picture_url?: string | null;
  paid?: boolean;
  google_fit_connected?: boolean;
  google_fit_email?: string;
  is_onbording?: boolean;
  image?: string | null;
  registrations?: {
    id: number;
    challenge_id?: number | null;
  } | null;
};

export type Role = "walker" | "supporter" | "admin";
