import { Button } from "@/Components/ui/button";
import { Head } from "@inertiajs/react";

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
    DialogTrigger,
} from "@/Components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Edit2Icon, EllipsisIcon, Plus, Trash2Icon } from "lucide-react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import React from "react";
import { useConfirm } from "@/Hooks/useConfirm";

export default function FakultasPage() {
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
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus />
                                Tambahkan Fakultas Baru
                            </Button>
                        </DialogTrigger>
                        <DialogContent
                            onPointerDownOutside={(e) => e.preventDefault()}
                        >
                            <DialogHeader>
                                <DialogTitle>Buat Fakultas Baru</DialogTitle>
                                <DialogDescription>
                                    {/* TODO: Buat form */}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fakultas</TableHead>
                                <TableHead>Dbuat Oleh</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Fakultas Sains dan Teknologi
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-x-2 items-center">
                                        <Avatar>
                                            <AvatarFallback>AD</AvatarFallback>
                                            <AvatarImage src="https://i.pravatar.cc/300" />
                                        </Avatar>
                                        <span>Ahmad Zidni Hidayat</span>
                                    </div>
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
                                                        onDeleteUser("1")
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
                        </TableBody>
                    </Table>
                </div>
            </AdminLayout>
        </>
    );
}
