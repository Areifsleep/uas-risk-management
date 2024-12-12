import NavLink from "@/Components/NavLink";

const menus = [
    {
        id: 1,
        name: "Dashboard",
        alias: "dashboard",
        href: "dashboard",
    },
    {
        id: 2,
        name: "Risiko",
        alias: "risks",
        href: "risks.index",
    },
    {
        id: 3,
        name: "Identifikasi",
        alias: "identifications",
        href: "identifications.index",
    },
    {
        id: 5,
        name: "Monitoring",
        alias: "monitoring",
        href: "monitoring.index",
    },
];

const isActive = (baseRoute: string) => {
    const currentRoute = route().current()!!;
    return currentRoute && currentRoute.includes(baseRoute);
};

export const DashboardSubNavbar = () => {
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
