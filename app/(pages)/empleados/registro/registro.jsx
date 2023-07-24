"use client";
import Input from "@/components/Input";
import { Dialog } from "@/components/dialogs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegistroEmpleado() {
    const router = useRouter()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [NIP, setNIP] = useState("");
    const [tipoEmpleado, setTipoEmpleado] = useState(0);

    const [isErrorEmail, setIsErrorEmail] = useState(false);
    const [isErrorServidor, setIsErrorServidor] = useState(false);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);
    const [isRegistrado, setIsRegistrado] = useState(false);

    const registrarEmpleado = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !telefono || isNaN(telefono) || !password) {
            setIsFieldsFilled(true);
        } else {
            try {
                // Make an HTTP POST request to the sign-in API route
                const response = await fetch('/api/empleado', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName, lastName, email, telefono, NIP, tipoEmpleado, password }),
                });
                if (response.status == 201) {
                    setIsRegistrado(true);
                    response.json().then(
                        response => (router.replace(`/empleados/empleado/${response.user.id}`))
                    )

                } else {
                    // Handle sign-in error
                    console.error('register failed');
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

    return (
        <>
            <form onSubmit={registrarEmpleado} >
                <h1>Registro de empleado</h1>
                <>
                    <center>
                        <Image
                            src={"/images/logo.png"}
                            alt='logo.png'
                            width={300}
                            height={187}
                            priority={true}
                        />
                    </center>
                </>

                <Input id={"name"} type={"text"} label={"Nombre"} placeholder={"Nombre"}
                    onChange={(e) => setFirstName(e.target.value)} />

                <Input id={"lastName"} type={"text"} label={"Apellidos"} placeholder={"Apellidos"}
                    onChange={(e) => setLastName(e.target.value)} />

                <Input id={"telefono"} type={"text"} label={"Teléfono"} placeholder={"Teléfono"}
                    onChange={(e) => setTelefono(e.target.value)} />

                <Input id={"email"} type={"email"} label={"Correo electrónico"} placeholder={"Correo electrónico"}
                    onChange={(e) => setEmail(e.target.value)} />

                <Input id={"NIP"} type={"text"} label={"NIP"} placeholder={"NIP"}
                    onChange={(e) => setNIP(e.target.value)} />

                <Input id={"password"} type={"password"} label={"Contraseña"} placeholder={"Contraseña"}
                    onChange={(e) => setPassword(e.target.value)} />

                <div className="input mb-3 mt-3">
                    <label htmlFor="tipoEmpleado" className="form-label">Tipo empleado</label>
                    <select
                        id="tipoEmpleado"
                        onChange={(e) => setTipoEmpleado(e.target.value)}
                        name="tipoEmpleado"
                        className="form-select">
                        <option value="">Selecciona el tipo empleado</option>
                        <option value={2}>Empleado</option>
                        <option value={3}>Administrador</option>
                    </select>
                </div>

                <center><button type="submit" className="btn btn-primary mb-3 btn-lg">Registrar empleado</button></center>
                <br />

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