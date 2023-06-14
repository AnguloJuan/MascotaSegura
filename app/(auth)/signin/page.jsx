"use client";
import Input from "@/components/Input";
import { Dialog } from "@/components/dialogs";
import { deleteCookie, hasCookie, setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function SignIn() {
    const router = useRouter()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [selectedEstado, setSelectedEstado] = useState('');
    const [selectedMunicipio, setSelectedMunicipio] = useState('');
    const [estados, setEstados] = useState([]);
    const [municipios, setMunicipios] = useState("");
    const [password, setPassword] = useState("");
    const [isErrorEmail, setIsErrorEmail] = useState(false);
    const [isErrorServidor, setIsErrorServidor] = useState(false);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [isRegistrado, setIsRegistrado] = useState(false);

    /*const handleEstadoChange = (event) => {
        setSelectedEstado(event.target.value);
        // Reset selected municipio when estado changes
        setSelectedMunicipio('');
    };*/

    const handleMunicipioChange = (event) => {
        setSelectedMunicipio(event.target.value);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !telefono || !municipios || !password) {
            setIsFieldsFilled(true);
        } else {
            try {
                console.log(selectedMunicipio);
                // Make an HTTP POST request to the sign-in API route
                const response = await fetch('/api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName, lastName, email, telefono, municipios, password }),
                });
                if (response.ok) {
                    if (hasCookie('token')) {
                        deleteCookie('token');
                    }
                    // Sign-in successful, perform any necessary actions (e.g., redirect)
                    response.json().then(
                        response => setCookie('token', response.token)
                    )

                    setIsRegistrado(true);
                    router.replace('/')
                } else {
                    // Handle sign-in error
                    console.error('Sign-in failed');
                    response.json().then(
                        response => console.log(response.message)
                    )
                    if (response.status == 409) {
                        setIsErrorEmail(true);
                    }
                    if (response.status == 500) {
                        console.error('An error occurred', message);
                        setIsErrorServidor(true);
                    }
                }

            } catch (error) {
                console.error('An error occurred', message);
                setIsErrorServidor(true);
            }
        }
    };

    useEffect(() => {
        // Fetch estados data from the API
        fetch('/api/estados')
            .then((response) => response.json())
            .then((data) => setMunicipios(data.municipios))
            .catch((error) => console.error('Error fetching estados:', error));
    }, []);

    /*useEffect(() => {
        // Fetch municipios data based on selected estado from the API
        /*if (selectedEstado) {
            fetch(`/api/municipios?estado=${selectedEstado}`)
                .then((response) => response.json())
                .then((data) => setMunicipios(data.municipios))
                .catch((error) => console.error('Error fetching municipios:', error));
        }
        
        // Define an async function to wrap your code
        async function fetchData() {
            console.log(selectedEstado);
            try {
                const response = await fetch(`/api/municipios?estado=${selectedEstado}`);
                if (response.ok) {
                    const data = await response.json();
                    // Process the data
                } else {
                    throw new Error('Error fetching estados: ' + response.status);
                }
            } catch (error) {
                console.error(error);
                // Handle the error gracefully (display an error message, etc.)
            }
        }

        // Call the async function
        fetchData();
    }, [selectedEstado]);*/


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

                {/*<label htmlFor="estado">Estado:</label>
                <select id="estado" value={selectedEstado} onChange={handleEstadoChange}>
                    <option value="">Selecciona Estado</option>
                    {estados.map((estado) => (
                        <option key={estado.id} value={estado.id}>
                            {estado.nombre}
                        </option>
                    ))}
                </select>*/}

                {/*<label htmlFor="municipio">Municipio:</label>
                <select id="municipio" value={selectedMunicipio} onChange={handleMunicipioChange}>
                    <option value="">Selecciona Municipio</option>
                    {/* Render municipio options based on selected estado /}
                    {municipios.map((municipio) => (
                        <option key={municipio.id} value={municipio.id}>
                            {municipio.nombre}
                        </option>
                    ))}
                </select>*/}

                <Input id={"municipio"} type={"text"} label={"Municipio"} placeholder={"Municipio"}
                    onChange={(e) => setMunicipios(e.target.value)} />

                <Input id={"email"} type={"email"} label={"Correo electrónico"} placeholder={"Correo electrónico"}
                    onChange={(e) => setEmail(e.target.value)} />

                <Input id={"password"} type={"password"} label={"Contraseña"} placeholder={"Contraseña"}
                    onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="btn btn-primary mb-3">Crear cuenta</button>
                <br />
                <p>Ya tienes cuenta? <Link href={"/login"}>Iniciar sesión</Link></p>

            </form>
            <Dialog id={"errorEmail"}
                isOpen={isErrorEmail}
                onClose={() => setIsErrorEmail(false)}
            >
                <h1>Error al registrarse</h1>
                <p>Ya se registrado una cuenta con ese correo</p>
            </Dialog>
            <Dialog
                id={"errorServidor"}
                isOpen={isErrorServidor}
                onClose={() => setIsErrorServidor(false)}
            >
                <h1>Error de servidor</h1>
                <p>Ocurrió un error de servidor</p>
                <p>Vuelve a intentar más tarde</p>
            </Dialog>
            <Dialog
                id={"errorCampos"}
                isOpen={isFieldsFilled}
                onClose={() => setIsFieldsFilled(false)}
            >
                <h1>Error</h1>
                <p>Rellene todos los campos primero</p>
            </Dialog>
            <Dialog
                id={"registrado"}
                isOpen={isRegistrado}
                onClose={() => setIsRegistrado(false)}
            >
                <h1>Registro exitoso</h1>
                <p>Espere un momento en lo que carga la pagina</p>
            </Dialog>
        </>
    )
}