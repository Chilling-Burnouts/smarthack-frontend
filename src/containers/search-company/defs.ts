export interface ICompany {
  uuid: string;
  long_description: string;
  short_description: string;
  company_name: string;
  naics_2022: {
    primary: {
      code: string;
      label: string;
    };
  };
  business_tags: string[];
  main_country_code: string;
}
