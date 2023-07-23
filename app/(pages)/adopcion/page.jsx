import { getPrisma } from "@/app/lib/prisma";
import ListaMascota from "./listaMascota";
import { GetUser } from "@/app/lib/user";

const prisma = getPrisma();

export default async function Adopcion() {
    const user = GetUser();
    const mascotas = await prisma.mascota.findMany({
        include: {
            sexo: true,
        },
        where: {
            adopcion: user.idTipoUsuario === (0 || 1) ? { is: null } : undefined, // Excluir mascotas en adopción si el usuario es adoptante o sin registro
        }
    });
    const especies = await prisma.especie.findMany();
    const razas = await prisma.mascota.findMany({
        select: {
            id: true,
            raza: true,
        },
        distinct: "raza",
    });
    //const edades = await prisma.edades.findMany();
    return (
        <>
            <center><h2>Lista de mascotas</h2></center>
            <ListaMascota inicialMascotas={mascotas} especies={especies} razas={razas} userType={user.idTipoUsuario} />
        </>
    )
}