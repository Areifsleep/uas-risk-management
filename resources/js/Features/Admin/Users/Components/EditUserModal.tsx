import { toast } from "sonner";
import { useEffect } from "react";
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

import { useModalEditUserStore } from "@/Features/Admin/Users/Store/useModalEditUserStore";

export const EditUserModal = () => {
    const {
        data: initialData,
        close,
        isOpen,
        resetState,
    } = useModalEditUserStore();

    const { data, setData, reset, patch, processing, errors } = useForm({
        name: initialData.name,
        email: initialData.email,
        role: initialData.role,
    });

    useEffect(() => {
        setData({
            name: initialData.name,
            email: initialData.email,
            role: initialData.role,
        });
    }, [initialData]);

    const onCloseEditModal = () => {
        reset();
        resetState();
        close();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route("users.update", initialData.id), {
            onSuccess: () => {
                close();
                router.reload();
                reset();
                toast.success(`User ${data.name} berhasil diubah`);
            },
            onError: () => {
                toast.error("Gagal mengubah user");
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onCloseEditModal}>
            <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="name">Nama</label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
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
                                value={data.email}
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
                            <label htmlFor="role">Role</label>
                            <select
                                name="role"
                                id="role"
                                value={data.role}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        role: e.target.value,
                                    })
                                }
                            >
                                <option value="">--Pilih Role--</option>
                                <option value="rektor">Rektor</option>
                                <option value="dekan">Dekan</option>
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
