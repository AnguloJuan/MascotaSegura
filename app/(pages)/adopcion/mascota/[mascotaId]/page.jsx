import { GetMascota } from "@/app/lib/getMascota";
import Adoptar from "./adoptar";
import { GetUser } from "@/app/lib/user";
import visualizar from "../../mascota.module.css"
import Input from "@/components/Input";
import Image from "next/image";
import RedirectUser from "@/app/(pages)/redirectUser";
import { getPrisma } from "@/app/lib/prisma";
import MascotaPage from "./mascota";
import Cancelar from "./cancelarAdopcion";

const prisma = getPrisma();

export const metadata = {
    title: 'Mascota',
}

export default async function Page({ params }) {
    const { mascotaId } = params;
    const mascota = await GetMascota(mascotaId);
    const especies = await prisma.especie.findMany();
    /*const refugio = await prisma.refugio.findUnique({
        where: {
            id: mascota.idRefugio,
        }
    })*/
    const user = GetUser();
    const userId = user.id;
    const userType = user.idTipoUsuario;
    return (
        userType == 0 ? <RedirectUser /> : (
            <>
                <center><h1>Información de la mascota</h1></center>

                {(userType == 2 || userType == 3) ? (<MascotaPage especies={especies} mascotaInicial={mascota} />) : (
                    <div className="mt-2 mx-2 p-3 border rounded">
                        <div className={visualizar.contenedorAdoptante}>
                            <div className={`${visualizar.perfil}`}>
                                {mascota.imagen ? (
                                    <Image
                                        src={mascota.imagen}
                                        alt='mascota.png'
                                        width={200}
                                        height={200}
                                    />
                                ) : (
                                    <Image
                                        src={"/images/dogIcon.png"}
                                        alt='mascota.png'
                                        width={200}
                                        height={200}
                                    />
                                )}
                            </div>

                            <div className={`${visualizar.informacion} mx-2`}>
                                <p>Nombre: {mascota.nombre}</p>
                                <p>Especie: {mascota.especie.especie}</p>
                                <p>Raza: {mascota.raza}</p>
                            </div>
                        </div>
                        <div className={`${visualizar.contenedor} my-2 justify-space-between`}>
                            <p>Edad: {mascota.edad}</p>
                            <p>Sexo: {mascota.sexo.sexo}</p>
                            <p>Tamaño: {mascota.tamano.tamano}</p>
                        </div>

                        <div className={`${visualizar.contendor} d-flex justify-content-around mb-2`}>
                            <div className="d-flex gap-1">
                                <p>Ha sido maltratado? {mascota.maltratado ? "Sí" : "No"}</p>
                                <input type="checkbox" name="maltratado" id="maltratado" checked={mascota.maltratado} className="form-check-input" disabled />
                            </div>
                            <div className="d-flex gap-1">
                                <p className={visualizar.cartilla}> Cuenta con cartilla de vacunación: {mascota.cartilla ? "Sí" : "No"} </p>
                                <input type="checkbox" name="cartilla" id="cartilla" checked={mascota.cartilla} className="form-check-input" disabled />
                            </div>
                        </div>
                        {/* Muestra adoptante 
                        {mascota.adopcion && (
                            <div className={visualizar.contenedorAdoptante}>
                                <div className={visualizar.perfil}>
                                    <Image
                                        src={"/images/adoptante1.jpg"}
                                        alt='mascota.png'
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <div className={visualizar.informacion}>
                                    <h3>Persona adoptante</h3>
                                    <p>id: {mascota.adopcion.adoptante.id}</p>
                                    <p>Nombre: {mascota.adopcion.adoptante.nombre}</p>
                                    <p>correo: {mascota.adopcion.adoptante.correo}</p>

                                </div>
                            </div>
                        )}
                        */}

                        {(mascota.adopcion && mascota.adopcion.adoptante.id == userId) && <p>Estado de adopción: {mascota.adopcion.estadoAdopcion.estadoAdopcion}</p>}
                        {mascota.adopcion && mascota.adopcion.estadoAdopcion.id == 3 && mascota.adopcion.adoptante.id == userId ? (
                            <>
                                <div className={visualizar.buton}>
                                    <Cancelar idAdopcion={mascota.adopcion.id} idAdoptante={mascota.adopcion.adoptante.id} idMascota={mascota.id} />
                                </div>
                            </>
                        ) : !mascota.adopcion && (
                            < div className={`${visualizar.buton} my-2 mt-4 `}>
                                <Adoptar mascotaId={mascota.id} adoptanteId={userId} />
                            </div>
                        )}

                        <br />
                        {(mascota.motivo || mascota.historialAdoptivo.length !== 0) && (
                            <div className={visualizar.contenedordatos}>
                                <p>Anteriores adopciones</p>
                                <p>Motivos de abandono</p>
                                {mascota.motivo && <p className="border rounded">- {mascota.motivo}</p>}

                                {mascota.historialAdoptivo.length !== 0 && (
                                    mascota.historialAdoptivo.map((historial) => (
                                        historial.motivo &&
                                        <p key={historial.id} className="border rounded">- {historial.motivo}</p>
                                    ))
                                )}
                            </div>
                        )}

                    </div >
                )}
            </>
        )
    )
}