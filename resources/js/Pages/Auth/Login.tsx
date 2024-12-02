import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

import { ButtonWithLogo } from "@/Components/ButtonWithLogo";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in">
                <link
                    rel="preload"
                    href="images/vector-login.webp"
                    as="image"
                />
            </Head>
            <div className=" w-full h-screen bg-muted grid grid-cols-1 lg:grid-cols-2">
                <div className="flex h-full items-center justify-center">
                    <div className="p-5 space-y-11">
                        <ApplicationLogo />
                        <div>
                            <h1 className="text-4xl font-extrabold">Hallo,</h1>
                            <h2 className="text-4xl font-extrabold">
                                Selamat Datang Kembali
                            </h2>
                            <p className="mt-3 text-muted-foreground text-sm">
                                Kelola Risiko dengan Bijak, Wujudkan Kesuksesan!
                            </p>
                        </div>

                        <div>
                            {status && (
                                <div className="mb-4 text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 block">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span className="ms-2 text-sm text-gray-600">
                                            Remember me
                                        </span>
                                    </label>
                                </div>

                                <div className="mt-4">
                                    <ButtonWithLogo disabled={processing}>
                                        Log in
                                    </ButtonWithLogo>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <img
                        loading="eager"
                        className="h-full "
                        src="/images/vector-login.webp"
                        alt="tes"
                    />
                </div>
            </div>
        </>
    );
}
