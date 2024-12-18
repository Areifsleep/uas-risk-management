export interface RiskById {
    id: number;
    name: string;
    description: string;
    potential_disadvantages: string;
    risk_source: "external"|"internal";
    level_risk: string;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
    faculties_id: number;
    created_by: number;
    updated_by: number;
    approved_by: number;
    likelihood_id: number;
    impact_id: number;
    creator: Creator;
    updater: Updater;
    approver: Approver;
    faculty: Faculty;
    likelihood: Likelihood;
    impact: Impact;
}

export interface Creator {
    id: number;
    name: string;
    email: string;
    email_verified_at: any;
    created_at: string;
    updated_at: string;
}

export interface Updater {
    id: number;
    name: string;
    email: string;
    email_verified_at: any;
    created_at: string;
    updated_at: string;
}

export interface Approver {
    id: number;
    name: string;
    email: string;
    email_verified_at: any;
    created_at: string;
    updated_at: string;
}

export interface Faculty {
    id: number;
    created_by: number;
    name: string;
    short_name: string;
    created_at: string;
    updated_at: string;
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
