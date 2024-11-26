import { useState } from "react";

const menus = [
    {
        id: 1,
        name: "Dashboard",
    },
    {
        id: 2,
        name: "Identifikasi",
    },
    {
        id: 3,
        name: "Mitigasi",
    },
    {
        id: 4,
        name: "Monitoring",
    },
];

export const DashboardSubNavbar = () => {
    const [activeTab, setActiveTab] = useState("Dashboard");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <div className="container sticky top-[80px] pt-3.5 pb-2 bg-white">
            <div className="flex justify-between border-b border-gray-200">
                <div className="flex">
                    {menus.map((menu) => (
                        <div
                            key={menu.id}
                            className={`px-4 py-2 cursor-pointer ${
                                activeTab === menu.name
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-500 hover:text-gray-800"
                            }`}
                            onClick={() => handleTabClick(menu.name)}
                        >
                            {menu.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
