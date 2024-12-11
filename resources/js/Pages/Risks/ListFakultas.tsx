import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    BookOpen,
    Calculator,
    Globe2,
    HeartPulse,
    Library,
    Microscope,
    Plus,
    School2,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

interface Faculty {
    id: string;
    name: string;
    icon: React.ReactNode;
    riskCount: number;
}

const faculties: Faculty[] = [
    {
        id: "febi",
        name: "Fakultas Ekonomi dan Bisnis Islam",
        icon: <Calculator className="w-8 h-8" />,
        riskCount: 5,
    },
    {
        id: "fst",
        name: "Fakultas Sains dan Teknologi",
        icon: <Microscope className="w-8 h-8" />,
        riskCount: 3,
    },
    {
        id: "fdk",
        name: "Fakultas Dakwah dan Komunikasi",
        icon: <Globe2 className="w-8 h-8" />,
        riskCount: 2,
    },
    {
        id: "fsh",
        name: "Fakultas Syariah dan Hukum",
        icon: <Library className="w-8 h-8" />,
        riskCount: 4,
    },
    {
        id: "ftk",
        name: "Fakultas Tarbiyah dan Keguruan",
        icon: <School2 className="w-8 h-8" />,
        riskCount: 6,
    },
    {
        id: "fuf",
        name: "Fakultas Ushuluddin dan Filsafat",
        icon: <BookOpen className="w-8 h-8" />,
        riskCount: 3,
    },
    {
        id: "fkik",
        name: "Fakultas Kedokteran dan Ilmu Kesehatan",
        icon: <HeartPulse className="w-8 h-8" />,
        riskCount: 4,
    },
];

export const ListFakultas = () => {
    const props = usePage<
        PageProps<{
            faculties: {
                id: number;
                name: string;
                short_name: string;
                risks_count: number;
                created_at: string;
                updated_at: string;
            }[];
        }>
    >().props;
    console.log(props);
    return (
        <Card>
            {/* Header Section */}
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Daftar Fakultas</h1>
                </CardTitle>
            </CardHeader>

            {/* Faculty Grid */}
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {props.faculties.map((faculty) => (
                        <Link
                            href={`/risks/fakultas/${faculty.id}`}
                            key={faculty.id}
                        >
                            <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="flex items-start space-x-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <School2 className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-medium">
                                            {faculty.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-bold text-black me-1">
                                                {faculty.risks_count}
                                            </span>
                                            identified risks
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
