import { PropsWithChildren } from "react";

import { DashboardNavbar } from "@/Features/Dashboard/Components/DashboardNavbar";
import { DashboardSubNavbar } from "@/Features/Dashboard/Components/DashboardSubNavbar";

interface DashboardLayoutProps extends PropsWithChildren {}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <DashboardNavbar />
      <DashboardSubNavbar />
      <div className="container pt-24 px-5 min-h-screen">{children}</div>
      <footer className="border-t mt-5">
        <div className="py-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear().toString()}. by Masako team, All rights reserved.
        </div>
      </footer>
    </>
  );
};
