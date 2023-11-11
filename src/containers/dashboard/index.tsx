import { addCompany, usePortfolioState } from "@src/redux/portfolio";

import { riskLevelColors, getRiskLevelColor } from "./utils";
import { useAppDispatch } from "@src/redux/store";
import { useEffect } from "react";
import { portfolio } from "@src/mocks/portfolio";

import { Loader } from "@src/components/loader";

export const Dashboard: React.FC = () => {
  const portfolioState = usePortfolioState();

  const dispatch = useAppDispatch();

  useEffect(() => {
    for (const company of portfolio) {
      dispatch(addCompany(company));
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <ul>
        {portfolioState.portfolio.map((company, index) => (
          <li
            key={index}
            className={`flex items-center p-4 mb-4 rounded-lg shadow-lg overflow-hidden ${
              company.riskLevel
                ? riskLevelColors[company.riskLevel]
                : "bg-white"
            }`}
          >
            <div className="flex-grow">
              <h2 className="text-xl font-bold mb-2">{company.name}</h2>

              {company.news ? (
                <div className="mb-4">
                  <h3 className="font-semibold">Latest News:</h3>
                  <p className="text-gray-700">{company.news}</p>
                </div>
              ) : null}

              {company.riskLevel ? (
                <div className="flex items-center">
                  <h3 className="font-semibold mr-2">Estimated Risk Level:</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold shadow-sm`}
                    style={{
                      backgroundColor: getRiskLevelColor(company.riskLevel),
                    }}
                  >
                    {company.riskLevel.toUpperCase()}
                  </span>
                </div>
              ) : null}

              {!company.news && !company.riskLevel ? (
                <div className="flex justify-center">
                  <Loader />
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
