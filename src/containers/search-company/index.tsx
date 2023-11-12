import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Button } from "@src/components/button";
import { Companies } from "@src/components/companies";
import { Input } from "@src/components/input";
import { PageLoader } from "@src/components/page-loader";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { addCompany } from "@src/redux/portfolio";

import { ICompany } from "./defs";
import { schema } from "./schema";

type FormValues = yup.InferType<typeof schema>;

export const SearchCompany: React.FC = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const portfolioState = useAppSelector((state) => state.portfolio);

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const tags = [
    {
      name: "IT - New",
      path: "/new-it",
    },
    {
      name: "Big earners",
      path: "/big",
    },
    {
      name: "Green Energy",
      path: "/green",
    },
  ] as {
    name: string;
    path: string;
  }[];

  const searchFromTag = async (path: string) => {
    setCompanies([]);
    setIsLoading(true);
    reset();

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/companies/search${path}`
      );

      const companies = response.data.result as ICompany[];

      const filteredCompanies = companies.filter(
        (comp) =>
          !portfolioState.portfolio.some(
            (company) => company.company_name === comp.company_name
          )
      );

      setCompanies(filteredCompanies);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const searchCompanies = async (data: FormValues) => {
    setCompanies([]);
    setIsLoading(true);

    reset();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/companies/search`,
        {
          companyName: data.name,
        }
      );

      const companies = response.data.result as ICompany[];

      const filteredCompanies = companies.filter(
        (comp) =>
          !portfolioState.portfolio.some(
            (company) => company.company_name === comp.company_name
          )
      );

      setCompanies(filteredCompanies);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const onAddCompany = useCallback(async (company: ICompany) => {
    setIsLoading(true);

    dispatch(addCompany(company));

    setCompanies((prev) =>
      prev.filter((c) => c.company_name !== company.company_name)
    );

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
              autoComplete="off"
              id="name"
              placeholder="Enter company name"
            />

            <div className="mt-4">
              <span className="text-sm font-medium text-white mb-1 block">
                Quick Search:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Button
                    key={index}
                    type="button"
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => searchFromTag(tag.path)}
                  >
                    {tag.name}
                  </Button>
                ))}
              </div>
            </div>

            <Button className="mt-4" type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>
        </FormProvider>
      </div>

      <div className="mt-5">
        {companies.length > 0 && (
          <Companies companies={companies} onAddCompany={onAddCompany} />
        )}
      </div>
    </div>
  );
};
