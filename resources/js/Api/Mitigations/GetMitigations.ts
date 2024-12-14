import { useQuery } from "@tanstack/react-query";

import { Mitigation } from "@/types/mitigations";

export const getMitigations = (risk_id: number) => {
    const mitigations = useQuery({
        queryKey: ["mitigations", risk_id],
        queryFn: async () => {
            const response = await window.axios.get("/mitigations", {
                params: {
                    risk_id,
                },
            });

            return response.data as Mitigation[];
        },
    });

    return mitigations;
};
