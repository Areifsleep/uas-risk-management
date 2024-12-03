import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import React from "react";

export default function UserPage() {
    return (
        <div>
            Fakultas Crud
            <Button asChild>
                <Link href={route("users.index")}>Navigate Users</Link>
            </Button>
        </div>
    );
}
