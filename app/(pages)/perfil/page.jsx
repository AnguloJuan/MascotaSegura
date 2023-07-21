import InputLabel from "@/components/Input";
import perfilAdoptador from "./perfil.module.css";
import { GetUser } from "../../lib/user";
import { getPrisma } from "@/app/lib/prisma";
import { Estados } from "@/components/Selects";
import { Municipios } from "@/components/SelectsClient";
import Perfil from "./perfil";
import LogoutPage from "../logout/page";
import Link from "next/link";
import Image from "next/image";

const prisma = getPrisma();

export default async function PerfilPage() {
    const user = GetUser();
    const userType = user.idTipoUsuario;
    const userMunicipio = user.idMunicipio;
    let userEstado;
    let props;
    if (userType == 1) {
        userEstado = await prisma.municipio.findUnique({
            select: {
                idEstado: true,
            },
            where: {
                id: userMunicipio,
            }
        });
        const estados = await prisma.estado.findMany();
        const municipios = await prisma.municipio.findMany({
            where: {
                idEstado: userEstado.idEstado,
            },
        });
        const adopciones = await prisma.adopcion.findMany({
            where: {
                idAdoptante: user.id,
            },
            include: {
                mascota: {
                    include: {
                        especie: true,
                    },
                },
            }
        });

        props = { user, userType, estados, municipios, userMunicipio, userEstado, adopciones }
    } else props = { user, userType };
    return (
        userType == 0 ? <LogoutPage /> : (
            <>
                <Perfil props={props} />
                {userType == 1 && props.adopciones.length !== 0 && (
                    <>
                        <h3>Mascota adoptada</h3>
                        <div className="d-flex flex-column gap-3">
                            {props.adopciones.map((adopcion) => (
                                <Link key={adopcion.id} href={`/adopcion/mascota/${adopcion.mascota.id}`} className="link-dark link-underline-opacity-0">
                                    <div className={`${perfilAdoptador.container} rounded border bg-body-secondary pl-1`}>
                                        <div className={`${perfilAdoptador.fotoPerfil} ms-3`}>
                                            {adopcion.mascota.imagen ? (
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={`/images/adoptantes/${adopcion.mascota.imagen}`}
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
                                            <p>Raza: {adopcion.mascota.raza}</p>
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
