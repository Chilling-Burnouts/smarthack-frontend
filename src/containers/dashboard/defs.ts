import { ICompany } from "../search-company/defs";

export interface IPortfolioCompany extends ICompany {
  news?: string;
  riskLevel?: "low" | "medium" | "high";

  ticker?: string;
  timeSeries?: Record<string, any>;
}
