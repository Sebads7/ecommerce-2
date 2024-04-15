"use client";

import { useEffect, useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/products/Heading";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (currentUser) {
      timeoutId = setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 3000); // 2000 milliseconds (2 seconds) timeout
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentUser, router]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged in");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return (
      <div className="text-center">
        <p>You are logged in...</p>
        <p>Redirecting</p>
      </div>
    );
  }

  return (
    <>
      <Heading title="Login in to E~Shop" />
      <Button
        small={false}
        outline
        label="Login wth Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <hr className="bg-slate-300 w-full h-px" />

      <Input
        type="text"
        id="email"
        label="Email"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Login in"}
        small={false}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Do not have an account? <Link href="/register"> Sign Up</Link>
      </p>
    </>
  );
};

export default LoginForm;
