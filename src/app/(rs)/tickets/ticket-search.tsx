import SearchButton from "@/components/search-button";
import { Input } from "@/components/ui/input";

// Form tìm kiếm phiếu sửa chữa - GET request đến /tickets?searchText=
export default function TicketSearch() {
  return (
    <form action="/tickets" method="GET" className="flex items-center gap-2">
      <Input
        name="searchText"
        type="text"
        placeholder="Tìm kiếm phiếu sửa chữa"
        className="w-full"
        autoFocus
      />
      <SearchButton />
    </form>
  );
}
