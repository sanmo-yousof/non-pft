export type TPledge = {
  id: number;
  walker_name: string;

  pledge_type: "per_km" | "fixed";
  pledge_per_km?: number;
  pledge_total?: number;

  calculated_amount?: number;

  walker_total_km?: number;
  walker_progress_pct?: number;

  status: "active" | "completed" | "cancelled";
  created_at: string;

  walker?: {
    display_name: string;
    full_name: string;
  };

  challenge?: {
    name: string;
    total_distance_km: number;
  };
};