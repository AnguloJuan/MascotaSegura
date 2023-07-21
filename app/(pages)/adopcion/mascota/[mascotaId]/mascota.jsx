"use client"
import rescate from "./rescate.module.css"
import visualizar from "../../mascota.module.css"
import InputLabel from "@/components/Input";
import { Especies, Sexos, Tamanos } from "@/components/Selects";
import { Dialog } from "@/components/dialogs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Cancelar from "./cancelarAdopcion";

export default function MascotaPage({ especies, mascotaInicial }) {
    const [mascota, setMascota] = useState({
        id: mascotaInicial.id,
        nombre: mascotaInicial.nombre,
        especie: mascotaInicial.especie.id,
        raza: mascotaInicial.raza,
        edad: mascotaInicial.edad,
        sexo: mascotaInicial.sexo.id,
        tamano: mascotaInicial.idTamano,
        maltratado: mascotaInicial.maltratado,
        motivo: mascotaInicial.motivo,
        cartilla: mascotaInicial.cartilla,
        estadoAdopcion: (mascotaInicial.adopcion ? mascotaInicial.adopcion.estadoAdopcion.id : null),
        imagen: mascotaInicial.imagen,
    });

    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [unmodifiedDialog, setUnmodifiedDialog] = useState(false);
    const [modifiedDialog, setModifiedDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [invalidFieldsDialog, setInvalidFieldsDialog] = useState(false);
    const [warningDialog, setWarningDialog] = useState(false);
    const [deletedDialog, setDeletedDialog] = useState(false);
    const [unmodified, setUnmodified] = useState(true);
    const [adopcionDialog, setAdopcionDialog] = useState(false);

    const router = useRouter();

    //manejo de cambios en el formulario
    const handleInputChange = (e) => {
        setUnmodified(false);
        const { name, value } = e.target;
        setMascota((prevMascota) => ({ ...prevMascota, [name]: value }));
    };
    const handleTernary = (e) => {
        let value;
        setUnmodified(false);
        if (e.target.name == "maltratado") {
            value = mascota.maltratado ? mascota.maltratado = false : mascota.maltratado = true;
            setMascota((prevCriteria) => ({ ...prevCriteria, maltratado: value }));
        } else if (e.target.name == "cartilla") {
            value = mascota.cartilla ? mascota.cartilla = false : mascota.cartilla = true;
            setMascota((prevCriteria) => ({ ...prevCriteria, cartilla: value }));
        }
    }

    //actualizacion de imagen
    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            setUnmodified(false);
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    //registro de mascota
    const uploadToServer = async (e) => {
        e.preventDefault();
        if (!mascota.nombre
            || !mascota.especie
            || !mascota.sexo
            || !mascota.tamano
            || mascota.edad < 0) {
            setInvalidFieldsDialog(true);
        } else {
            const body = new FormData();
            BigInt.prototype.toJSON = function () { return this.toString() }
            body.set("mascota", JSON.stringify(mascota));
            body.set("mascotaInicial", JSON.stringify(mascotaInicial));
            body.set("image", image);
            const response = await fetch("/api/mascotas", {
                method: "PUT",
                body
            });
            if (response.status == 200) {
                setModifiedDialog(true);
                router.refresh();
                setUnmodified(true);
            } else {
                response.json().then(res => console.log(res.message))
                setErrorDialog(true);
            }
        }
    };
    const deleteMascota = async (e) => {
        setWarningDialog(false)
        const response = await fetch(`/api/mascotas?id=${mascota.id}`, {
            method: "DELETE"
        });
        if (response.status == 200) {
            setDeletedDialog(true);
            router.replace("/rescate");
        } else if (response.status == 409) {
            setAdopcionDialog(true);
        } else {
            response.json().then(res => console.log(res.message))
            setErrorDialog(true);
        }
    };

    const warning = (e) => {
        e.preventDefault();
        setWarningDialog(true);
    }

    return (
        <>
            <form>
                <h3>Id: {mascotaInicial.id}</h3>
                <div className={rescate.contenedorAdoptante}>
                    <div className={rescate.perfil}>
                        {image ? (
                            <Image
                                width={200}
                                height={200}
                                src={createObjectURL}
                                alt="UploadedImage" />
                        ) : mascotaInicial.imagen ? (
                            <Image
                                width={200}
                                height={200}
                                src={`/images/mascotas/${mascotaInicial.imagen}`}
                                alt={`ImagenMascota${mascota.id}`} />
                        ) : (
                            <Image
                                width={200}
                                height={200}
                                src={"/images/dogIcon.png"}
                                alt="DefaultIcon" />
                        )}
                        <input id="perfil" type="file" name="perfil" onChange={uploadToClient} accept="image/*, .jpg, .png, .svg, .webp, .jfif" className="form-control" />
                    </div>
                    <div className={rescate.informacion}>
                        <div className="input mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" placeholder="Nombre" name="nombre" onChange={handleInputChange} value={mascota.nombre} className="form-control" />
                        </div>
                        <div className="input mb-3">
                            <label htmlFor="especies" className="form-label">Especie</label>
                            <Especies especies={especies} handleChange={handleInputChange} value={mascota.especie} />
                        </div>
                        <InputLabel id={"raza"} label={"Raza"} placeholder={"Raza"} name={"raza"} value={mascota.raza} onChange={handleInputChange} />
                    </div>
                </div>

                <div className={rescate.contenedor}>
                    <div className={rescate.busqueda}>
                        <InputLabel id={"edad"} type={"number"} label={"Edad"} placeholder={"edad"} name={"edad"} value={mascota.edad} onChange={handleInputChange} />
                    </div>

                    <div className={rescate.busqueda}>
                        <label htmlFor="sexo" className="form-label">Sexo</label>
                        <Sexos handleChange={handleInputChange} value={mascota.sexo} />
                    </div>

                    <div className={rescate.busqueda}>
                        <label htmlFor="tamano" className="form-label">Tamaño</label>
                        <Tamanos handleChange={handleInputChange} value={mascota.tamano} />
                    </div>
                </div>
                <div className={rescate.cartilla}>
                    <div className="d-flex">
                        <p>Ha sido maltratado?</p>
                        <input type="checkbox" name="maltratado" id="maltratado" checked={mascota.maltratado} onChange={handleTernary} className="form-check-input ms-2" />
                    </div>
                    <div className="d-flex">
                        <p>Cuenta con cartilla de vacunación?</p>
                        <input type="checkbox" name="cartilla" id="cartilla" checked={mascota.cartilla} onChange={handleTernary} className="form-check-input ms-2" />
                    </div>
                </div>

                {mascotaInicial.adopcion && (
                    <>
                        {/* Estado de adopcion */}
                        < label htmlFor="estadoAdopcion" className="mb-1">Estado adopción: {mascotaInicial.adopcion.estadoAdopcion.estadoAdopcion}</label>
                        <select id="estadoAdopcion"
                            name="estadoAdopcion"
                            onChange={handleInputChange}
                            value={mascota.estadoAdopcion}
                            className="form-select mb-4">
                            <option value="3">Procesando</option>
                            <option value="1">Aceptado</option>
                            <option value="2">Denegado</option>
                            <option value="4">Cancelado</option>
                        </select>
                    </>
                )}

                <div className={rescate.contendor}>
                    <div className={rescate.buton}>
                        <button
                            className="btn btn-danger m-2 btn-lg"
                            onClick={warning}
                            type="submit">Eliminar mascota</button>
                        <button
                            className="btn btn-primary m-2 btn-lg"
                            type="submit"
                            disabled={unmodified}
                            onClick={uploadToServer}>Guardar cambios</button>
                    </div>
                </div>

                {mascotaInicial.adopcion && (
                    <>
                        <h3 className="mt-2 mb-2">Proceso de adopción</h3>

                        {/* Muestra adoptante */}
                        <div className="border p-2 rounded mb-4">
                            <Link
                                href={`/adoptantes/adoptante/${mascotaInicial.adopcion.adoptante.id}`}
                                className="link-dark link-underline-opacity-0">

                                <div className={visualizar.contenedorAdoptante}>
                                    <div className={visualizar.perfil}>
                                        {mascotaInicial.adopcion.adoptante.imagen ? (
                                            <Image
                                                src={`/images/adoptantes/${mascotaInicial.adopcion.adoptante.imagen}`}
                                                alt='userImage'
                                                width={200}
                                                height={200}
                                            />
                                        ) : (
                                            <Image
                                                src={"/images/defaultUser.png"}
                                                alt='defaultUser.png'
                                                width={200}
                                                height={200}
                                            />
                                        )}
                                    </div>
                                    <div className={visualizar.informacion}>
                                        <h3>Persona adoptante</h3>
                                        <p>id: {mascotaInicial.adopcion.adoptante.id}</p>
                                        <p>Nombre: {mascotaInicial.adopcion.adoptante.nombre}</p>
                                        <p>correo: {mascotaInicial.adopcion.adoptante.correo}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <Cancelar idAdopcion={mascotaInicial.adopcion.id} idAdoptante={mascotaInicial.adopcion.idAdoptante} idMascota={mascotaInicial.id} />

                        {(mascotaInicial.motivo || mascotaInicial.historialAdoptivo.length !== 0) && (
                            <div className={visualizar.contenedordatos}>
                                <p>Anteriores adopciones</p>
                                <p>Motivos de abandono</p>
                                {mascotaInicial.motivo && <p className="border rounded">- {historial.motivo}</p>}

                                {mascotaInicial.historialAdoptivo.length !== 0 && (
                                    mascotaInicial.historialAdoptivo.map((historial) => (
                                        historial.motivo &&
                                        <p key={historial.id} className="border rounded">- {historial.motivo}</p>
                                    ))
                                )}
                            </div>
                        )}

                    </>

                )}

            </form >

            <Dialog id={"invalidField"} isOpen={invalidFieldsDialog} onClose={() => setInvalidFieldsDialog(false)}>
                <h3>Error valores invalidos</h3>
                <p>No se pueden modificar datos con valores invalidos</p>
                <p>El campo nombre no puede quedar vacio</p>
                <p>La edad no puede ser negativa</p>
                <p>La especie, sexo, y tamaño, deben de tener seleccionado un valor valido</p>
            </Dialog>
            <Dialog id={"unmodified"} isOpen={unmodifiedDialog} onClose={() => setUnmodifiedDialog(false)}>
                <h3>Error de modificación</h3>
                <p>No se ha registrado ningun cambio</p>
            </Dialog>
            <Dialog id={"modified"} isOpen={modifiedDialog} onClose={() => setModifiedDialog(false)}>
                <h3>Se han guardado los cambios</h3>
                <p>Los cambios han sido guardados correctamente en la base de datos</p>
            </Dialog>
            <Dialog id={"error"} isOpen={errorDialog} onClose={() => setErrorDialog(false)}>
                <h3>Error de servidor</h3>
                <p>Ha ocurrido un error en el servidor</p>
                <p>Vuelva a intentarlo más tarde</p>
            </Dialog>
            <Dialog id={"deleted"} isOpen={deletedDialog} onClose={() => setDeletedDialog(false)}>
                <h3>Mascota Eliminada</h3>
                <p>Se ha eliminado la mascota de la pagina</p>
                <p>Sera redirigido a la pagina rescate</p>
            </Dialog>
            <Dialog id={"warning"} isOpen={warningDialog} onClose={() => setWarningDialog(false)} fun={deleteMascota} confirmar={true}>
                <h3>Advertencia</h3>
                <p>Estas apunto de eliminar a una mascota de la pagina<br />Esta acción sera irreversible</p>
                <p>Haga clic en confirmar para continuar</p>
            </Dialog>
            <Dialog id={"adopcion"} isOpen={adopcionDialog} onClose={() => setAdopcionDialog(false)}>
                <h3>Error al eliminar mascota</h3>
                <p>Se ha encontrado que esta mascota se encuentra adoptada</p>
                <p>No puede eliminar la mascota si esta adoptado por un adoptante</p>
                <p>Cancele la adopción si de la mascota si requiere eliminar la mascota</p>
            </Dialog>
        </>
    )
}