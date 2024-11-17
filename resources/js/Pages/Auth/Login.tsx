import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

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
        <div className=" w-full h-screen bg-muted">
            <Head title="Log in" />
            <div className="h-full flex items-center justify-center">
                <Card className="w-[420px] ">
                    <CardHeader>
                        <img
                            className="size-64 mx-auto"
                            src="https://iro.umy.ac.id/wp-content/uploads/2021/12/Logo-Uin-Sunan-Kalijaga-300x300.png"
                            alt=""
                        />
                    </CardHeader>
                    <CardContent>
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
                                    <Button
                                        className="w-full items-center justify-center gap-1"
                                        disabled={processing}
                                    >
                                        <img
                                            src="https://static.uin-suka.ac.id/images/ico-hover.png"
                                            alt="button-icon"
                                            className="size-4"
                                        />
                                        Log in
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <p className="text-center w-full text-muted-foreground text-sm font-semibold">
                            &copy; {new Date().getFullYear()} by
                            <span className="font-bold">EduRisk</span> team
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
