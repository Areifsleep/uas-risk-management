import { Impact } from "./RiskById.d";
import { PageProps } from "@/types";

export type RiskEditProps = PageProps<{
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
  risks: {
    id: number;
    name: string;
    description: string;
    potential_disadvantages: string;
    risk_source: string;
    is_approved: boolean;
    faculties_id: number;
    impact_id: number;
    likelihood_id: number;
    faculties: Faculties;
    creator: Creator;
    updater: Updater;
    likelihood: Likelihood;
    impact: Impact;
    level_risk: string;
    created_at: string;
    updated_at: string;
  };
}>;
