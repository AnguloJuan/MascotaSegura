import { getPrisma } from "@/app/lib/prisma";
import listaMascotas from "./mascota.module.css";
import InputLabel from "@/components/Input";
import Link from "next/link";
import visualizar from "./page.module.css"

const prisma = getPrisma();

async function getMascotas() {
    const mascotas = await prisma.mascota.findMany();
    return mascotas;
}
export default async function Adopcion() {
    const mascotas = await getMascotas();
    return (
        <>
            <div className={listaMascotas}>
                <center><h2>Lista de mascotas</h2></center>

                <div className={listaMascotas.contenedor}>
                    <InputLabel id={"idMascota"} label={"ID de la mascota"} placeholder={"nombre"} />
                    <button>Buscar</button>
                </div>

                <div className={listaMascotas.contenedor}>
                    <div className={listaMascotas.busqueda}>
                        <InputLabel id={"nombre"} label={"nombre"} placeholder={"nombre"} />
                    </div>
                    <div className={listaMascotas.busqueda}>
                        <InputLabel id={"especie"} label={"Especie"} placeholder={"Especie"} />
                    </div>
                </div>
                <div className={listaMascotas.contenedor}>
                    <div className={listaMascotas.busqueda}>

                        <InputLabel id={"raza"} label={"Raza"} placeholder={"Raza"} />
                    </div>
                    <div className={listaMascotas.busqueda}>
                        <InputLabel id={"edad"} label={"Edad"} placeholder={"Edad"} />
                    </div>
                    <div className={listaMascotas.busqueda}>
                        <InputLabel id={"sexo"} label={"Sexo"} placeholder={"sexo"} />
                    </div>
                </div>
                <div className={listaMascotas.busqueda}>
                    <InputLabel id={"sexo"} label={"Sexo"} placeholder={"sexo"} />
                </div>

                <div className={listaMascotas.busqueda}>
                    <InputLabel id={"tamaño"} label={"Tamaño"} placeholder={"Tamaño"} />

                </div>
            </div>

            {mascotas.map((mascota) => (
                <Link key={mascota.id} href={`/adopcion/mascota/${mascota.id}`}>
                    <div className="mascota">
                        <p>Nombre: {mascota.nombre}</p>
                        <p>Edad: {mascota.edad}</p>
                        <p>Sexo: {mascota.sexo}</p>
                    </div>
                </Link>
            ))}


            <div className={listaMascotas.contendedorMascotas}>
                <div className={listaMascotas.item}>Contenedor 1</div>
                <div className={listaMascotas.item}>Contenedor 2</div>
                <div className={listaMascotas.item}>Contenedor 3</div>
                <div className={listaMascotas.item}>Contenedor 4</div>
                <div className={listaMascotas.item}>Contenedor 5</div>
                <div className={listaMascotas.item}>Contenedor 6</div>
            </div>
        </>
    )
}

export function verMascota() {
    return (
        <>

            <div className={visualizar}>
                <h3>Informacion de la mascota</h3>
                <div className={visualizar.contenedorAdoptante}>

                    <div className={visualizar.perfil}></div>
                    <div className={visualizar.informacion}>

                        <p>Nombre</p>
                        <p>Especie</p>
                        <p>Raza</p>


                    </div>

                </div>


                <div className={visualizar.contenedor}>
                    <div className={visualizar.busqueda}>
                        <p>Edad</p>

                    </div>
                    <div className={visualizar.busqueda}>
                        <p>Sexo</p>

                    </div>
                    <div className={visualizar.busqueda}>
                        <p>Tamaño</p>

                    </div>
                    <div className={visualizar.busqueda}>
                        <p>Ha sido maltratado?</p>

                    </div>

                </div>

                <InputLabel id={"descripcion"} label={"Motivo de abandono"} placeholder={"motivo"} />

                <div class={rescate.contenedordatos}>
                    <p>Anteriores adopciones</p>


                </div>
                <div className={rescate.contendor}>
                    <div className={rescate.cartilla}>

                        <InputLabel id={"descripcion"} label={"Cartilla de vacunacion"} placeholder={"ingresar"} />
                    </div>
                </div>


                <div class={rescate.buton}>
                    <button>Adoptar</button>
                </div>

            </div>

        </>
    )
}


export function procesoAdopcion() {
    return (
        <>

            <div className={proceso}>
                <h3>Proceso de adopcion</h3>
                <div className={proceso.contenedorAdoptante}>

                    <div className={proceso.perfil}></div>
                    <div className={proceso.informacion}>

                        <p>Nombre</p>
                        <p>Especie</p>
                        <p>Raza</p>


                    </div>

                </div>


                <div className={proceso.contenedor}>
                    <div className={proceso.busqueda}>
                        <p>Edad</p>

                    </div>
                    <div className={visuprocesoalizar.busqueda}>
                        <p>Sexo</p>

                    </div>
                    <div className={proceso.busqueda}>
                        <p>Tamaño</p>

                    </div>
                    <div className={proceso.busqueda}>
                        <p>Ha sido maltratado?</p>

                    </div>

                </div>

                <p>Estado:</p>
                <p>Aprovado/Denegado</p>




                <div class={proceso.buton}>
                    <button>Cancelar adopcion</button>
                </div>

            </div>
        </>

    )
}