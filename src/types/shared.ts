
export type TMilestone = {
    id: number;
    challenge_id: number;
    distance: number;
    title: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
};

export type TChallenge = {
    id: number;
    name: string;
    total_distance: number;
    description: string;
    distance: number;
    is_active: boolean;
    send_postcard: number; // could also be boolean if you normalize (0/1 → false/true)
    route_map: string;
    created_at: string; // ISO datetime
    updated_at: string; // ISO datetime
    milestones: TMilestone[];
};

export type TRegistration = {
    id: number;
    name: string;
    cost: number;
    display_order: number;
    created_at: string;
    updated_at: string;
}

export type TActivity = {
    id: string;
    km: number;
    steps: number;
    date: string;
};

export type TAchievement = {
    id: number;
    amount: number;
    achievement: string;
    swag: string;
    display_order: number;
    created_at: string;
    updated_at: string;
};

export type TProgress = {
    total_distance: string; // string from API
    percentage: number; // high precision float
    next_milestone: {
        id: number;
        challenge_id: number;
        distance: number;
        title: string;
        description: string;
        image: string | null;
        created_at: string;
        updated_at: string;
    };
    remaining_distance: number; // high precision float
};