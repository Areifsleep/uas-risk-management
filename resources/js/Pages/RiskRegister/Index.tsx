import { toast } from "sonner";
import { useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Head, useForm } from "@inertiajs/react";
import { Select, SelectItem } from "@nextui-org/select";

import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Button } from "@/Components/ui/button";

import { RiskRegisterProps } from "@/types/RiskRegisterProps";

const identificationsPage = (props: RiskRegisterProps) => {
  const {
    data,
    setData,
    errors,
    setError,
    processing,
    post,
    reset,
    clearErrors,
  } = useForm({
    name: "",
    description: "",
    faculty_id: "",
    likelihood_id: "",
    impact_id: "",
    level_risk: "0",
    risk_source: "",
    potential_disadvantages: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route("risk-register.store"), {
      onSuccess: () => {
        reset();
        clearErrors();

        toast.success("Berhasil menambahkan data risiko");
      },
      onError: () => {
        toast.error("Gagal menambahkan data risiko");
      },
    });
  };

  // Calculate level_risk when likelihood_id or impact_id changes
  useEffect(() => {
    const likelihood = props.options.likelihoods.find(
      (item) => item.id === Number(data.likelihood_id)
    );
    const impact = props.options.impacts.find(
      (item) => item.id === Number(data.impact_id)
    );

    if (likelihood && impact) {
      const levelRisk = likelihood.rating * impact.rating;
      setData("level_risk", levelRisk.toString());
    } else {
      setData("level_risk", "0");
    }
  }, [data.likelihood_id, data.impact_id]);

  return (
    <>
      <Head title="Risk Register" />
      <DashboardLayout>
        <div className="w-full h-full flex items-center justify-center">
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            <div>
              <h1 className="text-2xl font-semibold mb-3">
                Identifikasi Risiko
              </h1>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  isRequired
                  autoComplete="on"
                  placeholder="Masukkan nama risiko"
                  labelPlacement="outside"
                  label="Nama Risiko"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name}
                  value={data.name}
                  onChange={(e) => {
                    setData("name", e.target.value);
                    if (errors.name) {
                      setError("name", "");
                    }
                  }}
                />
                <Input
                  type="text"
                  isRequired
                  placeholder="Masukkan deskripsi risiko"
                  labelPlacement="outside"
                  label="Deskripsi Risiko"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description}
                  value={data.description}
                  onChange={(e) => {
                    setData("description", e.target.value);
                    if (errors.description) {
                      setError("description", "");
                    }
                  }}
                />
                <Select
                  label="Fakultas"
                  labelPlacement="outside"
                  placeholder="Pilih Fakultas"
                  isRequired
                  items={props.options.faculties}
                  isInvalid={!!errors.faculty_id}
                  errorMessage={errors.faculty_id}
                  value={data.faculty_id}
                  onChange={(e) => {
                    setData("faculty_id", e.target.value);
                    if (errors.faculty_id) {
                      setError("faculty_id", "");
                    }
                  }}
                >
                  {(faculty) => {
                    return (
                      <SelectItem
                        key={faculty.id}
                        textValue={`[${faculty.short_name}] ${faculty.name}`}
                      >
                        {faculty.short_name} - {faculty.name}
                      </SelectItem>
                    );
                  }}
                </Select>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-3">
                Nilai Inherent Risiko
              </h1>
              <div className="flex flex-col md:flex-row gap-4">
                <Select
                  label="Likelihood"
                  labelPlacement="outside"
                  placeholder="Pilih Likelihood"
                  isRequired
                  items={props.options.likelihoods}
                  isInvalid={!!errors.likelihood_id}
                  errorMessage={errors.likelihood_id}
                  value={data.likelihood_id}
                  onChange={(e) => {
                    setData("likelihood_id", e.target.value);
                    if (errors.likelihood_id) {
                      setError("likelihood_id", "");
                    }
                  }}
                >
                  {(likelihod) => {
                    return (
                      <SelectItem
                        key={likelihod.id}
                        textValue={`[${likelihod.rating}] ${likelihod.label} - ${likelihod.precentage_range}`}
                      >
                        <div className="flex gap-x-2">
                          <span className="font-bold">
                            [{likelihod.rating}]
                          </span>
                          {likelihod.label} ({likelihod.precentage_range})
                        </div>
                      </SelectItem>
                    );
                  }}
                </Select>
                <Select
                  label="Impact"
                  labelPlacement="outside"
                  placeholder="Pilih Impact"
                  isRequired
                  items={props.options.impacts}
                  isInvalid={!!errors.impact_id}
                  errorMessage={errors.impact_id}
                  value={data.impact_id}
                  onChange={(e) => {
                    setData("impact_id", e.target.value);
                    if (errors.impact_id) {
                      setError("impact_id", "");
                    }
                  }}
                >
                  {(impact) => {
                    return (
                      <SelectItem
                        key={impact.id}
                        textValue={`[${impact.rating}] ${impact.label} - ${impact.secondary_label}`}
                      >
                        <div className="flex gap-x-2">
                          <span className="font-bold">[{impact.rating}]</span>
                          {impact.label} ({impact.secondary_label})
                        </div>
                      </SelectItem>
                    );
                  }}
                </Select>
                <Input
                  type="number"
                  label="Level Of Risk"
                  isRequired
                  isReadOnly
                  placeholder="Level Of Risk"
                  labelPlacement="outside"
                  value={data.level_risk}
                  onChange={(e) => {
                    setData("level_risk", e.target.value);
                    if (errors.level_risk) {
                      setError("level_risk", "");
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-3">Lainnya</h1>
              <div className="flex gap-4">
                <Select
                  label="Sumber Risiko"
                  labelPlacement="outside"
                  placeholder="Pilih Sumber Risiko"
                  isRequired
                  items={[
                    { value: "internal", label: "Internal" },
                    { value: "external", label: "External" },
                  ]}
                  isInvalid={!!errors.risk_source}
                  errorMessage={errors.risk_source}
                  value={data.risk_source}
                  onChange={(e) => {
                    setData("risk_source", e.target.value);
                    if (errors.risk_source) {
                      setError("risk_source", "");
                    }
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value} textValue={item.label}>
                      {item.label}
                    </SelectItem>
                  )}
                </Select>
                <Input
                  label="Potensi Kerugian"
                  labelPlacement="outside"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">Rp.</span>
                    </div>
                  }
                  isRequired
                  type="number"
                  placeholder="1000000"
                  isInvalid={!!errors.potential_disadvantages}
                  errorMessage={errors.potential_disadvantages}
                  value={data.potential_disadvantages}
                  onChange={(e) => {
                    setData("potential_disadvantages", e.target.value);
                    if (errors.potential_disadvantages) {
                      setError("potential_disadvantages", "");
                    }
                  }}
                />
              </div>
            </div>
            <Button
              disabled={processing}
              type="submit"
              className="w-full md:w-auto"
            >
              Simpan
            </Button>
          </form>
        </div>
      </DashboardLayout>
    </>
  );
};

export default identificationsPage;
