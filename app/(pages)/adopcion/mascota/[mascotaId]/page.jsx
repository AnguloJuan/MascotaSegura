import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }) {
    const { mascotaId } = params;
    const mascota = await prisma.mascota.findUnique({
        where: {
            id: parseInt(mascotaId)
        }
    });
    return (
        <>
            <div className="mascota">
                <p>Nombre: {mascota.nombre}</p>
                <p>Edad: {mascota.edad}</p>
                <p>Sexo: {mascota.sexo}</p>
            </div>
        </>
    )
}