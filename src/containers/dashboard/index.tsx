import { Loader } from "@src/components/loader";
import { usePortfolioState } from "@src/redux/portfolio";

import { riskLevelColors, getRiskLevelColor } from "./utils";

export const Dashboard: React.FC = () => {
  const portfolioState = usePortfolioState();

  return (
    <div className="flex justify-center items-center">
      <div className="container mx-auto p-4">
        <ul className="overflow-auto align-middle">
          {portfolioState.portfolio.length === 0 && (
            <li className="flex items-center p-4 mb-4 rounded-lg shadow-lg overflow-hidden bg-white">
              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-2">
                  You have no companies in your portfolio.
                </h2>
                <h5 className="text-gray-700">
                  Add a company to your portfolio to get started.
                </h5>
              </div>
            </li>
          )}
          {portfolioState.portfolio.map((company, index) => {
            const isLoading = !company.news && !company.riskLevel;

            return (
              <li
                key={index}
                className={`relative flex items-center p-4 mb-4 rounded-lg shadow-lg overflow-hidden ${
                  company.riskLevel
                    ? riskLevelColors[company.riskLevel]
                    : "bg-white"
                }`}
              >
                <div
                  style={
                    isLoading
                      ? {
                          pointerEvents: "none",
                          opacity: 0.5,
                          userSelect: "none",
                        }
                      : undefined
                  }
                  className="flex-grow"
                >
                  <h2 className="text-xl font-bold mb-2">{company.name}</h2>

                  {isLoading && <h5>Currently fetching the news...</h5>}

                  {company.news ? (
                    <div className="mb-4">
                      <h3 className="font-semibold">Latest News:</h3>
                      <p className="text-gray-700">{company.news}</p>
                    </div>
                  ) : null}

                  {company.riskLevel ? (
                    <div className="flex items-center">
                      <h3 className="font-semibold mr-2">
                        Estimated Risk Level:
                      </h3>
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

                  {isLoading && (
                    <div className="flex justify-center">
                      <Loader />
                    </div>
                  )}
                </div>

                {!isLoading && (
                  <div className="absolute top-0 right-0 mt-2 mr-2 space-x-2">
                    <button className="bg-red-500 text-white px-3 py-1 rounded shadow">
                      Delete
                    </button>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded shadow">
                      Refresh
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
