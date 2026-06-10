import SearchButton from "@/components/search-button";
import { Input } from "@/components/ui/input";

export default function TicketSearch() {
  return (
    <form action="/tickets" method="GET" className="flex items-center gap-2">
      <Input
        name="searchText"
        type="text"
        placeholder="Tìm kiếm phiếu sửa chữa"
        className="w-full"
      />
      <SearchButton />
    </form>
  );
}
