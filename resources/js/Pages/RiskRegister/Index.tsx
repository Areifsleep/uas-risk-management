import { Head } from "@inertiajs/react";

import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Input } from "@nextui-org/input";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Button } from "@/Components/ui/button";

const identificationsPage = () => {
  return (
    <>
      <Head title="Identifications" />
      <DashboardLayout>
        <div>
          <form className="space-y-5">
            <div>
              <h1 className="text-2xl font-semibold mb-3">Identifikasi Risiko</h1>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  isRequired
                  placeholder="Masukkan nama risiko"
                  labelPlacement="outside"
                  label="Nama Risiko"
                />
                <Input
                  type="text"
                  isRequired
                  placeholder="Masukkan deskripsi risiko"
                  labelPlacement="outside"
                  label="Deskripsi Risiko"
                />
                <Select
                  label="Fakultas"
                  labelPlacement="outside"
                  placeholder="Pilih Fakultas"
                  isRequired
                >
                  <SelectItem value="1">1</SelectItem>
                </Select>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-3">Nilai Inherent Risiko</h1>
              <div className="flex flex-col md:flex-row gap-4">
                <Select
                  label="Likelihood"
                  labelPlacement="outside"
                  placeholder="Pilih Likelihood"
                  isRequired
                >
                  <SelectItem value="1">1</SelectItem>
                </Select>
                <Select
                  label="Impact"
                  labelPlacement="outside"
                  placeholder="Pilih Impact"
                  isRequired
                >
                  <SelectItem value="1">1</SelectItem>
                </Select>
                <Input
                  type="text"
                  label="Level Of Risk"
                  isRequired
                  isReadOnly
                  placeholder="Level Of Risk"
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-3">Lainnya</h1>
              <div className="flex  gap-4">
                <Select
                  label="Sumber"
                  labelPlacement="outside"
                  placeholder="Pilih Likelihood"
                  isRequired
                >
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="external">External</SelectItem>
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
                />
              </div>
            </div>
            <Button
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
