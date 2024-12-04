import { PropsWithChildren } from "react";

import NavLink from "@/Components/NavLink";

import { DashboardNavbar } from "@/Features/Dashboard/Components/DashboardNavbar";

interface DashboardLayoutProps extends PropsWithChildren {}

export const AdminLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <>
            <DashboardNavbar />
            <AdminSubNavbar />
            <div className="container pt-24 px-5 min-h-screen">
                {children}
            </div>{" "}
            <footer className="border-t mt-10">
                <div className="py-4 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear().toString()}. by Masako
                    team, All rights reserved.
                </div>
            </footer>
        </>
    );
};

const menus = [
    {
        id: 1,
        name: "User Manajemen",
        alias: "users",
        href: "users.index",
    },
    {
        id: 2,
        name: "Fakultas Manajemen",
        alias: "fakultas",
        href: "fakultas.index",
    },
];

const isActive = (baseRoute: string) => {
    const currentRoute = route().current()!!;
    return currentRoute && currentRoute.includes(baseRoute);
};

const AdminSubNavbar = () => {
    return (
        <div className="container sticky top-[80px] pt-3.5 pb-2 bg-white z-50">
            <div className="flex justify-between border-b border-gray-200">
                <div className="flex">
                    {menus.map((menu) => (
                        <NavLink
                            key={menu.id}
                            href={route(menu.href as string)}
                            active={isActive(menu.alias)}
                        >
                            {menu.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};
