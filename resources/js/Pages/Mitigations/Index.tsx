import { toast } from "sonner";
import { FormEvent, useEffect, useState } from "react";
import { Textarea } from "@nextui-org/input";
import { router, useForm } from "@inertiajs/react";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

import { RiskById } from "@/types/RiskById";
import { Empty } from "@/Components/Empty";
import { getMitigations } from "@/Api/Mitigations/GetMitigations";
import { useConfirm } from "@/Hooks/useConfirm";

export default function MitigationRisks({ risk }: { risk: RiskById }) {
  const {
    data: mitigations,
    isLoading: isLoadingLoadMitigations,
    isError: isErrorLoadMitigations,
  } = getMitigations(risk.id);

  const {
    data: plan,
    reset: resetPlan,
    post: addPlan,
    setData: setPlan,
    setError: setErrorPlan,
    errors: errorPlan,
    processing: isProcessingPlan,
  } = useForm({
    plan: "",
    risk_id: risk.id,
  });

  const queryClient = useQueryClient();

  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);

  const [dialogEditState, setDialogEditState] = useState({
    id: 0,
    plan: "",
    isOpen: false,
  });

  useEffect(() => {
    if (dialogEditState.isOpen) {
      setData("plan", dialogEditState.plan);
    }
  }, [dialogEditState]);

  const [ConfirmationDeleteDialog, confirm] = useConfirm(
    "Apakah anda yakin",
    "Data akan dihapus secara permanen"
  );

  const isMitigationEmpty = mitigations?.length === 0;

  const handleAddRisk = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!risk) {
      toast.error("Risiko tidak ditemukan");
      return;
    }

    if (plan.plan.trim() === "") {
      setErrorPlan("plan", "Rencana mitigasi harus diisi");
      return;
    }

    addPlan("/mitigations", {
      preserveScroll: true,
      onSuccess: () => {
        resetPlan();
        queryClient.invalidateQueries({
          queryKey: ["mitigations", risk.id],
        });
        toast.success("Rencana mitigasi berhasil ditambahkan");
        setIsDialogCreateOpen(false);
      },
      onError: (error) => {
        toast.error("Gagal menambahkan rencana mitigasi");
      },
    });
  };

  const {
    data: updatedData,
    processing: isProcessingEdit,
    setData,
    setError,
    errors: errorEdit,
    patch: updatePlan,
  } = useForm({
    plan: "",
  });

  const handleUpdateRisk = () => {
    if (updatedData.plan.trim() === "") {
      setError("plan", "Rencana mitigasi harus diisi");
      return;
    }

    updatePlan(route("mitigations.update", dialogEditState.id), {
      preserveScroll: true,
      onSuccess: () => {
        setDialogEditState({
          id: 0,
          plan: "",
          isOpen: false,
        });
        queryClient.invalidateQueries({
          queryKey: ["mitigations", risk.id],
        });

        toast.success("Rencana mitigasi berhasil diperbarui");
      },
      onError: () => {
        toast.error("Gagal memperbarui rencana mitigasi");
      },
    });
  };

  const handleDeleteRisk = async (id: number) => {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    router.delete(route("mitigations.destroy", id), {
      preserveScroll: true,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["mitigations", risk.id],
        });
        toast.success("Rencana mitigasi berhasil dihapus");
      },
      onError: () => {
        toast.error("Gagal menghapus rencana mitigasi");
      },
    });
  };

  const onCloseCreateDialog = (open: boolean) => {
    resetPlan();
    setIsDialogCreateOpen(open);
  };

  return (
    <>
      <ConfirmationDeleteDialog />
      <Dialog
        open={dialogEditState.isOpen}
        onOpenChange={(open) => {
          setDialogEditState({
            ...dialogEditState,
            isOpen: open,
          });
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Plan</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Textarea
                label="Plan"
                value={updatedData.plan}
                isInvalid={!!errorEdit.plan}
                errorMessage={errorEdit.plan}
                onChange={(e) => {
                  setData("plan", e.target.value);

                  if (errorPlan.plan) {
                    setError("plan", "");
                  }
                }}
              />
            </div>
            <Button
              disabled={isProcessingEdit}
              onClick={handleUpdateRisk}
            >
              Update plan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mitigation Plan</CardTitle>
          <Dialog
            open={isDialogCreateOpen}
            onOpenChange={onCloseCreateDialog}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4" />
                <span className="hidden md:block ml-2">Tambah Rencana Mitigasi</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Rencana Mitigasi</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleAddRisk}
                className="grid gap-4"
              >
                <Textarea
                  isRequired
                  value={plan.plan}
                  isInvalid={!!errorPlan.plan}
                  errorMessage={errorPlan.plan}
                  label="Masukkan rencana mitigasi"
                  onChange={(e) => {
                    setPlan("plan", e.target.value);

                    if (errorPlan.plan) {
                      setErrorPlan("plan", "");
                    }
                  }}
                />
                <Button disabled={isProcessingPlan}>Simpan</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead className="w-[100px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingLoadMitigations ? (
                <TableRow>
                  <TableCell colSpan={2}>Loading...</TableCell>
                </TableRow>
              ) : isErrorLoadMitigations ? (
                <TableRow>
                  <TableCell colSpan={2}>Error...</TableCell>
                </TableRow>
              ) : isMitigationEmpty ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    <Empty
                      title="Tidak ada rencana mitigasi"
                      message="Tidak ada rencana mitigasi yang tersedia untuk risiko ini."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                mitigations?.map((mitigation) => (
                  <TableRow key={mitigation.id}>
                    <TableCell>{mitigation.plan}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDialogEditState({
                            id: mitigation.id,
                            plan: mitigation.plan,
                            isOpen: true,
                          });
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteRisk(mitigation.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
