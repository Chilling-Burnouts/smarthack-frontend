import { Layout } from "@src/components/layout";
import { SearchCompany } from "@src/containers/search-company";

const SearchPage: React.FC = () => {
  return (
    <Layout>
      <SearchCompany />
    </Layout>
  );
};

export default SearchPage;
