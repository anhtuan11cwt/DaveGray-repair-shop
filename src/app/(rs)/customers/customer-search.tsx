import SearchButton from "@/components/search-button";
import { Input } from "@/components/ui/input";

export default function CustomerSearch() {
  return (
    <form action="/customers" method="GET" className="flex items-center gap-2">
      <Input
        name="searchText"
        type="text"
        placeholder="Tìm kiếm khách hàng"
        className="w-full"
        autoFocus
      />
      <SearchButton />
    </form>
  );
}
