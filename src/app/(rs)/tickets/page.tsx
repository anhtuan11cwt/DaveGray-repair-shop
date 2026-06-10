import TicketSearch from "@/app/(rs)/tickets/ticket-search";
import TicketTable from "@/app/(rs)/tickets/ticket-table";
import { getOpenTickets } from "@/lib/queries/get-open-tickets";
import { getTicketSearchResults } from "@/lib/queries/get-ticket-search-results";

export const metadata = {
  title: "Tìm kiếm phiếu sửa chữa",
};

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <div>
        <TicketSearch />
        {results.length > 0 ? (
          <TicketTable data={results} />
        ) : (
          <p className="mt-4">Không tìm thấy ticket đang mở</p>
        )}
      </div>
    );
  }

  const results = await getTicketSearchResults(searchText);
  return (
    <div>
      <TicketSearch />
      {results.length > 0 ? (
        <TicketTable data={results} />
      ) : (
        <p className="mt-4">Không tìm thấy kết quả</p>
      )}
    </div>
  );
}
