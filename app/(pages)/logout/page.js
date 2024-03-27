import LogoutContext from "./logoutContext";
import { cookies } from "next/headers";

async function deleteCookie() {
  "use server";
  cookies().delete("user");
}

export default async function LogoutPage() {
  return <LogoutContext deleteCookie={deleteCookie} />;
}
