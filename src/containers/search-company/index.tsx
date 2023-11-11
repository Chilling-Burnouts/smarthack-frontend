import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@src/components/button";
import { Input } from "@src/components/input";
import { PageLoader } from "@src/components/page-loader";
import { addCompany, usePortfolioState } from "@src/redux/portfolio";
import { useAppDispatch } from "@src/redux/store";

import { ICompany } from "./defs";
import { schema } from "./schema";
import { toast } from "react-toastify";

type FormValues = yup.InferType<typeof schema>;

export const SearchCompany: React.FC = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const portfolioState = usePortfolioState();

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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCompanies([
      {
        id: "1",
        name: "Company 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nulla nec nisl aliquam aliquet. Nulla facilisi. Donec nec nisl eget odio tincidunt luctus. Nulla facilisi. Donec nec nisl eget odio tincidunt luctus.",
      },
      {
        id: "2",
        name: "Company 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nulla nec nisl aliquam aliquet. Nulla facilisi. Donec nec nisl eget odio tincidunt luctus. Nulla facilisi. Donec nec nisl eget odio tincidunt luctus.",
      },
    ]);

    reset();

    setIsLoading(false);
  };

  const onAddCompany = useCallback(async (company: ICompany) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch(addCompany(company));

    setCompanies((prev) => prev.filter((c) => c.id !== company.id));

    toast.success("Successfully added company to portfolio.");

    setIsLoading(false);
  }, []);

  return (
    <div className="p-6">
      {isLoading ? <PageLoader /> : null}

      <div className="bg-secondary rounded px-8 pt-6 pb-8 mb-4">
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
                      <h3 className="text-xl font-bold">{company.name}</h3>
                      <p className="text-sm text-gray-500">
                        {company.description}
                      </p>
                    </div>
                    <Button onClick={() => onAddCompany(company)}>
                      Add to portfolio
                    </Button>
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
