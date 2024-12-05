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

import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Edit2Icon, EllipsisIcon, Plus, Trash2Icon } from "lucide-react";
import { AdminLayout } from "@/Layouts/AdminLayout";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { useConfirm } from "@/Hooks/useConfirm";
import { Users } from "@/types/users";

import { CreateUserModal } from "@/Features/Admin/Users/Components/CreateUserModal";
import { useModalCreateUserStore } from "@/Features/Admin/Users/Store/useModalCreateUserStore";
import { toast } from "sonner";

export default function UserPage({ users }: { users: Users }) {
    const { open } = useModalCreateUserStore();
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

            <Head title="User Manajemen" />
            <AdminLayout>
                <div>
                    <Button className="mb-3" onClick={() => open()}>
                        <Plus />
                        Tambahkan User Baru
                    </Button>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">
                                    Name
                                </TableHead>
                                <TableHead className="w-[250px]">
                                    Email
                                </TableHead>
                                <TableHead className="w-[200px]">
                                    Role
                                </TableHead>
                                <TableHead>Fakultas</TableHead>
                                <TableHead>Tanggal dibuat</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex gap-x-2 items-center">
                                            <Avatar>
                                                <AvatarFallback className="bg-sky-500 text-white">
                                                    {user.name
                                                        .charAt(0)
                                                        .toLocaleUpperCase()}
                                                </AvatarFallback>
                                                <AvatarImage />
                                            </Avatar>
                                            <span>{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span>{user.email}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex capitalize p-1 items-center justify-center rounded-xl bg-red-100 text-red-600">
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        Fakultas Sains dan Teknologi
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
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
                                                            setDialogEditState({
                                                                id: "1",
                                                                open: true,
                                                            })
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
            </AdminLayout>
        </>
    );
}
