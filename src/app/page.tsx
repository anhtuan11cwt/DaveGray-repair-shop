import { redirect } from "next/navigation";

// Redirect trang chủ đến trang tickets
export default function Home() {
  redirect("/tickets");
}
