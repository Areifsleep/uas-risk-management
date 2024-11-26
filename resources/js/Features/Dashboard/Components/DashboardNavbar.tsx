import ApplicationLogo from "@/Components/ApplicationLogo";
import { UserButton } from "@/Features/Auth/Components/UserButton";

export const DashboardNavbar = () => {
    return (
        <header className="bg-muted fixed w-full top-0">
            <div className="container px-5 w-full flex justify-between py-5 items-center">
                <ApplicationLogo />
                <div className="flex items-center">
                    <div className="flex items-center">
                        <UserButton />
                    </div>
                </div>
            </div>
        </header>
    );
};
