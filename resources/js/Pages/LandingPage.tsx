import { Head, Link } from "@inertiajs/react";
import { FaGithub } from "react-icons/fa6";

import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";

const anggotaKelompok = [
    {
        name: "Arif Rahman",
        nim: "23106050050",
        university: "UIN Sunan Kalijaga",
        image: "https://randomuser.me/api/portraits/lego/7.jpg",
    },
    {
        name: "Ahmad Zidni Hidayat",
        nim: "23106050077",
        university: "UIN Sunan Kalijaga",
        image: "https://randomuser.me/api/portraits/lego/7.jpg",
    },
    {
        name: "Rozin Gunagraha",
        nim: "23106050084",
        university: "UIN Sunan Kalijaga",
        image: "https://randomuser.me/api/portraits/lego/7.jpg",
    },
    {
        name: "Syafiq Rustiawanto",
        nim: "23106050094",
        university: "UIN Sunan Kalijaga",
        image: "https://randomuser.me/api/portraits/lego/7.jpg",
    },
];

export default function LandingPage({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="EduRisk" />
            <header className="h-14 w-full sticky top-0 z-50 flex items-center bg-background">
                <div className="px-2 xl:px-0 max-w-[1400px] w-full mx-auto flex justify-between items-center">
                    <div className="flex gap-x-2">
                        <img
                            className="size-6"
                            src="app-logo.svg"
                            alt="app-logo"
                        />
                        <Link href="/">
                            <span className="font-bold text-xl">EduRisk</span>
                        </Link>
                    </div>
                    <div className="flex gap-x-5 text-sm md:text-md">
                        <nav>
                            <a
                                href="#"
                                className="relative leading-relaxed w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                            >
                                Idea
                            </a>
                        </nav>

                        <nav>
                            <a
                                href="#contributors"
                                className="relative leading-relaxed w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                            >
                                Contributors
                            </a>
                        </nav>
                        <nav>
                            <a
                                href="#"
                                className="relative leading-relaxed w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                            >
                                About project
                            </a>
                        </nav>
                    </div>
                    <div>
                        <Button asChild>
                            <a
                                target="_blank"
                                href="https://github.com/Areifsleep/uas-risk-management"
                            >
                                <FaGithub className="size-6" />
                                <span className="hidden md:block">Github</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="w-full h-full min-h-screen flex flex-col gap-y-10">
                <div className="bg-muted w-full  space-y-10 ">
                    <div className="max-w-[1400px] mx-auto flex justify-center items-center">
                        <div className="max-w-[768px] text-center py-32">
                            <h1 className="text-6xl font-extrabold leading-tight">
                                Risk Management Simplified for Your Campus
                                Success
                            </h1>
                            <div className="max-w-md mx-auto">
                                <p className="text-sm text-muted-foreground">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Quisquam, provident omnis
                                    assumenda, veniam sint quod iusto voluptates
                                    magnam dolorum, eaque aliquid.
                                </p>
                            </div>
                            <div className="my-5">
                                {!auth.user ? (
                                    <Button asChild>
                                        <Link href={route("login")}>
                                            Login in this Application
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button asChild>
                                        <Link href={route("dashboard")}>
                                            Go to Dashboard
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contributors">
                    <h2 className="text-center text-4xl font-bold">
                        Contributors
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-4 my-10 max-w-[1400px] mx-auto">
                        {anggotaKelompok.map((anggota) => (
                            <div className="space-y-2">
                                <img
                                    className="size-64 mx-auto rounded-full aspect-square border-2 border-primary"
                                    src="https://asset.kompas.com/crops/ifW7Xih6xKcXa6cFH3V-JjO_rWA=/164x26:1193x712/750x500/data/photo/2022/10/17/634d7264eeb1a.png"
                                />
                                <div className="text-center">
                                    <h3 className="text-lg font-bold">
                                        {anggota.name}
                                    </h3>
                                    <p>{anggota.nim}</p>
                                    <p>{anggota.university}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="bg-background h-14">
                <div className="max-w-[1400px] h-full mx-auto flex items-center justify-center border-t">
                    <p>
                        &copy; {new Date().getFullYear()} by{" "}
                        <span className="font-bold">EduRisk</span> team
                    </p>
                </div>
            </footer>
        </>
    );
}
