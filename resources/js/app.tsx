import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { Toaster } from "./Components/ui/sonner";

import { NextUIProvider } from "@nextui-org/system";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createInertiaApp({
    title: (title) =>
        title ? `${title} - Masako` : `Risk Management System - Masako`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const queryClient = new QueryClient();

        root.render(
            <QueryClientProvider client={queryClient}>
                <NextUIProvider>
                    <App {...props} />
                    <Toaster />
                </NextUIProvider>
            </QueryClientProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
