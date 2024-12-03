import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Head, usePage } from "@inertiajs/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { createGreetingMessage } from "@/lib/utils";
import RiskMatrixCanvas from "@/RiskMatrixCanvas";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

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

export default function Dashboard() {
    const props = usePage().props;
    console.log(props);
    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            <div>
                <p className="text-3xl font-bold capitalize">
                    {createGreetingMessage(props.auth.user.name)}
                </p>
            </div>
            <div className="pt-5 grid grid-cols-12 gap-3 items-center">
                <div className="w-full col-span-12 lg:col-span-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Card className="w-full h-[calc((450px/2)-8px)] flex-col flex p-3">
                            <div className="py-2.5 border-b">
                                Jumlah Fakultas
                            </div>
                            <div className="flex items-center justify-center h-full">
                                <span className="text-6xl font-bold">10</span>
                            </div>
                        </Card>
                        <Card className="w-full h-[calc((450px/2)-8px)] flex-col flex p-3">
                            <div className="py-2.5 border-b">
                                Jumlah Program Studi
                            </div>
                            <div className="flex items-center justify-center h-full">
                                <span className="text-6xl font-bold">10</span>
                            </div>
                        </Card>
                        <Card className="w-full h-[calc((450px/2)-8px)] flex-col flex p-3">
                            <div className="py-2.5 border-b">Jumlah Users</div>
                            <div className="flex items-center justify-center h-full">
                                <span className="text-6xl font-bold">10</span>
                            </div>
                        </Card>
                        <Card className="w-full h-[calc((450px/2)-8px)] flex-col flex p-3">
                            <div className="py-2.5 border-b">
                                Jumlah Resiko Yang Disetujui
                            </div>
                            <div className="flex items-center justify-center h-full">
                                <span className="text-6xl font-bold">10</span>
                            </div>
                        </Card>
                    </div>
                </div>
                <Card className="w-full h-[450px] overflow-hidden col-span-12 lg:col-span-7">
                    <RiskMatrixCanvas />
                </Card>
            </div>
            <div className="pt-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Resiko Approved Terbaru</CardTitle>
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
                                    <TableRow key={risk.id}>
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
    );
}
