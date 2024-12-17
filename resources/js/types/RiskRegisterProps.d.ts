import { PageProps } from "@/types";

export type RiskRegisterProps = PageProps<{
  options: {
    likelihoods: {
      id: number;
      label: string;
      rating: number;
      description: string;
      precentage_range: string;
      created_at: string;
      updated_at: string;
    }[];
    impacts: {
      id: number;
      label: string;
      secondary_label: string;
      rating: number;
      created_at: string;
      updated_at: string;
    }[];
    faculties: {
      id: number;
      name: string;
      short_name: string;
      created_at: string;
      updated_at: string;
    }[];
  };
}>;
