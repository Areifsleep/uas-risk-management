import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Head, usePage } from "@inertiajs/react";

import { Card, CardTitle } from "@/Components/ui/card";
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

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
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
                <Card className="w-full px-3.5 py-4">
                    <CardTitle className="text-xl mb-3">
                        Daftar Resiko Terbaru
                    </CardTitle>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Invoice
                                </TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.invoice}>
                                    <TableCell className="font-medium">
                                        {invoice.invoice}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.paymentStatus}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.paymentMethod}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {invoice.totalAmount}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">
                                    $2,500.00
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Card>
            </div>
        </DashboardLayout>
    );
}
