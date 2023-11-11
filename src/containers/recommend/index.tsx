import axios from "axios";
import { useEffect } from "react";

import { useAppSelector } from "@src/redux/hooks";

export const Recommend: React.FC = () => {
  const portfolioState = useAppSelector((state) => state.portfolio);

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

      console.log({ response });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(portfolioState);

  useEffect(() => {
    if (portfolioState.portfolio.length === 0) {
      return;
    }

    fetchRecommendations();
  }, [portfolioState.portfolio.length]);

  return <h5>Hi</h5>;
};
