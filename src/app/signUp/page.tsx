"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Form } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { signUp } from "@/services/auth";
import { toast } from "react-toastify";


const schema = z.object({
    fullName: z.string().min(2, "Full Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            await signUp(data.email, data.password);
            toast.success("Account created successfully, Please Verify your email address");
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
                    <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 text-gray-600">
                        <Input
                            {...register("fullName")}
                            label="Full Name"
                            variant="faded"
                            size="lg"
                            isRequired
                        />
                        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
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
                            variant="faded"
                            type="password"
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
                            Sign Up
                        </Button>
                        <small>Have an Account <Link href={'/signIn'}>Sign In</Link></small>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )

}