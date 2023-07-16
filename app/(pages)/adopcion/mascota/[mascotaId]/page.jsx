
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
import { getPrisma } from "@/app/lib/prisma";
import MascotaPage from "./mascota";

const prisma = getPrisma();

export default async function Page({ params }) {
    const { mascotaId } = params;
    const mascota = await GetMascota(mascotaId);
    const especies = await prisma.especie.findMany();
    /*const refugio = await prisma.refugio.findUnique({
        where: {
            id: mascota.idRefugio,
        }
    })*/
    const user = GetUser();
    const userId = user.id;
    const userType = user.idTipoUsuario;
    return (
        userType == 0 ? <RedirectUser />
            : (
                <>
                    {(userType == (2 || 3) && mascota.adopcion) ? (
                        <center><h1>Proceso de adopcion</h1></center>
                    ) : (
                        <center><h1>Información de la mascota</h1></center>
                    )}

                    {userType == (2 || 3) ? (<MascotaPage especies={especies} mascotaInicial={mascota} />) : (

                        <div>
                            <div className={visualizar.contenedorAdoptante}>
                                <div className={visualizar.perfil}>
                                    {mascota.imagen ? (
                                        <Image
                                            src={`/images/mascotas/${mascota.imagen}`}
                                            alt='mascota.png'
                                            width={200}
                                            height={200}
                                        />
                                    ) : (
                                        <Image
                                            src={"/images/dogIcon.png"}
                                            alt='mascota.png'
                                            width={200}
                                            height={200}
                                        />

                                    )}
                                </div>

                                <div className={visualizar.informacion}>
                                    <p>Nombre: {mascota.nombre}</p>
                                    <p>Especie: {mascota.especie.especie}</p>
                                    <p>Raza: {mascota.raza}</p>
                                </div>
                            </div>
                            <div className={visualizar.contenedor}>
                                <p>Edad: {mascota.edad}</p>
                                <p>Sexo: {mascota.sexo.sexo}</p>
                                <p>Tamaño</p>
                                <p>Ha sido maltratado? {mascota.maltratado ? "Sí" : "No"}</p>
                            </div>

                            <div className={rescate.contendor}>
                                <p className={rescate.cartilla}> Cuenta con cartilla de vacunación: {mascota.cartilla ? "Sí" : "No"} </p>
                            </div>
                            {/* Muestra adoptante */}
                            {mascota.adopcion && (
                                <div className={visualizar.contenedorAdoptante}>
                                    <div className={visualizar.perfil}>
                                        <Image
                                            src={"/images/adoptante1.jpg"}
                                            alt='mascota.png'
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                    <div className={visualizar.informacion}>
                                        <h3>Persona adoptante</h3>
                                        <p>id: {mascota.adopcion.adoptante.id}</p>
                                        <p>Nombre: {mascota.adopcion.adoptante.nombre}</p>
                                        <p>correo: {mascota.adopcion.adoptante.correo}</p>

                                    </div>

                                </div>
                            )}

                            {userType == (2 || 3) && mascota.adopcion ? (
                                <EstadoAdopcion
                                    userId={mascota.adopcion.adoptante.id}
                                    adopcionId={mascota.adopcion.id}
                                    estadoAdopcion={mascota.adopcion.estadoAdopcion.estadoAdopcion} />

                            ) : mascota.adopcion && mascota.adopcion.adoptante.id == userId ? (
                                <div className={proceso.buton}>
                                    <button className="btn btn-primary btn-lg">Cancelar adopcion</button>
                                </div>
                            ) : (
                                < div className={rescate.buton}>
                                    <Adoptar mascotaId={mascota.id} adoptanteId={userId} />
                                </div>
                            )}

                            <br />
                            <div className={rescate.contenedordatos}>
                                <p>Anteriores adopciones</p>
                                <Input id={"descripcion"} label={"Motivo de abandono"} placeholder={"motivo"} />
                            </div>

                        </div >
                    )}
                </>
            )
    )
}