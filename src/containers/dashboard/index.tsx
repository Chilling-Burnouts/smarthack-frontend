import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { GradientBar } from "@src/components/gradient-bar";
import { Loader } from "@src/components/loader";
import { Modal } from "@src/components/modal";
import { StockChart } from "@src/components/stock-chart";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import {
  removeCompany,
  selectCompany,
  updateCompany,
} from "@src/redux/portfolio";

import { IPortfolioCompany } from "./defs";

export const Dashboard: React.FC = () => {
  const portfolioState = useAppSelector((state) => state.portfolio);
  const dispatch = useAppDispatch();

  const fetchTicker = async (company: IPortfolioCompany) => {
    const encodedCompanyName = encodeURIComponent(company.company_name);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COSMIN_API_URL}/ticker?company_name=${encodedCompanyName}`
    );

    const ticker = response.data.ticker;

    dispatch(updateCompany({ ...company, ticker }));

    return ticker;
  };

  const fetchNews = async (company: IPortfolioCompany) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COSMIN_API_URL}/news/summarized?ticker=${company.ticker}`
    );
    const news = response.data.news;
    dispatch(updateCompany({ ...company, news }));
  };

  const fetchSentiment = async (company: IPortfolioCompany) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COSMIN_API_URL}/sentiment?ticker=${company.ticker}`
    );
    const sentiment = response.data.sentiment;

    dispatch(
      updateCompany({
        ...company,
        sentiment: {
          label: sentiment.label,
          value: sentiment.score,
        },
      })
    );
  };

  const fetchTimeSeries = async (company: IPortfolioCompany) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COSMIN_API_URL}/timeseries/daily?ticker=${company.ticker}`
    );

    const timeSeries = response.data.timeseries;

    dispatch(updateCompany({ ...company, timeSeries }));
  };

  const refetchCompany = async (company: IPortfolioCompany) => {
    dispatch(updateCompany({ ...company, isRefetching: true }));

    if (!company.ticker) {
      const ticker = await fetchTicker(company);

      dispatch(updateCompany({ ...company, ticker, isRefetching: true }));

      company = { ...company, ticker };
    }

    await Promise.all([
      fetchNews(company),
      fetchSentiment(company),
      fetchTimeSeries(company),
    ]);

    dispatch(updateCompany({ ...company, isRefetching: false }));
  };

  useEffect(() => {
    if (portfolioState.portfolio.length === 0) {
      return;
    }

    const refreshAll = async () => {
      for (const company of portfolioState.portfolio) {
        refetchCompany(company);
      }
    };

    refreshAll();
  }, [portfolioState.portfolio.length === 0]);

  const onStockGraphOpen = (company: IPortfolioCompany) => {
    dispatch(selectCompany(company));
  };

  const onDeleteCompany = (company: IPortfolioCompany) => {
    dispatch(removeCompany(company));

    dispatch(selectCompany(null));

    toast.success("Successfully removed company from portfolio.");
  };

  const onModalClose = () => dispatch(selectCompany(null));

  return (
    <div className="flex justify-center items-center">
      <div className="container mx-auto p-4">
        <ul className="overflow-auto align-middle">
          {portfolioState.portfolio.length === 0 && (
            <div className="flex text-white items-center justify-center h-screen">
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2">
                  You have no companies in your portfolio.
                </h2>
                <h5>Add a company to your portfolio to get started.</h5>
              </div>
            </div>
          )}

          {Boolean(portfolioState.selectedCompany) && (
            <Modal onClose={onModalClose}>
              <StockChart
                timeSeries={portfolioState.selectedCompany!.timeSeries!}
              />
            </Modal>
          )}

          {portfolioState.portfolio.map((company, index) => {
            return (
              <li
                key={index}
                className={`relative flex items-center p-4 mb-4 rounded-lg shadow-lg overflow-hidden bg-white`}
              >
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-bold mb-2 flex flex-col">
                      {company.company_name}
                      {company.ticker ? (
                        <span className="text-sm">{company.ticker}</span>
                      ) : null}
                    </h2>

                    <div className="mr-16 align-center space-x-2">
                      <button
                        onClick={() => onDeleteCompany(company)}
                        className={`${
                          company.isRefetching
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        } text-white px-3 py-1 rounded `}
                      >
                        <Image
                          src="/delete.svg"
                          width={20}
                          height={20}
                          alt="Delete"
                        />
                      </button>
                      <button
                        disabled={company.isRefetching}
                        onClick={() => refetchCompany(company)}
                        className={`${
                          company.isRefetching
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                    } text-white px-3 py-1 rounded`}
                      >
                        <Image
                          src="/refresh.svg"
                          width={20}
                          height={20}
                          alt="Refresh"
                        />
                      </button>

                      {company.timeSeries && (
                        <button
                          onClick={() => onStockGraphOpen(company)}
                          className="text-white px-3 py-1 rounded"
                        >
                          <Image
                            src="/stock.svg"
                            width={20}
                            height={20}
                            alt="Stock graph"
                          />
                        </button>
                      )}
                    </div>
                  </div>

                  <hr />

                  {!company.news && <h5>Currently fetching the news...</h5>}

                  <div className="flex">
                    {company.news ? (
                      <div className="mb-4">
                        <h3 className="font-semibold text-xl">Latest News:</h3>
                        {company.news.map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col space-y-2 mt-2"
                          >
                            <Link href={item.url}>
                              <h4 className="font-semibold text-blue-600 hover:text-blue-800 underline">
                                {item.title}
                              </h4>
                            </Link>
                            <p>{item.summary}</p>
                            {index !== company.news!.length - 1 && <hr />}
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div
                      style={{
                        width: "1200px",
                        marginRight: "100px",
                      }}
                      className=" flex justify-center items-center"
                    >
                      {company.sentiment && company.news ? (
                        <div className="flex items-center justify-center h-2/5">
                          <GradientBar
                            sentimentValue={company.sentiment.value}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {!company.news && (
                    <div className="flex justify-center">
                      <Loader />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
