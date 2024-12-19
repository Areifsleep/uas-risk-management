import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { DashboardLayout } from "@/Layouts/DashboardLayout";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

import { Button } from "@/Components/ui/button";
import { Head, router } from "@inertiajs/react";
import { Empty } from "@/Components/Empty";
import { cn } from "@/lib/utils";
import { likelihoodColorMapping, mappingValueLevel } from "@/Constants/LikelihoodColorMapping";
import { PageProps } from "@/types";

export default function ShowByFakultas({
  fakultas,
  risks,
}: PageProps<{
  risks: Array<{
    id: number;
    name: string;
    description: string;
    faculty: {
      short_name: string;
    };
    creator: {
      name: string;
    };
    likelihood: {
      rating: number;
    };
    impact: {
      rating: number;
    };
    level_risk: string;
  }>;

  fakultas: {
    id: number;
    name: string;
  };
}>) {
  const onRowClick = (id: number) => {
    router.visit(`/risks/${id}`, {
      preserveScroll: false,
    });
  };

  return (
    <DashboardLayout>
      <Head title={`Daftar Risiko ${fakultas.name}`} />
      <Card>
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="text-xl">Daftar Risiko {fakultas.name}</CardTitle>
          <Button onClick={() => router.visit(route("risk-register.index"))}>Input Risiko</Button>
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
                <TableHead className="text-center">Likelihood</TableHead>
                <TableHead className="text-center">Impact</TableHead>
                <TableHead className="text-center">Risk Level</TableHead>
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
                      handleCreate={() => router.visit(route("risk-register.index"))}
                      textButton="Buat Risiko"
                    />
                  </TableCell>
                </TableRow>
              ) : (
                risks.map((risk) => (
                  <TableRow
                    key={risk.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => onRowClick(risk.id)}
                  >
                    <TableCell>{risk.id}</TableCell>
                    <TableCell>{risk.name}</TableCell>
                    <TableCell>{risk.description}</TableCell>
                    <TableCell>{risk.faculty.short_name}</TableCell>
                    <TableCell>{risk.creator.name}</TableCell>
                    <TableCell>
                      <div className="flex justify-center h-full items-center">
                        <span
                          className={cn(
                            "inline-flex h-8 w-8 items-center justify-center rounded-full",
                            likelihoodColorMapping[risk.likelihood.rating].color
                          )}
                        >
                          {risk.likelihood.rating}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center h-full items-center">
                        <span
                          className={cn(
                            "inline-flex h-8 w-8 items-center justify-center rounded-full",
                            likelihoodColorMapping[risk.impact.rating]?.color
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
                            mappingValueLevel(parseInt(risk.level_risk)).color
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
    </DashboardLayout>
  );
}
