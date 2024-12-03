import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Head, Link, router } from "@inertiajs/react";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { AlertCircle, BarChart3, ShieldAlert } from "lucide-react";

const riskData = [
    {
        id: 1,
        name: "Ac Mati",
        description: "Panas Cik",
        owner: "FST",
        likelihood: 4,
        impact: 4,
        riskLevel: 4,
    },
    {
        id: 2,
        name: "Server Down",
        description: "Layanan Terganggu",
        owner: "IT",
        likelihood: 3,
        impact: 5,
        riskLevel: 5,
    },
    {
        id: 3,
        name: "Data Breach",
        description: "Kebocoran Informasi",
        owner: "Security",
        likelihood: 2,
        impact: 5,
        riskLevel: 4,
    },
    {
        id: 4,
        name: "Budget Overrun",
        description: "Pengeluaran Melebihi Anggaran",
        owner: "Finance",
        likelihood: 3,
        impact: 3,
        riskLevel: 3,
    },
    {
        id: 5,
        name: "Staff Shortage",
        description: "Kekurangan Personel",
        owner: "HR",
        likelihood: 2,
        impact: 4,
        riskLevel: 3,
    },
];

const RiskPage = () => {
    const onRowClick = (id: number) => {
        router.visit(`/risks/${id}`, {
            preserveScroll: false,
        });
    };
    return (
        <>
            <Head title="Risks" />
            <DashboardLayout>
                <div className="flex flex-col gap-5">
                    <div className="grid gap-4 md:grid-cols-3">
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
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Risk Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Owner</TableHead>
                                        <TableHead>Likelihood</TableHead>
                                        <TableHead>Impact</TableHead>
                                        <TableHead>Risk Level</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {riskData.map((risk) => (
                                        <TableRow
                                            key={risk.id}
                                            className="cursor-pointer hover:bg-gray-100"
                                            onClick={() => onRowClick(risk.id)}
                                        >
                                            <TableCell>{risk.id}</TableCell>
                                            <TableCell>{risk.name}</TableCell>
                                            <TableCell>
                                                {risk.description}
                                            </TableCell>
                                            <TableCell>{risk.owner}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                                                    {risk.likelihood}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                                                    {risk.impact}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                                                    {risk.riskLevel}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
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
