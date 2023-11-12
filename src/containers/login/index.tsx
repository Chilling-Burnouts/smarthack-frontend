import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { setUser } from "@src/auth";
import { Button } from "@src/components/button";
import { Input } from "@src/components/input";
import { login } from "@src/redux/auth";
import { useAppDispatch } from "@src/redux/hooks";

import { schema } from "./schema";

type FormValues = yup.InferType<typeof schema>;

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),

    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = useCallback(async (data: FormValues) => {
    router.push("/portfolio");

    dispatch(login());

    setUser({
      username: data.username,
    });

    toast.success("Successfully logged in.");
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-2/5 p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Your username"
                className="w-full"
                error={errors.username?.message}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                className="w-full"
                placeholder="Your password"
                error={errors.password?.message}
              />
            </div>
            <div className="flex justify-center">
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
