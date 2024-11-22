import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Head, usePage } from "@inertiajs/react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { columns, type Payment } from "./Columns";
import { DataTable } from "./DataTable";

function getData(): Payment[] {
    // Fetch data from your API here.
    return [
        {
            id: "m5gr84i9",
            amount: 316,
            status: "success",
            email: "ken99@yahoo.com",
        },
        {
            id: "3u1reuv4",
            amount: 242,
            status: "success",
            email: "Abe45@gmail.com",
        },
        {
            id: "derv1ws0",
            amount: 837,
            status: "processing",
            email: "Monserrat44@gmail.com",
        },
        {
            id: "5kma53ae",
            amount: 874,
            status: "success",
            email: "Silas22@gmail.com",
        },
        {
            id: "bhqecj4p",
            amount: 721,
            status: "failed",
            email: "carmella@hotmail.com",
        },
    ];
}

export default function Dashboard() {
    const data = getData();
    const props = usePage().props;
    console.log(props);
    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            <div>
                <span className="font font-semibold">Hello admin,</span>
                <p className="text-3xl font-bold">Good Morning</p>
            </div>
            <div className="pt-5 grid grid-cols-12 gap-3 items-center">
                <Card className="w-full h-[450px] col-span-6">
                    <CardHeader>
                        <CardTitle>Grafik Probabilitas</CardTitle>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                </Card>
                <div className="w-full col-span-6">
                    <div className="grid grid-cols-2 gap-2">
                        <Card className="w-full h-[calc((450px/2)-8px)] p-3">
                            Jumlah Fakultas
                        </Card>
                        <Card className="w-full h-[calc((450px/2)-8px)] p-3">
                            Jumlah...
                        </Card>
                        <Card className="w-full h-[calc((450px/2)-8px)] p-3">
                            Jumlah Resiko Yang Perlu di Review
                        </Card>
                        <Card className="w-full h-[calc((450px/2)-8px)] p-3">
                            Jumlah Resiko Yang Disetujui
                        </Card>
                    </div>
                </div>
            </div>
            <div className="pt-5">
                <Card className="w-full px-3.5 py-4">
                    Data Table
                    <DataTable columns={columns} data={data} />
                </Card>
            </div>
        </DashboardLayout>

        // <AuthenticatedLayout
        //     header={
        //         <h2 className="text-xl font-semibold leading-tight text-gray-800">
        //             Dashboard
        //         </h2>
        //     }
        // >
        //     <Head title="Dashboard" />

        //     <div className="py-12">
        //         <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        //             <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
        //                 <div className="p-6 text-gray-900">
        //                     You're logged in!
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </AuthenticatedLayout>
    );
}
