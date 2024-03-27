'use client'
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function LogoutContext({deleteCookie}) {
    const { logOut } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        deleteCookie();
        logOut();
        router.replace("/login");
    }, []);
}