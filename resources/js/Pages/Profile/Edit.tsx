import { Head } from "@inertiajs/react";

import { PageProps } from "@/types";
import { Card } from "@/Components/ui/card";
import { DashboardLayout } from "@/Layouts/DashboardLayout";

import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({
    mustVerifyEmail,
    status,
    auth,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <DashboardLayout>
            <Head title={`${auth.user.name}`} />
            <div className="py-10">
                <div className="space-y-5">
                    <Card className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="w-full"
                        />
                    </Card>

                    <Card className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="w-full" />
                    </Card>

                    {/* <Card className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="w-full" />
                    </Card> */}
                </div>
            </div>
        </DashboardLayout>
    );
}
