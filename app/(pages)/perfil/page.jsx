import InputLabel from "@/components/Input";
import perfilAdoptador from "./perfil.module.css";


export default function Perfil({ user }) {
    return (
        user == 1 ? (<>
        <div className={perfilAdoptador}>
            <h1>Perfil</h1>
            <div className={perfilAdoptador.datosperfil}>
                <InputLabel id={"imagen"} placeholder={"imagen/subir imagen"} />
                <InputLabel id={"Nombre"} label={"Nombre"} placeholder={"nombre"} />
                <InputLabel id={"correo"} label={"Correo electronico"} placeholder={"Correo electronico"} />
                <InputLabel id={"numero"} label={"Numero de telefono"} placeholder={"Numero de telefono"} />
                <InputLabel id={"ubicacion"} label={"Ubicacion"} placeholder={"Ubicacion"} />
            </div>
            <h3>Mascota adoptada</h3>
            <div className={perfilAdoptador.container}>               
                <div className={perfilAdoptador.fotoPerfil}></div>           
                <div className={perfilAdoptador.datosMascotas}>
                    <p>Nombre</p>
                    <p>Especie</p>
                    <p>Raza</p>
                    </div>
                
                <div className="contenedor-btn">
                <button type="submit">Guardar</button>
                <button type="submit">Eliminar cuenta</button>
                </div>
                </div>
                </div>
   
            </>
            ) : user == 2 ? (<>
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
            ) : user == 3 ? (
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
