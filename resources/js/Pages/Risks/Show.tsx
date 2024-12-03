import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    ArrowLeft,
    AlertTriangle,
    BarChart2,
    User,
    Calendar,
} from "lucide-react";
import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";

// Mock data for demonstration
const riskData = {
    id: 1,
    name: "Ac Mati",
    description: "Panas Cik",
    owner: "FST",
    likelihood: 4,
    impact: 4,
    riskLevel: 4,
    createdAt: "2023-06-15",
    lastUpdated: "2023-12-01",
    mitigationPlan:
        "1. Check AC units regularly\n2. Have backup portable AC units\n3. Implement a maintenance schedule",
};

export default function RiskDetail() {
    const getRiskLevelColor = (level: number) => {
        if (level <= 2) return "bg-green-100 text-green-800";
        if (level <= 3) return "bg-yellow-100 text-yellow-800";
        return "bg-red-100 text-red-800";
    };

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
                        <CardTitle className="text-2xl font-bold">
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
                                {riskData.owner}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span className="font-semibold mr-2">
                                    Created:
                                </span>{" "}
                                {riskData.createdAt}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span className="font-semibold mr-2">
                                    Last Updated:
                                </span>{" "}
                                {riskData.lastUpdated}
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
                                <span
                                    className={`px-2 py-1 rounded-full ${getRiskLevelColor(
                                        riskData.likelihood
                                    )}`}
                                >
                                    {riskData.likelihood}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Impact:</span>
                                <span
                                    className={`px-2 py-1 rounded-full ${getRiskLevelColor(
                                        riskData.impact
                                    )}`}
                                >
                                    {riskData.impact}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">
                                    Risk Level:
                                </span>
                                <span
                                    className={`px-2 py-1 rounded-full ${getRiskLevelColor(
                                        riskData.riskLevel
                                    )}`}
                                >
                                    {riskData.riskLevel}
                                </span>
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
                            {riskData.mitigationPlan}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
