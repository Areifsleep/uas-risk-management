import { Link } from "@inertiajs/react";

export default function ApplicationLogo() {
    return (
        <div className="flex items-center gap-x-2">
            <img className="size-10" src="/masako-logo.png" alt="app-logo" />
            <Link href="/">
                <span className="font-bold text-xl">Masako</span>
            </Link>
        </div>
    );
}
