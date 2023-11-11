import { useState } from "react";

const CompanySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyData, setCompanyData] = useState(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to fetch company data
    // setCompanyData(fetchedData);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search for a company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded shadow-sm"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
      {companyData && <div>{/* Render company data here */}</div>}
    </div>
  );
};

export default CompanySearch;
