import InputLabel from "@/components/Input";
import perfilAdoptador from "./perfil.module.css";
import { GetUser } from "../../lib/user";
import { getPrisma } from "@/app/lib/prisma";

const prisma = getPrisma();

export default function Perfil() {
    const user = GetUser();
    const userType = user.idTipoUsuario;
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
                    <InputLabel id={"ubicacion"} label={"Ubicacion"} placeholder={"Ubicacion"} disabled />
                </div>
                <h3>Mascota adoptada</h3>
                <div className={perfilAdoptador.container}>
                    <div className={perfilAdoptador.fotoPerfil}></div>
                    <div className={perfilAdoptador.datosMascotas}>
                        <p>Nombre</p>
                        <p>Especie</p>
                        <p>Raza</p>
                    </div>

                </div>
                <div className="contenedor-btn">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="submit" className="btn btn-danger">Eliminar cuenta</button>
                </div>
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
