"use client"
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from 'cookies-next';

export default function LogIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogIn = async (e) => {
        e.preventDefault();

        try {
            // Make an HTTP POST request to the log-in API route
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                response.json().then (
                    response => setCookie('token', response.token)
                )

                router.replace('/')
            } else {
                // Handle log-in error
                console.error('Log-in failed');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

    return (
        <>
            <form onSubmit={handleLogIn}>
                <h1>Iniciar sesión</h1>
                <>
                    <Image
                        src={"/images/logo.png"}
                        alt='logo.png'
                        width={400}
                        height={250}
                        priority={true}
                    />
                </>
                <Input id={"email"} type={"email"} label={"Correo electrónico"} placeholder={"Correo electrónico"}
                    onChange={(e) => setEmail(e.target.value)} />

                <Input id={"password"} type={"password"} label={"Contraseña"} placeholder={"Contraseña"}
                    onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="btn btn-primary mb-3">Iniciar sesión</button>
                <Link href={"/signin"}>Crear cuenta</Link>
            </form>
        </>
    )
}