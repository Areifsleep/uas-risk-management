import { usePage } from "@inertiajs/react";

export const hasRole = (role: string): boolean => {
    return usePage().props.auth.roles.includes(role);
};
