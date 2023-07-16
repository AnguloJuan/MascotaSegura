import InputLabel from "@/components/Input";
import perfilAdoptador from "./perfil.module.css";
import { GetUser } from "../../lib/user";
import { getPrisma } from "@/app/lib/prisma";
import { Estados } from "@/components/Selects";
import { Municipios } from "@/components/SelectsClient";
import Perfil from "./perfil";

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

        props = { estados, municipios, userMunicipio, userEstado }
    }
    props = { user, userType };
    return (
        userType == 1 ? (<>
            <div className={perfilAdoptador}>
                <h1>Perfil</h1>
                <div className={perfilAdoptador.datosperfil}>
                    <InputLabel id={"imagen"} placeholder={"imagen/subir imagen"} />
                    <InputLabel id={"nombre"} label={"Nombre"} placeholder={"Nombre"} value={user.nombre} disabled />
                    <InputLabel id={"apellido"} label={"Apellido"} placeholder={"Apellido"} value={user.apellido} disabled />
                    <InputLabel id={"correo"} label={"Correo electronico"} placeholder={"Correo electrónico"} value={user.correo} disabled />
                    <InputLabel id={"numero"} label={"Numero de telefono"} placeholder={"Numero de telefono"} value={user.telefono} disabled />
                    <Perfil estados={estados} municipios={municipios} props={props} />
                </div>
                {adopciones == [] && (
                    <>
                        <h3>Mascota adoptada</h3>
                        {adopciones.map((adopcion) => (
                            <div className={perfilAdoptador.container} key={adopcion.id}>
                                <div className={perfilAdoptador.fotoPerfil}></div>
                                <div className={perfilAdoptador.datosMascotas}>
                                    <p>Nombre: {adopcion.mascota.nombre}</p>
                                    <p>Especie: {adopcion.mascota.especie.especie}</p>
                                    <p>Raza: {adopcion.mascota.raza}</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

        </>
        ) : userType == 2 ? (<>
            <form action="">
                <div className="perfilEmpleado">
                    <h1>Perfil</h1>
                    <div className="datos-empleado">
                        <InputLabel id={"imagen"} placeholder={"imagen/subir imagen"} />
                        <InputLabel id={"Nombre"} label={"Nombre"} placeholder={"nombre"} />
                        <InputLabel id={"correo"} label={"Correo electronico"} placeholder={"Correo electronico"} />
                        <InputLabel id={"numero"} label={"Numero de telefono"} placeholder={"Numero de telefono"} />
                        <InputLabel id={"ubicacion"} label={"Ubicacion"} placeholder={"Ubicacion"} />
                        <InputLabel id={"tipoEmpleado"} label={"Tipo empleado"} placeholder={"Tipo empleado"} />

                        <button type="submit">Guardar</button>
                    </div>
                </div>
            </form>/
        </>
        ) : userType == 3 ? (
            <>
                <form action="">
                    <div className="perfilEmpleado">
                        <h1>Perfil</h1>
                        <div className="datos-empleado">
                            <InputLabel id={"imagen"} placeholder={"imagen/subir imagen"} />
                            <InputLabel id={"Nombre"} label={"Nombre"} placeholder={"nombre"} />
                            <InputLabel id={"correo"} label={"Correo electronico"} placeholder={"Correo electronico"} />
                            <InputLabel id={"numero"} label={"Numero de telefono"} placeholder={"Numero de telefono"} />
                            <InputLabel id={"ubicacion"} label={"Ubicacion"} placeholder={"Ubicacion"} />
                            <InputLabel id={"tipoEmpleado"} label={"Tipo empleado"} placeholder={"Tipo empleado"} />

                            <button type="submit">Guardar</button>
                        </div>
                    </div>
                </form>/
            </>
        ) : (<>
        </>
        )
    )
}
