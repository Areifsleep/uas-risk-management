import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { cn, createGreetingMessage } from "@/lib/utils";
import RiskMatrixCanvas from "@/RiskMatrixCanvas";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { hasRole } from "@/utils/HasRole";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { AlertCircle, BarChart3, Bell, School2, ShieldAlert } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { likelihoodColorMapping, mappingValueLevel } from "@/Constants/LikelihoodColorMapping";
import { PageProps } from "@/types";
import { RisksType } from "@/types/risks";
import { Empty } from "@/Components/Empty";

export default function Dashboard() {
  const props = usePage<
    PageProps<{
      recently_risks: RisksType;
    }>
  >().props;
  const onRowClick = (id: number) => {
    router.visit(`/risks/${id}`, {
      preserveScroll: false,
    });
  };

  console.log(props.recently_risks);
  return (
    <DashboardLayout>
      <Head title="Dashboard" />
      <div>
        <p className="text-3xl font-bold capitalize">
          {createGreetingMessage(props.auth.user.name)}
        </p>
      </div>
      {hasRole("super_admin") && (
        <Alert
          variant="info"
          className="mt-5"
        >
          <Bell className="h-4 w-4" />
          <AlertTitle>Anda Adalah Admin</AlertTitle>
          <AlertDescription>
            Pergi ke halaman Admin untuk mengelola data
            <div>
              <Button
                asChild
                className="mt-2.5"
                size="sm"
                variant="default"
              >
                <Link
                  href="/admin"
                  className="font-bold"
                >
                  Admin area
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      <div className="pt-5 grid grid-cols-12 gap-3 items-center">
        <div className="w-full col-span-12 lg:col-span-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative h-32 w-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">1</span>
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
                <CardTitle className="text-sm font-medium">High Risk Issues</CardTitle>
                <ShieldAlert className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative h-32 w-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">2</span>
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
                <CardTitle className="text-sm font-medium">Total Risk</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative h-32 w-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">3</span>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Program Studi</CardTitle>
                <School2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative h-32 w-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">3</span>
                    </div>
                    <svg
                      className="h-full w-full"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        className="stroke-current text-green-100"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        strokeWidth="10"
                      />
                      <circle
                        className="stroke-current text-green-500"
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
        </div>
        <Card className="w-full h-[450px] overflow-hidden col-span-12 lg:col-span-7">
          <RiskMatrixCanvas />
        </Card>
      </div>
      <div className="pt-5">
        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle className="text-xl">Risiko 5 Terbaru</CardTitle>
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
                {props.recently_risks.length === 0 ? (
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
                  props.recently_risks.map((risk) => (
                    <TableRow
                      key={risk.id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => onRowClick(risk.id)}
                    >
                      <TableCell>{risk.id}</TableCell>
                      <TableCell>{risk.name}</TableCell>
                      <TableCell>{risk.description}</TableCell>
                      <TableCell>{risk.faculties.short_name}</TableCell>
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
      </div>
    </DashboardLayout>
  );
}
