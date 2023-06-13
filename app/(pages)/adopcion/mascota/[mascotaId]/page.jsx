
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

export default async function Page({ params }) {
    const { mascotaId } = params;
    let mascota = await GetMascota(mascotaId);
    const user = GetUser();
    const adoptante = user.id;

    return (
        <>
            <center><h1>Información de la mascota</h1></center>

            <div className="mascota">
                <p>Nombre: {mascota.nombre}</p>
                <p>Edad: {mascota.edad}</p>
                <p>Sexo: {mascota.sexo}</p>
                <p>Adoptado: {mascota.adopcion ? 1 : 0}</p>
                <p>{mascota.adopcion ? `Adoptante: ${mascota.adopcion.adoptante.nombre}` : ""}</p>
            </div>
            <Adoptar mascotaId={mascota.id} adoptanteId={adoptante} />
        </>
    )
}