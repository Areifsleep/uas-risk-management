import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import React from "react";

export default function UserPage() {
    return (
        <div>
            User Crud{" "}
            <Button asChild>
                <Link href={route("fakultas.index")}>Navigate Fakultas</Link>
            </Button>
        </div>
    );
}
