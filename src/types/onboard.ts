import { TAchievement, TChallenge, TRegistration } from "./shared";
import { TTeam } from "./team";

export type TOnboardingResponse = {
    challenges: TChallenge[];
    registrationLevels: TRegistration[];
    archievementLevels: TAchievement[];
    teams: TTeam[];
    inviteLink?: {
        id: number;
        slug: string;
    };
};