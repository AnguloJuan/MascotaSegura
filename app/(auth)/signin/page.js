"use client";
import Input from "@/components/Input";
import Image from "next/image";
import { useState } from "react";

export default function signin() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        telefono: '',
        municipio: '',
        password: ''
    });

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            // Make an HTTP POST request to the sign-in API route
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Sign-in successful, perform any necessary actions (e.g., redirect)
                console.log('Sign-in successful');
            } else {
                // Handle sign-in error
                console.error('Sign-in failed');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };


    return (
        <form action="Post">
            <h1>Crear cuenta</h1>
            <>
                <Image
                    src={"/images/logo.png"}
                    alt='logo.png'
                    width={300}
                    height={187}
                    priority={true}
                />
            </>
            <Input id={"name"} type={"text"} label={"Nombre"} placeholder={"Nombre"} />
            <Input id={"lastName"} type={"text"} label={"Apellidos"} placeholder={"Apellidos"} />
            <Input id={"email"} type={"email"} label={"Correo electrónico"} placeholder={"Correo electrónico"} />
            <Input id={"password"} type={"password"} label={"Contraseña"} placeholder={"Contraseña"} />
            <Input id={"telefono"} type={"text"} label={"Teléfono"} placeholder={"Teléfono"} />
            <Input id={"estado"} type={"text"} label={"Estado"} placeholder={"Estado"} />
            <Input id={"municipio"} type={"text"} label={"Nombre"} placeholder={"Nombre"} />
            <button type="submit">Crear cuenta</button>
        </form>
    )
}