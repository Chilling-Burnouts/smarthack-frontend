import { useEffect } from "react";

import { getUser } from "@src/auth";
import { ICompany } from "@src/containers/search-company/defs";
import { login } from "@src/redux/auth";
import { useAppDispatch } from "@src/redux/hooks";
import { addCompany } from "@src/redux/portfolio";

export const Auth: React.FC = () => {
  const user = getUser();

  const dispatch = useAppDispatch();

  const companies: ICompany[] = [
    {
      uuid: "f446ab95-59a9-495b-a731-c559c9dff710",
      company_name: "Tesla",
      naics_2022: {
        primary: {
          code: "221118",
          label: "Other Electric Power Generation",
        },
      },
      main_country_code: "US",
      business_tags: [
        "Electric Cars",
        "Electric Vehicle",
        "Solar Roofing",
        "Clean Energy",
        "Sustainable Energy",
        "Battery Energy Storage",
        "Solar Panels And Solar Roof",
        "Battery Storage",
        "Renewable Energy Solutions",
        "Photovoltaic  Systems",
      ],
      long_description:
        "Tesla, Inc. ( or ) is an American multinational automotive and clean energy company headquartered in Austin, Texas. Tesla designs and manufactures electric vehicles (electric cars and trucks), battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services. Tesla is one of the world's most valuable companies and remains the world's most valuable automaker with a market capitalization of more than US$840 billion. In 2021, the company had the most worldwide sales of battery electric vehicles and plug-in electric vehicles, capturing 21% of the battery-electric (purely electric) market and 14% of the plug-in market (which includes plug-in hybrids). Through its subsidiary Tesla Energy, the company develops and is a major installer of photovoltaic systems in the United States. Tesla Energy is also one of the largest global suppliers of battery energy storage systems, with 3.99 gigawatt-hours (GWh) installed in 2021. Tesla was incorporated in July 2003 by Martin Eberhard and Marc Tarpenning as Tesla Motors. The company's name is a tribute to inventor and electrical engineer Nikola Tesla. In February 2004, via a $6.5 million investment, Elon Musk became the largest shareholder of the company. He has served as CEO since 2008. According to Musk, the purpose of Tesla is to help expedite the move to sustainable transport and energy, obtained through electric vehicles and solar power. Tesla began production of its first car model, the Roadster sports car, in 2009. This was followed by the Model S sedan in 2012, the Model X SUV in 2015, the Model 3 sedan in 2017, and the Model Y crossover in 2020. The Model 3 is the all-time bestselling plug-in electric car worldwide, and, in June 2021, became the first electric car to sell 1 million units globally. Tesla's global sales were 936,222 cars in 2021, an 87% increase over the previous year, and cumulative sales totaled 3 million cars as of August 2022. In October 2021, Tesla's market capitalization reached $1 trillion, the sixth company to do so in U.S. history.",
      short_description:
        "Tesla Energy is also one of the largest global suppliers of battery energy storage systems, with 3.99 gigawatt-hours (GWh) installed in 2021.",
    },
    {
      uuid: "abb16a3b-2c78-4882-9f42-31c6de169572",
      company_name: "Ford",
      naics_2022: {
        primary: {
          code: "336110",
          label: "Automobile and Light Duty Motor Vehicle Manufacturing",
        },
      },
      main_country_code: "US",
      business_tags: [
        "Luxury Car",
        "Automobile Manufacturer",
        "Engine Manufacturing",
      ],
      long_description:
        "Ford Motor Company (commonly known as Ford) is an American multinational automobile manufacturer headquartered in Dearborn, Michigan, United States. It was founded by Henry Ford and incorporated on June 16, 1903. The company sells automobiles and commercial vehicles under the Ford brand, and luxury cars under its Lincoln luxury brand. Ford also owns Brazilian SUV manufacturer Troller, an 8% stake in Aston Martin of the United Kingdom and a 32% stake in China's Jiangling Motors. It also has joint ventures in China (Changan Ford), Taiwan (Ford Lio Ho), Thailand (AutoAlliance Thailand), Turkey (Ford Otosan), and Russia (Ford Sollers). The company is listed on the New York Stock Exchange and is controlled by the Ford family; they have minority ownership but the majority of the voting power. Ford introduced methods for large-scale manufacturing of cars and large-scale management of an industrial workforce using elaborately engineered manufacturing sequences typified by moving assembly lines; by 1914, these methods were known around the world as Fordism. Ford's former UK subsidiaries Jaguar and Land Rover, acquired in 1989 and 2000 respectively, were sold to the Indian automaker Tata Motors in March 2008. Ford owned the Swedish automaker Volvo from 1999 to 2010. In 2011, Ford discontinued the Mercury brand, under which it had marketed entry-level luxury cars in the United States, Canada, Mexico, and the Middle East since 1938.",
      short_description:
        "Ford Motor Company (commonly known as Ford) is an American multinational automobile manufacturer headquartered in Dearborn, Michigan, United States.",
    },
  ];

  useEffect(() => {
    for (const company of companies) {
      dispatch(addCompany(company));
    }
  }, []);

  if (user) {
    dispatch(login());
  }

  return null;
};
