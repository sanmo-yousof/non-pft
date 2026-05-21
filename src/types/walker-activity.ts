export interface TWalkerActivity {
  id: string;
  date: string;
  steps?: number;
  km?: number;
}

export interface TWalkerFitnessStatus {
  configured: boolean;
}