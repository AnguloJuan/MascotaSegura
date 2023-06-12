import InputLabel from "@/components/Input";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

async function getMascotas() {
    const mascotas = await prisma.mascota.findMany();
    return mascotas;
}

export default async function Adopcion() {
    const mascotas = await getMascotas();
    return (
        <>
            <h1>Lista de mascotas</h1>
            <InputLabel id={"Nombre"} label={"Nombre"} placeholder={"nombre"} />

            {mascotas.map((mascota) => (
                <Link key={mascota.id} href={`/adopcion/mascota/${mascota.id}`}>
                    <div className="mascota">
                        <p>Nombre: {mascota.nombre}</p>
                        <p>Edad: {mascota.edad}</p>
                        <p>Sexo: {mascota.sexo}</p>
                    </div>
                </Link>
            ))}
        </>
    )
}