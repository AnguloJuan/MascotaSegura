"use client"
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();

    // Clear the authentication token from cookies or local storage
    deleteCookie('token');
    // Redirect the user to the login page
    router.push('/login');

    return null; // Render nothing on the logout page
}
