import { create } from "zustand";

export const useModalEditUserStore = create<{
    isOpen: boolean;
    data: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    resetState: () => void;
    open: (data: {
        id: number;
        name: string;
        email: string;
        role: string;
    }) => void;
    close: () => void;
}>((set) => ({
    isOpen: false,
    data: {
        id: 0,
        name: "",
        email: "",
        role: "",
    },
    resetState() {
        set({
            isOpen: false,
            data: {
                id: 0,
                name: "",
                email: "",
                role: "",
            },
        });
    },
    open: (data) => set({ isOpen: true, data }),
    close: () => set({ isOpen: false }),
}));
