import { Input } from "@nextui-org/input";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useRef } from "react";

import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

export default function UpdatePasswordForm({
    className = "",
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        setError,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                    />

                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => {
                            setData("current_password", e.target.value);
                            if (errors.current_password) {
                                setError("current_password", "");
                            }
                        }}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        isRequired
                        isInvalid={!!errors.current_password}
                        errorMessage={errors.current_password}
                    />

                    {/* <InputError
                        message={errors.current_password}
                        className="mt-2"
                    /> */}
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New Password" />

                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => {
                            setData("password", e.target.value);
                            if (errors.password) {
                                setError("password", "");
                            }
                        }}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isRequired
                        isInvalid={!!errors.password}
                        errorMessage={errors.password}
                    />

                    {/* <InputError message={errors.password} className="mt-2" /> */}
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => {
                            setData("password_confirmation", e.target.value);
                            if (errors.password_confirmation) {
                                setError("password_confirmation", "");
                            }
                        }}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isRequired
                        isInvalid={!!errors.password_confirmation}
                        errorMessage={errors.password_confirmation}
                    />

                    {/* <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    /> */}
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
