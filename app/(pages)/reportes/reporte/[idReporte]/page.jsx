import { getPrisma } from "@/app/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Reporte from "./reporte";
import { GetUser } from "@/app/lib/user";

const prisma = getPrisma();

export default async function PerfilPage({ params }) {
    const { idReporte } = params;
    const user = GetUser();
    const userType = user.idTipoUsuario;
    const reporte = await prisma.reporte.findUnique({
        where: {
            id: parseInt(idReporte),
        },
        include: {
            municipio: true,
            estadoReporte: true,
        }
    });

    const estados = await prisma.estado.findMany();
    const municipios = await prisma.municipio.findMany({
        where: {
            idEstado: reporte.municipio.idEstado,
        },
    });

    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }
    const day = pad(new Date(reporte.fechaCreada).getDay(), 2);
    const month = pad(new Date(reporte.fechaCreada).getMonth(), 2);
    const year = new Date(reporte.fechaCreada).getFullYear();
    const date = `${year}-${month}-${day}`;

    const props = { reporte, user, userType, estados, municipios, date }
    return (
        (userType == 2 || userType == 3) ? <Reporte props={props} /> : (
            <>

            </>
        )
    )
}
