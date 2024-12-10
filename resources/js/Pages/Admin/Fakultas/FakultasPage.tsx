import { Head } from "@inertiajs/react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { AdminLayout } from "@/Layouts/AdminLayout";

import { FakultasWithCountUser } from "@/types/fakultas";
import { FormatDate } from "@/utils/FormatDate";
import { PageProps } from "@/types";

export default function FakultasPage({
    fakultas,
}: PageProps<{
    fakultas: FakultasWithCountUser[];
}>) {
    return (
        <>
            <Head title="Daftar Fakultas" />
            <AdminLayout>
                <div className="md:px-6">
                    <div className="flex flex-col space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Fakultas Manajemen
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Kelola fakultas yang ada di universitas
                                </p>
                            </div>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Singkatan</TableHead>
                                        <TableHead className="text-center">
                                            Jumlah user
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Tanggal dibuat
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fakultas.map((f) => (
                                        <TableRow key={f.id}>
                                            <TableCell className="font-medium">
                                                {f.name}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {f.short_name}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {f.users_count}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {FormatDate(f.created_at)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
