"use client"
import { useRouter } from 'next/navigation';

export default function RedirectUser() {
    const router = useRouter();

    // Redirect the user to the login page
    router.push('/login');

    return null; // Render nothing on the page
}
