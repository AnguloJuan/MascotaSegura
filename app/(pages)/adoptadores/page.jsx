import { getPrisma } from "@/app/lib/prisma";
import InputLabel from "@/components/Input";
import Link from "next/link";
import listaAdoptantes from "./adoptadores.module.css"
import adoptador from "./adoptadores.module.css"
import Image from "next/image";

/*
import { getPrisma } from "@/app/lib/prisma";
import listaMascotas from "./mascota.module.css";
import InputLabel from "@/components/Input";
import Link from "next/link";
import visualizar from "./mascota.module.css"
import Image from "next/image";

const prisma = getPrisma();

async function getMascotas() {
    const mascotas = await prisma.mascota.findMany();
    return mascotas;
}
export default async function Adopcion() {
    const mascotas = await getMascotas();
*/ 
const prisma = getPrisma();

async function getAdoptante() {
    const adoptantes = await prisma.adoptante.findMany();
    return adoptantes;
}
export default async function adoptadores() {
    const adoptantes = await getAdoptante();
    return (
        <>
            <div className={listaAdoptantes}>
                <center><h2>Lista de adoptantes</h2></center>
                <div className={listaAdoptantes.contenedor}>
                    <InputLabel id={"adoptador"} label={"ID del adoptador"} placeholder={"Id adoptador"} />
                    <button>Buscar</button>
                </div>
                <div className={listaAdoptantes.contenedor}>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"nombre"} label={"Nombre"} placeholder={"Nombre"} />
                    </div>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"numero"} label={"Numero de telefono"} placeholder={"Numero telefono"} />
                    </div>
                </div>
                <div className={listaAdoptantes.contenedor}>
                    <div className={listaAdoptantes.busqueda}>

                        <InputLabel id={"edad"} label={"Edad"} placeholder={"edad"} />
                    </div>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"correo"} label={"Correo Electronico"} placeholder={"correo electronico"} />
                    </div>
                    <div className={listaAdoptantes.busqueda}>
                        <InputLabel id={"ubicacion"} label={"Ubicacion"} placeholder={"ubicacion"} />
                    </div>

                </div>
            </div>

         
            {adoptantes.map((adoptante) => (
                <Link key={adoptante.id} href={`/adoptadores/adoptante/${adoptante.id}`}>
                    <div class={listaAdoptantes.tarjeta}>
                        <div class={listaAdoptantes.imagen}>
                            <Image
                                src={"/images/adoptante1.jpg"}
                                alt='logo.png'
                                width={300}
                                height={300}
                                loading="lazy"
                                color="white"
                            />
                        </div>
                        <div className={listaAdoptantes.datos}>
                            <p>Nombre: {adoptante.nombre}</p>
                            <p>id: {adoptante.id}</p>
                            <p>correo: {adoptante.correo}</p>
                        </div>
                    </div>
                </Link>
            ))}


        </>
    )
}
export function verAdoptador() {
    return (
        <>
            <div className={adoptador}>
                <h3>Perfil de adoptante</h3>
                <div className={adoptador.contenedorAdoptante}>

                    <div className={adoptador.perfil}></div>
                    <div className={adoptador.informacion}>

                        <p>Nombre: </p>
                        <p>Correo electrónico:</p>
                        <p>Número de teléfono:</p>
                        <p>Ubicación:</p>

                    </div>

                </div>
                <h5>ID </h5>
            </div>





            <div className={adoptador.contenedorMascota}>
                <div className={adoptador.fotoPerfil}></div>
                <div className={adoptador.datosMascotas}>
                    <p>Nombre</p>
                    <p>Especie</p>
                    <p>Raza</p>
                </div>
            </div>
            <div class={adoptador.botones}>
                <button class="button">Modificar</button>
                <button class="button">Eliminar adoptante</button>
            </div>


        </>


    )
}