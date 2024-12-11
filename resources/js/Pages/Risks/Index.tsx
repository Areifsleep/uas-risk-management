import { Head, router } from "@inertiajs/react";
import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { AlertCircle, BarChart3, ShieldAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { RisksType } from "@/types/risks";
import {
    likelihoodColorMapping,
    mappingValueLevel,
} from "@/Constants/LikelihoodColorMapping";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { hasRole } from "@/utils/HasRole";
import { Empty } from "@/Components/Empty";
import { ListFakultas } from "./ListFakultas";

const RiskPage = ({
    risks,
    auth,
}: PageProps<{
    risks: RisksType;
}>) => {
    const onRowClick = (id: number) => {
        router.visit(`/risks/${id}`, {
            preserveScroll: false,
        });
    };

    const isSpecialRole = hasRole("super_admin") || hasRole("rektor");

    return (
        <>
            <Head title="Risks" />
            <DashboardLayout>
                <div className="flex flex-col gap-5">
                    {/* <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Overall Score
                                </CardTitle>
                                <BarChart3 className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center">
                                    <div className="relative h-32 w-32">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-4xl font-bold">
                                                1
                                            </span>
                                        </div>
                                        <svg
                                            className="h-full w-full"
                                            viewBox="0 0 100 100"
                                        >
                                            <circle
                                                className="stroke-current text-red-100"
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                strokeWidth="10"
                                            />
                                            <circle
                                                className="stroke-current text-red-500"
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                strokeWidth="10"
                                                strokeDasharray="283"
                                                strokeDashoffset="70"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    High Risk Issues
                                </CardTitle>
                                <ShieldAlert className="h-4 w-4 text-emerald-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center">
                                    <div className="relative h-32 w-32">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-4xl font-bold">
                                                2
                                            </span>
                                        </div>
                                        <svg
                                            className="h-full w-full"
                                            viewBox="0 0 100 100"
                                        >
                                            <circle
                                                className="stroke-current text-emerald-100"
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                strokeWidth="10"
                                            />
                                            <circle
                                                className="stroke-current text-emerald-500"
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                strokeWidth="10"
                                                strokeDasharray="283"
                                                strokeDashoffset="141"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Risk
                                </CardTitle>
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center">
                                    <div className="relative h-32 w-32">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-4xl font-bold">
                                                3
                                            </span>
                                        </div>
                                        <svg
                                            className="h-full w-full"
                                            viewBox="0 0 100 100"
                                        >
                                            <circle
                                                className="stroke-current text-yellow-100"
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                strokeWidth="10"
                                            />
                                            <circle
                                                className="stroke-current text-yellow-500"
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                strokeWidth="10"
                                                strokeDasharray="283"
                                                strokeDashoffset="212"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div> */}

                    {isSpecialRole && <ListFakultas />}

                    <Card>
                        <CardHeader className="flex justify-between flex-row items-center">
                            <CardTitle className="text-xl">
                                {isSpecialRole ? (
                                    <span>
                                        Daftar Risiko Dari Semua Fakultas
                                    </span>
                                ) : (
                                    <span>
                                        Daftar Risiko Fakultas{" "}
                                        {auth.user.faculty?.name}
                                    </span>
                                )}
                            </CardTitle>
                            <Button
                                onClick={() => router.visit("/identifications")}
                            >
                                Input Risiko
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Fakultas</TableHead>
                                        <TableHead>Owner</TableHead>
                                        <TableHead className="text-center">
                                            Likelihood
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Impact
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Risk Level
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {risks.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8}>
                                                <Empty
                                                    title="Tidak ada data risiko untuk saat ini"
                                                    withButton
                                                    message="Bagus sekali! Tidak ada risiko yang perlu dikhawatirkan."
                                                    handleCreate={() =>
                                                        router.visit(
                                                            "/risks/create"
                                                        )
                                                    }
                                                    textButton="Buat Risiko"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        risks.map((risk) => (
                                            <TableRow
                                                key={risk.id}
                                                className="cursor-pointer hover:bg-gray-100"
                                                onClick={() =>
                                                    onRowClick(risk.id)
                                                }
                                            >
                                                <TableCell>{risk.id}</TableCell>
                                                <TableCell>
                                                    {risk.name}
                                                </TableCell>
                                                <TableCell>
                                                    {risk.description}
                                                </TableCell>
                                                <TableCell>
                                                    {risk.faculties.short_name}
                                                </TableCell>
                                                <TableCell>
                                                    {risk.creator.name}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-center h-full items-center">
                                                        <span
                                                            className={cn(
                                                                "inline-flex h-8 w-8 items-center justify-center rounded-full",
                                                                likelihoodColorMapping[
                                                                    risk
                                                                        .likelihood
                                                                        .rating
                                                                ].color
                                                            )}
                                                        >
                                                            {
                                                                risk.likelihood
                                                                    .rating
                                                            }
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-center h-full items-center">
                                                        <span
                                                            className={cn(
                                                                "inline-flex h-8 w-8 items-center justify-center rounded-full",
                                                                likelihoodColorMapping[
                                                                    risk.impact
                                                                        .rating
                                                                ]?.color
                                                            )}
                                                        >
                                                            {risk.impact.rating}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-center h-full items-center">
                                                        <span
                                                            className={cn(
                                                                "inline-flex h-8 w-8 items-center justify-center rounded-full",
                                                                mappingValueLevel(
                                                                    parseInt(
                                                                        risk.level_risk
                                                                    )
                                                                ).color
                                                            )}
                                                        >
                                                            {risk.level_risk}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </DashboardLayout>
        </>
    );
};

export default RiskPage;
