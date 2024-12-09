import { toast } from "sonner";
import { useEffect } from "react";
import { Input } from "@nextui-org/input";
import { router, useForm, usePage } from "@inertiajs/react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

import { useModalEditUserStore } from "@/Features/Admin/Users/Store/useModalEditUserStore";
import { PageProps } from "@/types";

export const EditUserModal = () => {
    const {
        data: initialData,
        close,
        isOpen,
        resetState,
    } = useModalEditUserStore();

    const { data, setData, reset, patch, processing, errors, setError } =
        useForm({
            name: initialData.name,
            email: initialData.email,
            role: initialData.role,
            fakultas: initialData.fakultas,
        });

    useEffect(() => {
        setData({
            name: initialData.name,
            email: initialData.email,
            role: initialData.role,
            fakultas: initialData.fakultas,
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

    const fakultas = usePage<
        PageProps<{
            fakultas: {
                id: number;
                name: string;
                short_name: string;
            }[];
        }>
    >().props.fakultas;

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
                                isInvalid={!!errors.name}
                                errorMessage={errors.name}
                                value={data.name}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        name: e.target.value,
                                    });

                                    if (errors.name) {
                                        setError("name", "");
                                    }
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                id="email"
                                isInvalid={!!errors.email}
                                errorMessage={errors.email}
                                name="email"
                                value={data.email}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        email: e.target.value,
                                    });

                                    if (errors.email) {
                                        setError("email", "");
                                    }
                                }}
                            />
                        </div>
                        {data.role !== "super_admin" && (
                            <div className="flex flex-col gap-y-3">
                                <label htmlFor="role">Role</label>
                                <select
                                    name="role"
                                    id="role"
                                    value={data.role}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    onChange={(e) => {
                                        const selectedRole = e.target.value;
                                        setData({
                                            ...data,
                                            role: selectedRole,
                                            fakultas:
                                                selectedRole === "rektor"
                                                    ? ""
                                                    : data.fakultas,
                                        });

                                        if (errors.role) {
                                            setError("role", "");
                                        }
                                    }}
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
                        )}

                        {data.role === "admin_fakultas" && (
                            <div className="flex flex-col gap-y-3">
                                <label htmlFor="role">Fakultas</label>
                                <select
                                    value={data.fakultas ? data.fakultas : ""}
                                    name="fakultas"
                                    id="fakultas"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            fakultas: e.target.value,
                                        });

                                        if (errors.fakultas) {
                                            setError("fakultas", "");
                                        }
                                    }}
                                >
                                    <option value="">--Pilih Fakultas--</option>
                                    {fakultas.map((fakultas) => (
                                        <option
                                            key={fakultas.id}
                                            value={fakultas.id}
                                        >
                                            {`[${fakultas.short_name}] - ${fakultas.name}`}
                                        </option>
                                    ))}
                                </select>
                                {errors.fakultas && (
                                    <span className="text-red-500">
                                        {errors.fakultas}
                                    </span>
                                )}
                            </div>
                        )}

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
