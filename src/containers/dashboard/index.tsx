import axios from "axios";
import { useEffect, useState } from "react";

import { Loader } from "@src/components/loader";
import { Modal } from "@src/components/modal";
import { StockChart } from "@src/components/stock-chart";
import {
  selectCompany,
  updateCompany,
  usePortfolioState,
} from "@src/redux/portfolio";
import { useAppDispatch } from "@src/redux/store";

import { IPortfolioCompany } from "./defs";
import { getRiskLevelColor } from "./utils";

export const Dashboard: React.FC = () => {
  const portfolioState = usePortfolioState();
  const dispatch = useAppDispatch();

  const [isStockGraphOpen, setIsStockGraphOpen] = useState(false);

  const refetchCompany = async (company: IPortfolioCompany) => {
    const responseTicker = await axios.get(
      `${process.env.NEXT_PUBLIC_COSMIN_API_URL}/ticker?company_name=${company.company_name}`
    );

    const ticker = responseTicker.data.ticker;

    const responseTimeSeries = await axios.get(
      `${process.env.NEXT_PUBLIC_COSMIN_API_URL}/timeseries/daily?ticker=${ticker}`
    );

    const timeSeries = responseTimeSeries.data.timeseries;

    dispatch(
      updateCompany({
        ...company,
        ticker,
        timeSeries,
        news: "nu prea",
        riskLevel: "low",
      })
    );
  };

  useEffect(() => {
    if (portfolioState.portfolio.length === 0) {
      return;
    }

    refetchCompany(portfolioState.portfolio[0]);
    // for (const company of portfolioState.portfolio) {
    //   refetchCompany(company)
    // }
  }, [portfolioState.portfolio.length === 0]);

  console.log(portfolioState.portfolio[0]);
  console.log("^");

  const onStockGraphOpen = (company: IPortfolioCompany) => {
    setIsStockGraphOpen(true);
    dispatch(selectCompany(company));
  };

  const onModalClose = () => dispatch(selectCompany(null));

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

          {Boolean(portfolioState.selectedCompany) && (
            <Modal onClose={onModalClose}>
              <StockChart
                timeSeries={portfolioState.selectedCompany!.timeSeries!}
              />
            </Modal>
          )}

          {portfolioState.portfolio.map((company, index) => {
            const isLoading = !company.news && !company.riskLevel;

            return (
              <li
                key={index}
                className={`relative flex items-center p-4 mb-4 rounded-lg shadow-lg overflow-hidden bg-white`}
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
                  <h2 className="text-2xl font-bold mb-2 flex flex-col">
                    {company.company_name}{" "}
                    {company.ticker ? (
                      <span className="text-sm">{company.ticker}</span>
                    ) : null}
                  </h2>

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

                    <button
                      onClick={() => onStockGraphOpen(company)}
                      className="bg-green-500 text-white px-3 py-1 rounded shadow"
                    >
                      See stock graph
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
