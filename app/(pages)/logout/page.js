'use client'
import { deleteCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    if (hasCookie('user')) {
      deleteCookie('user');
    }
    router.replace("/login");
  }, []);
}
