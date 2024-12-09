export type RisksType = {
    id: number;
    name: string;
    description: string;
    potential_disadvantages: string;
    risk_source: string;
    is_approved: boolean;
    faculties: Faculties;
    creator: Creator;
    updater: Updater;
    approver: Approver;
    likelihood: Likelihood;
    impact: Impact;
    level_risk: string;
    created_at: string;
    updated_at: string;
}[];

export interface Faculties {
    id: number;
    name: string;
    short_name: string;
}

export interface Creator {
    id: number;
    name: string;
    email: string;
}

export interface Updater {
    id: number;
    name: string;
    email: string;
}

export interface Approver {
    id: number;
    name: string;
    email: string;
}

export interface Likelihood {
    id: number;
    label: string;
    rating: number;
    description: string;
    precentage_range: string;
    created_at: string;
    updated_at: string;
}

export interface Impact {
    id: number;
    label: string;
    secondary_label: string;
    rating: number;
    created_at: string;
    updated_at: string;
}
