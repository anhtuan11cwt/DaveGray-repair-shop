import * as Sentry from "@sentry/nextjs";
import CustomerSearch from "@/app/(rs)/customers/customer-search";
import CustomerTable from "@/app/(rs)/customers/customer-table";
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
    return (
      <div>
        <CustomerSearch />
      </div>
    );
  }

  const span = Sentry.startInactiveSpan({
    name: "getCustomerSearchResults-2",
  });

  const results = await getCustomerSearchResults(searchText);

  span.end();

  return (
    <div>
      <CustomerSearch />
      {results.length > 0 ? (
        <CustomerTable data={results} />
      ) : (
        <p className="mt-4">Không tìm thấy kết quả</p>
      )}
    </div>
  );
}
