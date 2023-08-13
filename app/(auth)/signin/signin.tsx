"use client";
import Input from "@/components/input";
import { Dialog } from "@/components/dialogs";
import { deleteCookie, hasCookie, setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Estados } from "@/components/selects";
import { Municipios } from "@/components/selectsClient";
import { estado } from "@prisma/client";

export default function SignIn({ estados }: { estados: Array<estado> }) {
    const router = useRouter()
    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: 0,
        estado: 0,
        municipio: 0,
        contrasena: "",
    })
    const [errorEmailDilog, setErrorEmailDialog] = useState(false);
    const [errorServidorDialog, setErrorServidorDialog] = useState(false);
    const [fieldsFilledDialog, setFieldsFilledDialog] = useState(false);
    const [registradoDialog, setRegistradoDialog] = useState(false);

    const aux: any = null;
    const [image, setImage] = useState(aux);
    const [createObjectURL, setCreateObjectURL] = useState(String);


    // Function to handle input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if ((name == 'telefono') && parseInt(value) < 0) {
            return;
        }
        setUser((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    };

    const handleEstadoChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUser((prevCriteria) => ({ ...prevCriteria, [name]: value }));
        // Reset selected municipio when estado reporte
        setUser((prevCriteria) => ({ ...prevCriteria, municipio: 0 }));
    };

    const handleMunicipioChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setUser((prevCriteria) => ({ ...prevCriteria, municipio: parseInt(value) }));
    };

    const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();

        if (!user.nombre || !user.apellido || !user.correo || !user.telefono || isNaN(user.telefono) || !user.municipio || !user.contrasena) {
            setFieldsFilledDialog(true);
        } else {
            try {
                const body = new FormData();
                body.set("user", JSON.stringify(user));

                if (image) {
                    //subir imagen a cloudinary
                    body.set("file", image);
                    body.set("upload_preset", 'mascotaSegura');

                    const data = await fetch('https://api.cloudinary.com/v1_1/dyvwujin9/image/upload', {
                        method: 'POST',
                        body
                    }).then(r => r.json());

                    body.set("image", data.secure_url);
                } else {
                    body.set("image", "null");
                }

                // Make an HTTP POST request to the sign-in API route
                const response = await fetch('/api/auth/signin', {
                    method: 'POST',
                    body,
                });
                if (response.ok) {
                    if (hasCookie('token')) {
                        deleteCookie('token');
                    }
                    // Sign-in successful, perform any necessary actions (e.g., redirect)
                    response.json().then(
                        response => setCookie('token', response.token)
                    )

                    setRegistradoDialog(true);
                    router.replace('/')
                } else {
                    // Handle sign-in error
                    console.error('Sign-in failed');
                    response.json().then(
                        response => console.error(response.message)
                    )
                    if (response.status == 409) {
                        setErrorEmailDialog(true);
                    }
                    if (response.status == 500) {
                        setErrorServidorDialog(true);
                    }
                }

            } catch (error) {
                console.error('An error occurred');
                setErrorServidorDialog(true);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSignIn} className="w-2/3 flex flex-col" >
                <h1 className="font-medium text-2xl text-center mb-4">Crear cuenta</h1>
                <div className="self-center">
                    <div className="flex flex-col">
                        <label htmlFor="perfil">Imagen de perfil <span className="font-light text-gray-400">(Opcional)</span></label>
                        <div className={"w-fit bg-gray-300 rounded flex flex-col justify-center items-center"}>
                            {image ? (
                                <Image
                                    width={200}
                                    height={200}
                                    src={createObjectURL}
                                    alt="upload image" />
                            ) : (
                                <Image
                                    width={200}
                                    height={200}
                                    src={"/images/defaultUser.png"}
                                    alt="upload image" />
                            )}
                            <input id="perfil" type="file" name="perfil" onChange={uploadToClient} accept="image/*, .jpg, .png, .svg, .webp, .jfif"
                                className="block w-full rounded border-2 border-gray-400 border-opacity-75 focus:border-cyan-400 focus:border-opacity-100 focus:outline-0 focus:shadow-lg focus:ring-2 transition-color transition ease-in
                            file:mr-4 file:py-2 file:px-4
                            file:border-0 file:border-r file:border-gray-300
                            file:bg-violet-50
                            hover:file:bg-violet-100" />
                        </div>
                    </div>
                </div>

                <div className="flex md:w-full flex-col sm:flex-row gap-1">
                    <Input id={"nombre"} type={"text"} label={"Nombre"} placeholder={"Nombre"}
                        onChange={handleInputChange} name="nombre" value={user.nombre} />

                    <Input id={"apellido"} type={"text"} label={"Apellidos"} placeholder={"Apellidos"}
                        onChange={handleInputChange} name="apellido" value={user.apellido} />
                </div>

                <div className="flex md:w-full flex-col sm:flex-row gap-1">
                    <div className="my-3 flex flex-col gap-1 w-full ">
                        <label htmlFor="estados" className="form-label">Estado</label>
                        <Estados estados={estados} handleChange={handleEstadoChange} value={user.estado} />
                    </div>
                    <div className="my-3 flex flex-col gap-1 w-full ">
                        <label htmlFor="municipios" className="form-label">Municipio</label>
                        <Municipios selectedEstado={user.estado} value={user.municipio} handleChange={handleMunicipioChange} />
                    </div>
                </div>

                <div className="flex md:w-full flex-col sm:flex-row gap-1">
                    <Input id={"telefono"} type={"number"} label={"Teléfono"} placeholder={"Teléfono"}
                        onChange={handleInputChange} name="telefono" value={(user.telefono).toString()} />

                    <Input id={"correo"} type={"correo"} label={"Correo electrónico"} placeholder={"Correo electrónico"}
                        onChange={handleInputChange} name="correo" value={user.correo} />
                </div>

                <Input id={"contrasena"} type={"contrasena"} label={"Contraseña"} placeholder={"Contraseña"}
                    onChange={handleInputChange} name="contrasena" value={user.contrasena} />

                <button type="submit" className="py-2 px-4 my-3 bg-red-500 hover:bg-red-600 text-white rounded items-center w-full">Crear cuenta</button>
                <br />
                <p className="my-3 text-center self-center px-2 w-auto">Ya tienes cuenta? <Link href={"/login"} className="text-blue-500">Iniciar sesión</Link></p>
            </form>

            <Dialog id={"errorEmail"}
                isOpen={errorEmailDilog}
                onClose={() => setErrorEmailDialog(false)}
            >
                <h1>Error al registrarse</h1>
                <p>Ya se registrado una cuenta con ese correo</p>
            </Dialog>
            <Dialog
                id={"errorServidor"}
                isOpen={errorServidorDialog}
                onClose={() => setErrorServidorDialog(false)}
            >
                <h1>Error de servidor</h1>
                <p>Ocurrió un error de servidor</p>
                <p>Vuelve a intentar más tarde</p>
            </Dialog>
            <Dialog
                id={"errorCampos"}
                isOpen={fieldsFilledDialog}
                onClose={() => setFieldsFilledDialog(false)}
            >
                <h1>Error</h1>
                <p>Rellene todos los campos primero</p>
            </Dialog>
            <Dialog
                id={"registrado"}
                isOpen={registradoDialog}
                onClose={() => setRegistradoDialog(false)}
            >
                <h1>Registro exitoso</h1>
                <p>Espere un momento en lo que carga la pagina</p>
            </Dialog>
        </>
    )
}