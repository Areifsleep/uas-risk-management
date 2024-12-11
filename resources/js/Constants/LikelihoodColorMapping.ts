export const likelihoodColorMapping: Record<
    number,
    { label: string; color: string }
> = {
    1: { label: "Very Low", color: "bg-green-200 text-black" },
    2: { label: "Low", color: "bg-green-400 text-gray-800" },
    3: { label: "Moderate", color: "bg-yellow-400 text-blue-800" },
    4: { label: "High", color: "bg-orange-400 text-slate-700" },
    5: { label: "Very High", color: "bg-red-500 text-yellow-800" },
};

export const mappingValueLevel = (value: number) => {
    if (value >= 0 && value <= 5) {
        return likelihoodColorMapping[1]; // Hijau pucat (Very Low)
    }

    if (value >= 6 && value <= 10) {
        return likelihoodColorMapping[2]; // Hijau yang lebih menonjol (Low)
    }

    if (value >= 11 && value <= 15) {
        return likelihoodColorMapping[3]; // Kuning sedang (Moderate)
    }

    if (value >= 16 && value <= 20) {
        return likelihoodColorMapping[4]; // Jingga/Orange (High)
    }

    if (value >= 21 && value <= 25) {
        return likelihoodColorMapping[5]; // Merah terang/ekstrem (Very High)
    }

    // Jika nilai tidak sesuai, kembalikan level aman sebagai fallback
    return likelihoodColorMapping[1];
};
