import React from "react";
import { Head } from "@inertiajs/react";
import { Edit2Icon, EllipsisIcon, Plus, Trash2Icon } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { useConfirm } from "@/Hooks/useConfirm";

import { FakultasWithCreatedBy } from "@/types/fakultas";
import { FormatDate } from "@/utils/FormatDate";

export default function FakultasPage({
    fakultas,
}: {
    fakultas: FakultasWithCreatedBy;
}) {
    const [dialogEditState, setDialogEditState] = React.useState({
        open: false,
        id: "1",
    });

    const [DialogConfrim, confirm] = useConfirm(
        "Apakah anda yakin?",
        "Data yang dihapus tidak dapat dikembalikan"
    );

    const onDeleteUser = async (id: string) => {
        const ok = await confirm();

        if (!ok) {
            return;
        }

        console.log("Delete user", id);
    };

    return (
        <>
            <DialogConfrim />
            <Dialog
                open={dialogEditState.open}
                onOpenChange={(isOpen) =>
                    setDialogEditState({ ...dialogEditState, open: isOpen })
                }
            >
                <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Head title="Fakultas Manajemen" />
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
                            <Button
                                className="flex items-center gap-2"
                                onClick={() => open()}
                            >
                                <Plus className="h-4 w-4" />
                                Tambahkan Fakultas Baru
                            </Button>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Singkatan</TableHead>
                                        <TableHead>Dibuat Oleh</TableHead>
                                        <TableHead>Tanggal dibuat</TableHead>
                                        <TableHead className="w-[80px]">
                                            Aksi
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
                                            <TableCell>
                                                <div className="flex gap-x-2 items-center">
                                                    <Avatar className="size-7">
                                                        <AvatarFallback>
                                                            {f.created_by.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                        <AvatarImage src="" />
                                                    </Avatar>
                                                    <span>
                                                        {f.created_by.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {FormatDate(f.created_at)}
                                            </TableCell>
                                            <TableCell>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="ghost">
                                                            <EllipsisIcon />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-24 p-0">
                                                        <div className="flex flex-col">
                                                            <Button
                                                                onClick={() => {}}
                                                                className="justify-start"
                                                                variant="ghost"
                                                            >
                                                                <Edit2Icon className="size-4" />
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                onClick={() => {}}
                                                                className="justify-start"
                                                                variant="ghost"
                                                            >
                                                                <Trash2Icon className="size-4" />
                                                                Hapus
                                                            </Button>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
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
