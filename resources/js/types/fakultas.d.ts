export type FakultasWithCreatedBy = Root2[];

export interface Root2 {
    id: number;
    created_by: CreatedBy;
    name: string;
    short_name: string;
    created_at: string;
    updated_at: string;
}

export interface CreatedBy {
    id: number;
    name: string;
    email: string;
    email_verified_at: any;
    created_at: string;
    updated_at: string;
}
