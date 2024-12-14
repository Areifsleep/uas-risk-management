import { useMutation } from "@tanstack/react-query";

type RequestType = {
    risk_id: number;
    plan: string;
};

export const useCreateMitigation = () => {
    const mutate = useMutation<undefined, Error, RequestType>({
        mutationFn: async (data) => {
            const response = await window.axios.post("/mitigations", {
                risk_id: data.risk_id,
                plan: data.plan,
            });

            return response.data;
        },
    });

    return mutate;
};
