export interface IPortfolioCompany {
  id: string;

  name: string;

  news?: string;
  riskLevel?: "low" | "medium" | "high";
}
