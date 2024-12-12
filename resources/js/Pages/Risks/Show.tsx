import { Link } from "@inertiajs/react";
import { ArrowLeft, User, Calendar, School2 } from "lucide-react";

import { RiskById } from "@/types/RiskById";
import { Button } from "@/Components/ui/button";
import { FormatDate } from "@/utils/FormatDate";
import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

import {
    likelihoodColorMapping,
    mappingValueLevel,
} from "@/Constants/LikelihoodColorMapping";

import { cn } from "@/lib/utils";
import { getMitigations } from "@/Api/GetMitigations";
import { Empty } from "@/Components/Empty";

export default function RiskDetail({ risk }: { risk: RiskById }) {
    const riskData = risk;

    const {
        data: mitigations,
        isLoading: isLoadingLoadMitigations,
        isError: isErrorLoadMitigations,
    } = getMitigations(risk.id);

    const isMitigationEmpty = mitigations?.length === 0;

    return (
        <DashboardLayout>
            <Button variant="outline" className="mb-6" asChild>
                <Link href={route("risks.index")}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
                </Link>
            </Button>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="capitalize text-2xl font-bold">
                            {riskData.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            {riskData.description}
                        </p>
                        <div className="grid gap-4">
                            <div className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                <span className="font-semibold mr-2">
                                    Owner:
                                </span>{" "}
                                {riskData.creator.name}
                            </div>
                            <div className="flex items-center">
                                <School2 className="mr-2 h-4 w-4" />
                                <span className="font-semibold mr-2">
                                    Fakultas:
                                </span>{" "}
                                {`${riskData.faculty.name} (${riskData.faculty.short_name})`}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span className="font-semibold mr-2">
                                    Created:
                                </span>{" "}
                                {FormatDate(riskData.created_at)}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span className="font-semibold mr-2">
                                    Last Updated:
                                </span>{" "}
                                {FormatDate(riskData.updated_at)}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">
                                    Likelihood:
                                </span>
                                <div className="flex justify-center h-full items-center">
                                    <span
                                        className={cn(
                                            "inline-flex h-8 w-8 items-center justify-center rounded-full",
                                            likelihoodColorMapping[
                                                risk.likelihood.rating
                                            ].color
                                        )}
                                    >
                                        {risk.likelihood.rating}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Impact:</span>
                                <div className="flex justify-center h-full items-center">
                                    <span
                                        className={cn(
                                            "inline-flex h-8 w-8 items-center justify-center rounded-full",
                                            likelihoodColorMapping[
                                                risk.impact.rating
                                            ].color
                                        )}
                                    >
                                        {risk.impact.rating}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">
                                    Risk Level:
                                </span>
                                <div className="flex justify-center h-full items-center">
                                    <span
                                        className={cn(
                                            "inline-flex h-8 w-8 items-center justify-center rounded-full",
                                            mappingValueLevel(
                                                parseInt(risk.level_risk)
                                            ).color
                                        )}
                                    >
                                        {risk.level_risk}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Mitigation Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md">
                            {isLoadingLoadMitigations ? (
                                <p>Loading...</p>
                            ) : isErrorLoadMitigations ? (
                                <p>Something went wrong...</p>
                            ) : isMitigationEmpty ? (
                                <Empty
                                    title="Tidak ada rencana mitigasi"
                                    message="Tidak ada rencana mitigasi yang tersedia untuk risiko ini."
                                />
                            ) : (
                                mitigations?.map((mitigation, i) => (
                                    <p key={mitigation.id}>
                                        {i + 1}. {mitigation.plan}
                                    </p>
                                ))
                            )}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
