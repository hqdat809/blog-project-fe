"use client";

import { authApiRequest } from "@/apiRequests/auth";
import FormInput from "@/components/FormInput";
import { handleApiError } from "@/lib/helpers";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();

  const methods = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function RegisterUserFunction(credentials: RegisterUserInput) {
    try {
      const result = await authApiRequest.register(credentials);

      await authApiRequest.auth(result.payload);

      console.log(result);

      toast.success("Logged in successfully");
      return router.push("/profile");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) {
        handleApiError(error);
      } else {
        toast.error(error.message);
        console.log("Error message:", error.message);
      }
    } finally {
      await authApiRequest.test();
    }
  }

  const onSubmitHandler: SubmitHandler<RegisterUserInput> = (values) => {
    console.log(values);
    RegisterUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5 shadow-slate-800"
      >
        <FormInput label="Name" name="name" type="text" />
        <FormInput label="Email" name="email" type="email" />
        <FormInput label="Password" name="password" type="password" />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
        />

        <div className="text-right">
          <Link href="#" className="">
            Forgot Password?
          </Link>
        </div>
        <button className="w-full py-3 font-semibold rounded-lg outline-none border-none flex justify-center bg-slate-800 text-white">
          Register
        </button>
        <span className="block">
          You had account??
          <Link href="/login" className="text-ct-blue-600">
            Login Here
          </Link>
        </span>
      </form>
    </FormProvider>
  );
}
