import { Button } from "@/Components/ui/button";
import { Head, router, useForm } from "@inertiajs/react";
import React from "react";

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

import { Edit2Icon, EllipsisIcon, Plus, Trash2Icon } from "lucide-react";
import { AdminLayout } from "@/Layouts/AdminLayout";

import { useConfirm } from "@/Hooks/useConfirm";
import { Users } from "@/types/users";

import { CreateUserModal } from "@/Features/Admin/Users/Components/CreateUserModal";
import { useModalCreateUserStore } from "@/Features/Admin/Users/Store/useModalCreateUserStore";
import { toast } from "sonner";
import { useModalEditUserStore } from "@/Features/Admin/Users/Store/useModalEditUserStore";
import { EditUserModal } from "@/Features/Admin/Users/Components/EditUserModal";
import { Badge } from "@/Components/ui/badge";
import { FormatDate } from "@/utils/FormatDate";

export default function UserPage({ users }: { users: Users }) {
    const { open } = useModalCreateUserStore();
    const { open: openEditModal } = useModalEditUserStore();
    const {
        data,
        setData,
        reset,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        id: "",
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

        destroy(route("users.destroy", id), {
            onSuccess: () => {
                toast.success("User berhasil dihapus");
                router.reload();
            },
            onError: () => {
                toast.error("Gagal menghapus user");
            },
        });
    };

    return (
        <>
            <DialogConfrim />
            <CreateUserModal />
            <EditUserModal />
            <Head title="User Manajemen" />
            <AdminLayout>
                <div className="p-6">
                    <div className="flex flex-col space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    User Manajemen
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Kelola pengguna dan hak akses sistem
                                </p>
                            </div>
                            <Button
                                className="flex items-center gap-2"
                                onClick={() => open()}
                            >
                                <Plus className="h-4 w-4" />
                                Tambahkan User Baru
                            </Button>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]">
                                            Avatar
                                        </TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Fakultas</TableHead>
                                        <TableHead>Tanggal dibuat</TableHead>
                                        <TableHead className="w-[80px]">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    <span className="text-lg font-semibold text-primary">
                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {user.name}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        user.role === "Admin"
                                                            ? "default"
                                                            : user.role ===
                                                              "Rektor"
                                                            ? "secondary"
                                                            : "outline"
                                                    }
                                                >
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>FST</TableCell>
                                            <TableCell>
                                                {FormatDate(user.created_at)}
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
                                                                onClick={() =>
                                                                    openEditModal(
                                                                        {
                                                                            id: user.id,
                                                                            name: user.name,
                                                                            email: user.email,
                                                                            role: user.role,
                                                                        }
                                                                    )
                                                                }
                                                                className="justify-start"
                                                                variant="ghost"
                                                            >
                                                                <Edit2Icon className="size-4" />
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    onDeleteUser(
                                                                        user.id.toString()
                                                                    )
                                                                }
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
