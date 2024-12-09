import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { Toaster } from "./Components/ui/sonner";

import { NextUIProvider } from "@nextui-org/system";

const appName = import.meta.env.VITE_APP_NAME || "Risk Management System";

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

        root.render(
            <>
                <NextUIProvider>
                    <App {...props} />
                    <Toaster />
                </NextUIProvider>
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
