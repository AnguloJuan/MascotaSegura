"use client";
import Input from "@/components/Input";
import { ErrorDialog } from "@/components/dialogs";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SignIn() {
    const router = useRouter()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [password, setPassword] = useState("");
    const dialog = document.getElementById('errorEmail');

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            // Make an HTTP POST request to the sign-in API route
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, telefono, municipio, password }),
            });
            if (response.ok) {
                // Sign-in successful, perform any necessary actions (e.g., redirect)
                response.json().then (
                    response => setCookie('token', response.token)
                )
                
                router.replace('/')
            } else {
                // Handle sign-in error
                console.error('Sign-in failed');
                response.json().then(
                    response => console.log(response.message)
                )
                if (response.status == 409) {
                    dialog.showModal();
                }
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };


    return (
        <>
            <form onSubmit={handleSignIn} >
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
                <Input id={"name"} type={"text"} label={"Nombre"} placeholder={"Nombre"}
                    onChange={(e) => setFirstName(e.target.value)} />

                <Input id={"lastName"} type={"text"} label={"Apellidos"} placeholder={"Apellidos"}
                    onChange={(e) => setLastName(e.target.value)} />

                <Input id={"telefono"} type={"text"} label={"Teléfono"} placeholder={"Teléfono"}
                    onChange={(e) => setTelefono(e.target.value)} />

                <Input id={"municipio"} type={"text"} label={"Municipio"} placeholder={"Municipio"}
                    onChange={(e) => setMunicipio(e.target.value)} />

                <Input id={"email"} type={"email"} label={"Correo electrónico"} placeholder={"Correo electrónico"}
                    onChange={(e) => setEmail(e.target.value)} />

                <Input id={"password"} type={"password"} label={"Contraseña"} placeholder={"Contraseña"}
                    onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="btn btn-primary mb-3">Crear cuenta</button>
            </form>
            <ErrorDialog id={"errorEmail"}>
                <p>Ya se registrado una cuenta con ese correo</p>
            </ErrorDialog>
        </>
    )
}