import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Button } from "@src/components/button";
import { Input } from "@src/components/input";
import { PageLoader } from "@src/components/page-loader";
import { useAppDispatch } from "@src/redux/hooks";
import { addCompany } from "@src/redux/portfolio";

import { ICompany } from "./defs";
import { schema } from "./schema";

type FormValues = yup.InferType<typeof schema>;

export const SearchCompany: React.FC = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  console.log({ errors });

  const searchCompanies = async (data: FormValues) => {
    setCompanies([]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/companies/search`,
        {
          companyName: data.name,
        }
      );

      const companies = response.data.result as ICompany[];

      console.log({ companies });

      setCompanies(companies);
    } catch (err) {
      console.log(err);
    }

    reset();

    setIsLoading(false);
  };

  const onAddCompany = useCallback(async (company: ICompany) => {
    setIsLoading(true);

    // const result = await axios.post(
    //   `${process.env.NEXT_PUBLIC_API_URL}/companies`,
    //   company
    // );

    dispatch(addCompany(company));

    setCompanies((prev) => prev.filter((c) => c.uuid !== company.uuid));

    toast.success("Successfully added company to portfolio.");

    setIsLoading(false);
  }, []);

  return (
    <div className="p-6">
      {isLoading ? <PageLoader /> : null}

      <div className="rounded px-8 pt-6 pb-8 mb-4">
        <FormProvider {...form}>
          <form
            className="flex flex-col container"
            onSubmit={handleSubmit(searchCompanies)}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white mb-1"
            >
              Company name
            </label>
            <Input
              id="name"
              placeholder="Enter company name"
              error={errors.name?.message}
            />

            <Button className="mt-4" type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>
        </FormProvider>
      </div>

      <div className="mt-5">
        {companies.length > 0 && (
          <div>
            <hr className="p-4" />

            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
              <ul>
                {companies.map((company, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-200 py-3 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-bold">
                        {company.company_name}
                      </h3>
                      <p className="text-sm text-gray-500 max-w-5xl">
                        {company.long_description}
                      </p>
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => onAddCompany(company)}
                    >
                      <Image
                        alt="Add"
                        priority
                        src="/add.svg"
                        height={32}
                        width={32}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
