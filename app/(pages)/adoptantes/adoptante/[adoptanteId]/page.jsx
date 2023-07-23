import RedirectUser from "@/app/(pages)/redirectUser";
import { getPrisma } from "@/app/lib/prisma";
import PerfilPage from "./perfil";
import { GetUser } from "@/app/lib/user";
import Link from "next/link";
import perfilAdoptador from "./perfil.module.css";
import Image from "next/image";

const prisma = getPrisma();

export default async function Page({ params }) {
    const userType = GetUser().idTipoUsuario;
    const { adoptanteId } = params;
    const adoptante = await prisma.adoptante.findUnique({
        where: {
            id: parseInt(adoptanteId),
        }
    });
    const adoptanteMunicipio = adoptante.idMunicipio;
    const estados = await prisma.estado.findMany();
    const adoptanteEstado = await prisma.municipio.findUnique({
        select: {
            idEstado: true,
        },
        where: {
            id: adoptanteMunicipio,
        }
    });
    const municipios = await prisma.municipio.findMany({
        where: {
            idEstado: adoptanteEstado.idEstado,
        },
    });
    const adopciones = await prisma.adopcion.findMany({
        where: {
            idAdoptante: adoptante.id,
        },
        include: {
            mascota: {
                include: {
                    especie: true,
                },
            },
            estadoAdopcion: true
        }
    });

    const props = { adoptante, estados, municipios, adoptanteEstado, adoptanteMunicipio, adopciones, userType }
    return (
        userType == 0 ? <RedirectUser /> : (
            <>
                <PerfilPage props={props} />
                {props.adopciones.length !== 0 && (
                    <>
                        <h3>Mascota adoptada</h3>
                        <div className="d-flex flex-column gap-3">
                            {props.adopciones.map((adopcion) => (
                                <Link key={adopcion.id} href={`/adopcion/mascota/${adopcion.mascota.id}`} className="link-dark link-underline-opacity-0">
                                    <div className={`${perfilAdoptador.container} rounded border bg-body-secondary pl-1`}>
                                        <div className="d-flex flex-column">
                                            <span className="mt-1 ms-3 fw-light">Id: {adopcion.mascota.id}</span>

                                            <div className="d-flex">
                                                <div className={`${perfilAdoptador.fotoPerfil} ms-3`}>
                                                    {adopcion.mascota.imagen ? (
                                                        <Image
                                                            width={100}
                                                            height={100}
                                                            src={adopcion.mascota.imagen}
                                                            alt={`ImagenAdoptante${adopcion.mascota.id}`}
                                                            className="rounded-circle" />
                                                    ) : (
                                                        <Image
                                                            width={100}
                                                            height={100}
                                                            src={"/images/dogIcon.png"}
                                                            alt="DefaultIcon"
                                                            className="rounded-circle" />
                                                    )}
                                                </div>

                                                <div className={perfilAdoptador.datosMascotas}>
                                                    <p>Nombre: {adopcion.mascota.nombre}</p>
                                                    <p>Especie: {adopcion.mascota.especie.especie}</p>
                                                    <p>Estado adopción: {adopcion.estadoAdopcion.estadoAdopcion}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </>
        )
    )
}