import { Link, router } from "@inertiajs/react";
import { ArrowLeft, User, Calendar, School2, Pencil, PencilIcon, Trash2Icon } from "lucide-react";

import { RiskById } from "@/types/RiskById";
import { Button } from "@/Components/ui/button";
import { FormatDate } from "@/utils/FormatDate";
import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

import { cn } from "@/lib/utils";
import {
    likelihoodColorMapping,
    mappingValueLevel,
} from "@/Constants/LikelihoodColorMapping";

import MitigationRisks from "../Mitigations/Index";
import { useConfirm } from "@/Hooks/useConfirm";
import { log } from "console";

export default function RiskDetail({ risk }: { risk: RiskById }) {
    const riskData = risk;
    const [DialogConfirm,confirm] = useConfirm("Hapus Risk?","Data yang sudah dihapus tidak dapat dikembalikan");
    const handleDeleteRisk = async() => {
        const ok = await confirm();
        if (!ok) {
            return;            
        }
        
        router.delete(route('risk.destroy',risk.id));
    };
    return (
        <>

        <DialogConfirm/>    
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
                            <div className="flex gap-1 justify-end">
                                <Button>
                                    <PencilIcon/>
                                </Button>
                                <Button variant="destructive" onClick={handleDeleteRisk}>
                                    <Trash2Icon/>
                                </Button>
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

                <div className="md:col-span-2">
                    <MitigationRisks risk={risk} />
                </div>
            </div>
        </DashboardLayout></>
    );
}
