import { productsURL } from "@/config/navConfig";
import { redirect } from "next/navigation";
export default async function Home() {
  redirect(productsURL);
}
