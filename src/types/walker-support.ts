export interface TSponsor {
    id: string;
    name: string;
    amount?: number;
    message?: string;
}

export interface TNewInvite {
    name: string;
    email: string;
}

export type TInvite = {
    id: string;
    name: string;
    email: string;
}