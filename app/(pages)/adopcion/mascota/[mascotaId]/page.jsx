
//import React, { cache, use } from "react";
/*
const getMascota = cache(() =>
    fetch("/api/mascotas", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, telefono, municipio, password }),
    }).then((res) => res.json())
);*/
/*async function getMascota(mascotaId){
    let mascota;
    fetch("http://localhost:3000/api/mascotas", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mascotaId }),
    }).then((res) => mascota = res.json())
    return mascota;
}*/

import { GetMascota } from "@/app/lib/getMascota";
import Adoptar from "./adoptar";
import { GetUser } from "@/app/lib/user";
import visualizar from "../../mascota.module.css"
import rescate from "../../mascota.module.css"
import proceso from "../../mascota.module.css"
import Input from "@/components/Input";
import Image from "next/image";
import RedirectUser from "@/app/(pages)/redirectUser";
import EstadoAdopcion from "./estadoAdopcion";


export default async function Page({ params }) {
    const { mascotaId } = params;
    let mascota = await GetMascota(mascotaId);
    const user = GetUser();
    const adoptante = user.id;
    const userType = user.idUserType;
    return (
        userType == (1 || 2 || 3) ? <RedirectUser />
            : (
                <>
                    {userType == 1 ? (
                        <center><h1>Información de la mascota</h1></center>
                    ) : (
                        <center><h1>Proceso de adopcion</h1></center>
                    )}
                    <div className={visualizar}>
                        <div className={visualizar.contenedorAdoptante}>

                            <div className={visualizar.perfil}>
                                <Image
                                    src={"/images/perro1.jpg"}
                                    alt='mascota.png'
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className={visualizar.informacion}>

                                <p>Nombre: {mascota.nombre}</p>
                                <p>Especie: {mascota.especie.especie}</p>
                                <p>Raza: {mascota.raza}</p>


                            </div>

                        </div>


                        <div className={visualizar.contenedor}>
                            <div className={visualizar.busqueda}>
                                <p>Edad: {mascota.edad}</p>

                            </div>
                            <div className={visualizar.busqueda}>
                                <p>Sexo: {mascota.sexo}</p>

                            </div>
                            <div className={visualizar.busqueda}>
                                <p>Tamaño</p>
                            </div>
                            <div className={visualizar.busqueda}>
                                <p>Ha sido maltratado? {mascota.maltratado ? "Sí" : "No"}
                                </p>
                            </div>

                        </div>

                        <div className={rescate.contendor}>
                            <p className={rescate.cartilla}> Cuenta con cartilla de vacunación: {mascota.cartilla ? "Sí" : "No"} </p>
                        </div>
                        {/* Muestra adoptante */}
                                <div>
                                    <h3>Persona adoptante</h3>
                                    <p>id: {mascota.adopcion.adoptante.id}</p>
                                    <p>Nombre: {mascota.adopcion.adoptante.nombre}</p>
                                    <p>correo: {mascota.adopcion.adoptante.correo}</p>
                                </div>

                                {userType == 2 || 3 ? (<EstadoAdopcion userId={mascota.adopcion.adoptante.id} adopcionId={mascota.adopcion.id} estadoAdopcion={mascota.adopcion.estadoAdopcion.estadoAdopcion} />)
                                    :
                                    mascota.adoptante.id == adoptante ? (
                                        <div className={proceso.buton}>
                                            <button className="btn btn-primary btn-lg">Cancelar adopcion</button>
                                        </div>
                                    ) : (

                                        < div className={rescate.buton}>
                                            <Adoptar mascotaId={mascota.id} adoptanteId={adoptante} />
                                        </div>
                                    )
                                }

                        <br />
                        <div className={rescate.contenedordatos}>
                            <p>Anteriores adopciones</p>
                            <br />
                            <Input id={"descripcion"} label={"Motivo de abandono"} placeholder={"motivo"} />
                        </div>

                    </div >
                </>
            )
    )
}