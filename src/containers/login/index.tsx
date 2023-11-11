import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@src/src/components/button";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "./schema";

import * as yup from "yup";
import Input from "@src/src/components/input";
import { useCallback } from "react";

type FormValues = yup.InferType<typeof schema>;

export const Login: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),

    mode: "all",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  console.log(errors);

  const onSubmit = useCallback(async (data: FormValues) => {
    console.log(data);
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
                placeholder="Your password"
                error={errors.password?.message}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
