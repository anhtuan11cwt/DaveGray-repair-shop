import CustomerSearch from "@/app/(rs)/customers/customer-search";
import { getCustomerSearchResults } from "@/lib/queries/get-customer-search-results";

export const metadata = {
  title: "Tìm kiếm khách hàng",
};

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    return <CustomerSearch />;
  }

  const results = await getCustomerSearchResults(searchText);

  return (
    <div>
      <CustomerSearch />
      <p>{JSON.stringify(results)}</p>
    </div>
  );
}
