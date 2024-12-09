import { toast } from "sonner";
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
import { useModalCreateUserStore } from "@/Features/Admin/Users/Store/useModalCreateUserStore";
import { PageProps } from "@/types";

export const CreateUserModal = () => {
    const { isOpen, close } = useModalCreateUserStore();
    const { data, setData, reset, post, processing, errors, setError } =
        useForm({
            name: "",
            email: "",
            password: "",
            role: "",
            fakultas: "",
        });

    const handleCloseModal = () => {
        close();
        reset();
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
                            <Input
                                type="text"
                                id="name"
                                isRequired
                                errorMessage={errors.name}
                                isInvalid={!!errors.name}
                                size="sm"
                                name="name"
                                label="Nama"
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
                            <Input
                                type="email"
                                isRequired
                                size="sm"
                                errorMessage={errors.email}
                                isInvalid={!!errors.email}
                                name="email"
                                label="Email"
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
                        <div className="flex flex-col gap-y-3">
                            <Input
                                type="password"
                                id="password"
                                label="Password"
                                isRequired
                                errorMessage={errors.password}
                                isInvalid={!!errors.password}
                                size="sm"
                                name="password"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    });
                                    if (errors.password) {
                                        setError("password", "");
                                    }
                                }}
                            />
                        </div>
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
                                        role: e.target.value,
                                        fakultas:
                                            selectedRole === "rektor"
                                                ? ""
                                                : data.fakultas,
                                    });
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
                        {data.role === "admin_fakultas" && (
                            <div className="flex flex-col gap-y-3">
                                <label htmlFor="role">Fakultas</label>
                                <select
                                    value={data.fakultas}
                                    name="fakultas"
                                    id="fakultas"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            fakultas: e.target.value,
                                        })
                                    }
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
