import { create } from "zustand";

export const useModalEditUserStore = create<{
    isOpen: boolean;
    data: {
        id: number;
        name: string;
        email: string;
        role: string;
        fakultas: number | string | null;
    };
    resetState: () => void;
    open: (data: {
        id: number;
        name: string;
        email: string;
        role: string;
        fakultas: number | string | null;
    }) => void;
    close: () => void;
}>((set) => ({
    isOpen: false,
    data: {
        id: 0,
        name: "",
        email: "",
        role: "",
        fakultas: "",
    },
    resetState() {
        set({
            isOpen: false,
            data: {
                id: 0,
                name: "",
                email: "",
                role: "",
                fakultas: "",
            },
        });
    },
    open: (data) => set({ isOpen: true, data }),
    close: () => set({ isOpen: false }),
}));
