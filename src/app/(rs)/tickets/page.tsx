import TicketSearch from "@/app/(rs)/tickets/ticket-search";
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
        <p>{JSON.stringify(results)}</p>
      </div>
    );
  }

  const results = await getTicketSearchResults(searchText);
  return (
    <div>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </div>
  );
}
