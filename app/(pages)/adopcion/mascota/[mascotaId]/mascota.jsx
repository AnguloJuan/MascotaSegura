"use client"
import rescate from "./rescate.module.css"
import InputLabel from "@/components/Input";
import { Especies, Sexos, Tamanos } from "@/components/Selects";
import { Dialog } from "@/components/dialogs";
import Image from "next/image";
import { useState } from "react";

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
        imagen: mascotaInicial.imagen,
    });

    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [fieldsDialog, setFieldsDialog] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMascota((prevMascota) => ({ ...prevMascota, [name]: value }));
    };
    const handleTernary = (e) => {
        let value;
        if (e.target.name == "maltratado") {
            value = mascota.maltratado ? mascota.maltratado = false : mascota.maltratado = true;
            setMascota((prevCriteria) => ({ ...prevCriteria, maltratado: value }));
        } else if (e.target.name == "cartilla") {
            value = mascota.cartilla ? mascota.cartilla = false : mascota.cartilla = true;
            setMascota((prevCriteria) => ({ ...prevCriteria, cartilla: value }));
        }
    }

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const uploadToServer = async (e) => {
        e.preventDefault();
        if (!mascota.nombre || !mascota.especie || !mascota.sexo || !mascota.tamano || mascota.edad < 0) {
            setFieldsDialog(true);
        } else {
            const body = new FormData();
            body.set("mascota", JSON.stringify(mascota));
            body.set("image", image);
            const response = await fetch("/api/mascotas", {
                method: "PUT",
                body
            });
            if (response.status == 200) {
                setChangedDialog(true);
            } else {
                response.json().then(res => console.log(res.message))
                setErrorDialog(true);
            }
        }
    };

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
                                alt="upload image" />
                        ) : mascotaInicial.imagen ? (
                            <Image
                                width={200}
                                height={200}
                                src={`/images/mascotas/${mascotaInicial.imagen}`}
                                alt="upload image" />
                            ) : (
                            <Image
                                width={200}
                                height={200}
                                src={"/images/dogIcon.png"}
                                alt="upload image" />
                        )}
                        <input id="perfil" type="file" name="perfil" onChange={uploadToClient} className="form-control" />
                    </div>
                    <div className={rescate.informacion}>
                        <div className="input mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" placeholder="Nombre" name="nombre" onChange={handleInputChange} value={mascota.nombre} className="form-control" />
                        </div>
                        <div className="input mb-3">
                            <label htmlFor="especies" className="form-label">Especie</label>
                            <Especies especies={especies} handleChange={handleInputChange} required={true} value={mascota.especie} />
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
                        <Sexos handleChange={handleInputChange} required={true} value={mascota.sexo} />
                    </div>

                    <div className={rescate.busqueda}>
                        <label htmlFor="tamano" className="form-label">Tamaño</label>
                        <Tamanos handleChange={handleInputChange} required={true} value={mascota.tamano} />
                    </div>
                </div>
                <div className={rescate.cartilla}>
                    <p>Ha sido maltratado?</p>
                    <input type="checkbox" name="maltratado" id="maltratado" checked={mascota.maltratado} onChange={handleTernary} className="form-check-input" />
                    <p>Cuenta con cartilla de vacunación?</p>
                    <input type="checkbox" name="cartilla" id="cartilla" checked={mascota.cartilla} onChange={handleTernary} className="form-check-input" />
                </div>
                <div className={rescate.contendor}>
                </div>

                <div className="input">
                    <label htmlFor="motivo">Motivo de abandono</label>
                    <textarea name="motivo" id="motivo" rows="4" onChange={handleInputChange} value={mascota.motivo} className="form-control"></textarea>
                </div>


                <div className={rescate.buton}>
                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={uploadToServer}>Registrar</button>
                </div>
            </form>

            <Dialog id={"unmodified"} isOpen={fieldsDialog} onClose={() => setFieldsDialog(false)}>
                <h1>Error de modificación</h1>
                <p>No se ha registrado ningun cambio</p>
            </Dialog>
            <Dialog id={"unmodified"} isOpen={fieldsDialog} onClose={() => setFieldsDialog(false)}>
                <h1>Error de modificación</h1>
                <p>No se ha registrado ningun cambio</p>
            </Dialog>
        </>
    )
}