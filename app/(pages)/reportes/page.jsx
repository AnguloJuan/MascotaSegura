import maltrato from "./reporte.module.css";
import registro from "./reporte.module.css";

import actualizar from "./reporte.module.css";

import InputLabel from "@/components/Input";
import { getPrisma } from "@/app/lib/prisma";
import Link from "next/link";

const prisma = getPrisma();

let reportes;

export async function GetReportes() {
    if (!reportes) {
        reportes = await prisma.reporte.findMany({
            include:{
                reportado: true,
                municipio: {
                    include:{
                        estado: true,
                    }
                }
            }
        });
    }

    return reportes;
}

export default async function listareportes() {
    const reportes = await GetReportes();
    return (
        <>
            <Link href={"/dashboard"}>Dashboard</Link>
            <div className={maltrato}>
                <div className={maltrato.busqueda}>
                    <InputLabel id={"reporte"} label={"Id del reporte"} placeholder={"nombre"} />
                    <button type="submit">Buscar</button>
                </div>
                <div className={maltrato.busquedaAvanzada}>
                    <InputLabel id={"nombre"} label={"Nombre de reporte"} placeholder={"nombre"} />
                    <InputLabel id={"nombre"} label={"Nombre de usuario"} placeholder={"nombre"} />
                </div>

                {reportes.map((reporte) => (
                    <Link key={reporte.id} href={`/adopcion/reporte/${reporte.id}`}>
                        <div className={maltrato.containerReportes}>
                            <div className={maltrato.profilepicture}></div>
                            <div className={maltrato.profiledata}>
                                <p>Id: {reporte.id}</p>
                                <p>Fecha reporteda: {reporte.fechaCreacion}</p>
                                <p>Ubicación: {reporte.municipio.estado.nombre}{reporte.municipio.nombre}</p>
                                <p>Descripción: {reporte.descripcion}</p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </>
    )
}

export function registrarReporte() {
    return (
        <>
            <div className={registro} >

                <h3>Reportar caso de maltrato</h3>
                <div className={registro.contenedorRegistro}>

                    <div className={registro.perfil}></div>
                    <div className={registro.informacion}>

                        <InputLabel id={"adoptado"} label={"Adoptado"} placeholder={"Si/no"} />
                        <InputLabel id={"reporte"} label={"reporte"} placeholder={"id reporte"} />
                        <InputLabel id={"adoptante"} label={"adoptante"} placeholder={"id Adoptante"} />
                    </div>


                </div>
                <InputLabel id={"ubicacion"} label={"Ubicacion"} placeholder={"ubicacion"} />
                <InputLabel id={"descripcion"} label={"Descriocion"} placeholder={"descripcion"} />


                <div className={registro.buton}>
                    <button>Reportar</button>
                </div>


            </div>


        </>
    )
}
export function editarReporte() {
    return (
        <>
            <div className={actualizar} >

                <h3>Informacion del reporte</h3>
                <div className={actualizar.contenedorRegistro}>

                    <div className={actualizar.perfil}></div>
                    <div className={actualizar.informacion}>

                        <InputLabel id={"adoptado"} label={"Adoptado"} placeholder={"Si/no"} />
                        <InputLabel id={"reporte"} label={"reporte"} placeholder={"id reporte"} />
                        <InputLabel id={"adoptante"} label={"adoptante"} placeholder={"id Adoptante"} />
                    </div>
                </div>
                <InputLabel id={"ubicacion"} label={"Ubicacion"} placeholder={"ubicacion"} />
                <InputLabel id={"descripcion"} label={"Descriocion"} placeholder={"descripcion"} />


                <div className={actualizar.contenedorBotones}>
                    <div className={actualizar.buton1}>
                        <button>Guardar</button>
                    </div>
                    <div className={actualizar.buton2}>
                        <button>Eliminar</button>
                    </div>
                </div>
            </div>
        </>
    )
}