import { Users } from "./users";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
        roles: string[];
    };
};

export type Auth = {
    user: User;
    roles: string[];
};

export type UserPageProps = PageProps<{
    users: Users;
}>;
