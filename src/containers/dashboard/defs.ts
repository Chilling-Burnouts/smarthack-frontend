import { ICompany } from "../search-company/defs";

export interface IPortfolioCompany extends ICompany {
  news?: {
    title: string;
    url: string;
    summary: string;
  }[];

  riskLevel?: "low" | "medium" | "high";

  sentiment?: {
    label:
      | "Bearish"
      | "Somewhat-Bearish"
      | "Neutral"
      | "Somewhat-Bullish"
      | "Bullish";
    value: number;
  };

  ticker?: string;
  timeSeries?: Record<string, any>;

  isRefetching?: boolean;
}
