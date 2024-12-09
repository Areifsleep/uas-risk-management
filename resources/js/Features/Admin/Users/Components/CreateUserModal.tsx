import { toast } from "sonner";
import { router, useForm } from "@inertiajs/react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

import { useModalCreateUserStore } from "@/Features/Admin/Users/Store/useModalCreateUserStore";

export const CreateUserModal = () => {
    const { isOpen, close } = useModalCreateUserStore();
    const { data, setData, reset, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const handleCloseModal = () => {
        close();
        reset();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("users.store"), {
            onSuccess: () => {
                close();
                router.reload();
                reset();
                toast.success(`User ${data.name} berhasil dibuat`);
            },
            onError: () => {
                toast.error("Gagal membuat user baru");
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleCloseModal}>
            <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Buat User Baru</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="name">Nama</label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        name: e.target.value,
                                    })
                                }
                            />

                            {errors.name && (
                                <span className="text-red-500">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        email: e.target.value,
                                    })
                                }
                            />
                            {errors.email && (
                                <span className="text-red-500">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                            />
                            {errors.password && (
                                <span className="text-red-500">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="role">Role</label>
                            <select
                                name="role"
                                id="role"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        role: e.target.value,
                                    })
                                }
                            >
                                <option value="">--Pilih Role--</option>
                                <option value="rektor">Rektor</option>
                                <option value="admin_fakultas">
                                    Admin Fakultas
                                </option>
                            </select>
                            {errors.role && (
                                <span className="text-red-500">
                                    {errors.role}
                                </span>
                            )}
                        </div>

                        <Button
                            disabled={processing}
                            type="submit"
                            className="w-full mt-5"
                        >
                            Simpan
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
