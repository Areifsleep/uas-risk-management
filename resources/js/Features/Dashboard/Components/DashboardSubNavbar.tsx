import NavLink from "@/Components/NavLink";

const menus = [
    {
        id: 1,
        name: "Dashboard",
        href: "dashboard",
    },
    {
        id: 2,
        name: "Risiko",
        href: "risks.index",
    },
    {
        id: 3,
        name: "Identifikasi",
        href: "identifications.index",
    },
    {
        id: 4,
        name: "Mitigasi",
        href: "mitigations.index",
    },
    {
        id: 5,
        name: "Monitoring",
        href: "monitoring.index",
    },
];

export const DashboardSubNavbar = () => {
    return (
        <div className="container sticky top-[80px] pt-3.5 pb-2 bg-white">
            <div className="flex justify-between border-b border-gray-200">
                <div className="flex">
                    {menus.map((menu) => (
                        <NavLink
                            key={menu.id}
                            href={route(menu.href as string)}
                            active={route().current(menu.href as string)}
                        >
                            {menu.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};
