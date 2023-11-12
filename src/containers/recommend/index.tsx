import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Companies } from "@src/components/companies";
import { PageLoader } from "@src/components/page-loader";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { addCompany } from "@src/redux/portfolio";

import { ICompany } from "../search-company/defs";

export const Recommend: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<ICompany[]>([]);
  const dispatch = useAppDispatch();

  const portfolioState = useAppSelector((state) => state.portfolio);

  const onAddCompany = useCallback(async (company: ICompany) => {
    setIsLoading(true);

    dispatch(addCompany(company));

    setRecommendations((prev) =>
      prev.filter((c) => c.company_name !== company.company_name)
    );

    toast.success("Successfully added company to portfolio.");

    setIsLoading(false);
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DRAGOS_API_URL}/companies/recommended_portfolio`,
        {
          data: portfolioState.portfolio.map((company) => ({
            main_country: "United States",
            business_tags: company.business_tags,
            long_description: company.long_description,
            naics2022: company.naics_2022.primary.code,
          })),
        }
      );

      const recomms = response.data.recommended_companies;

      const mappedRecommendations = recomms.map((item: any) => ({
        long_description: item.long_description,
        short_description: item.short_description,
        company_name: item.company_name,
        naics_2022: {
          primary: {
            code: item.naics_2022.primary.code,
            label: item.naics_2022.primary.label,
          },
        },
        business_tags: item.business_tags,
        main_country_code: item.main_country_code,
      })) as ICompany[];

      const filteredRecommendations = mappedRecommendations.filter(
        (comp) =>
          !portfolioState.portfolio.some(
            (company) => company.company_name === comp.company_name
          )
      );

      setRecommendations(filteredRecommendations);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (portfolioState.portfolio.length === 0) {
      return;
    }

    fetchRecommendations();
  }, [portfolioState.portfolio.length]);

  return (
    <div>
      {isLoading && <PageLoader />}
      <div className="p-4">
        {recommendations && (
          <Companies companies={recommendations} onAddCompany={onAddCompany} />
        )}
      </div>
    </div>
  );
};
