import { PropsWithChildren } from "react";

import { DashboardNavbar } from "@/Feature/Dashboard/Components/DashboardNavbar";

interface DashboardLayoutProps extends PropsWithChildren {}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="bg-muted w-full min-h-screen">
            <div className="max-w-screen-xl mx-auto">
                <DashboardNavbar />
                {children}
                <footer className="border-t mt-10">
                    <div className="py-4 text-center text-xs text-gray-500">
                        &copy; {new Date().getFullYear().toString()}. by Masako
                        team, All rights reserved.
                    </div>
                </footer>
            </div>
        </div>
    );
};
