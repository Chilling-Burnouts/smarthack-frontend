export interface IPortfolioCompany {
  id: string;
  name: string;

  news?: string;
  riskLevel?: "low" | "medium" | "high";

  details?: IPortfolioCompanyDetails;
}

export interface IPortfolioCompanyDetails {
  naics2022: string;
  main_country: string;
  business_tags: string[];
  long_description: string;
}
