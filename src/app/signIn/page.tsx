"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Form } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { signIn } from "@/services/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function SignInPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            await signIn(data.email, data.password);
            toast.success("Sign-in successfully, Welcome back");
            router.push('/');
        } catch (error: any) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            reset();
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <Card className="w-full max-w-md shawdow-xl bg-white p-6">
                <CardHeader className="text-center py-6">
                    <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 text-gray-600">         
                        <Input
                            {...register("email")}
                            label="Email"
                            type="email"
                            variant="faded"
                            size="lg"
                            isRequired
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        <Input
                            {...register("password")}
                            label="Paasword"
                            type="password"
                            variant="faded"
                            size="lg"
                            isRequired
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        <Button
                            isLoading={loading}
                            color="success"
                            size="lg"
                            type="submit"
                            className="mt-4"
                        >
                            Sign In
                        </Button>
                        <small>Don't have an Account <Link href={'/signUp'}>Sign Up</Link></small>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )

}