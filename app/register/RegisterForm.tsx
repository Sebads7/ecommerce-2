"use client";

import { useEffect, useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/products/Heading";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/products/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onSubmit",
    defaultValues: { name: "", email: "", password: "" },
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
    setIsLoading(true), console.log(data);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged in");
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("An error occurred"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return (
      <div className="text-center">
        <p>You are already logged in...</p>
        <p>Redirecting</p>
      </div>
    );
  }

  return (
    <>
      <Heading title="Sign up for E~Shop" />
      <Button
        small={false}
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
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
        label={isLoading ? "Loading" : "Sign Up"}
        small={false}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account? <Link href="/login"> Log in</Link>
      </p>
    </>
  );
};

export default RegisterForm;
