import { color } from "framer-motion";

const colors: Record<
    "internal"|"external",
    { label: string; color: string }
> = {
    "internal": { label: "Very Low", color: "bg-yellow-200 text-black" },
    "external": { label: "Low", color: "bg-red-400 text-white" },
};

export const riskSourceColorMapping = (value: "external"|"internal") => {
    if (value === "external") {
        return colors["external"]; // Hijau pucat (Very Low)
    }

    if (value === "internal") {
        return colors["internal"]; // Hijau yang lebih menonjol (Low)
    }

    // Jika nilai tidak sesuai, kembalikan level aman sebagai fallback
    return colors["internal"];
};
