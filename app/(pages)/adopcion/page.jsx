import InputLabel from "@/components/Input";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

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

                            <div className={listaMascotas.busqueda}>
                                <InputLabel id={"tamaño"} label={"Tamaño"} placeholder={"Tamaño"} />

                            </div>
                    
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
            

)
}