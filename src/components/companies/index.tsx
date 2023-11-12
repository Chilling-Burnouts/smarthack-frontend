import Image from "next/image";

import { ICompany } from "@src/containers/search-company/defs";

export interface ICompaniesProps {
  companies: ICompany[];
  onAddCompany: (company: ICompany) => void;
}

export const Companies: React.FC<ICompaniesProps> = ({
  companies,
  onAddCompany,
}) => {
  if (companies.length === 0) return null;

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <ul>
        {companies.map((company, index) => (
          <li
            key={index}
            className="border-b border-gray-200 py-3 flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-bold">{company.company_name}</h3>
              <p className="text-sm text-gray-500 max-w-5xl">
                {company.long_description}
              </p>
            </div>
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => onAddCompany(company)}
            >
              <Image alt="Add" priority src="/add.svg" height={32} width={32} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
