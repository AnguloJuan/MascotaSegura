"use client"
import rescate from "./rescate.module.css"
import InputLabel from "@/components/Input";
import { Especies, Sexos, Tamanos } from "@/components/Selects";
import { Dialog } from "@/components/dialogs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Rescate({ especies, idRefugio }) {
    const [mascota, setMascota] = useState({
        nombre: "",
        especie: 0,
        raza: "",
        edad: 0,
        sexo: 0,
        tamano: 0,
        maltratado: false,
        motivo: "",
        cartilla: false,
        idRefugio: idRefugio,
    });
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [fieldsDialog, setFieldsDialog] = useState(false);
    const [registradoDialog, setRegistradoDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const router = useRouter();
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMascota((prevCriteria) => ({ ...prevCriteria, [name]: value }));
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
    };

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const uploadToServer = async (e) => {
        e.preventDefault();
        if (!mascota.nombre || !mascota.especie || !mascota.sexo || !mascota.tamano || !(mascota.edad < 0)) {
            setFieldsDialog(true);
        } else {
            const body = new FormData();
            body.set("mascota", JSON.stringify(mascota));
            body.set("image", image);
            const response = await fetch("/api/mascotas", {
                method: "POST",
                body
            });
            if (response.status == 200) {
                setRegistradoDialog(true);
                response.json().then(res => router.replace(`/adopcion/mascota/${res.mascotaCreada.id}`))
            } else {
                response.json().then(res => console.log(res.message))
                setErrorDialog(true);
            }
        }
    };

    return (
        <>
            <form>
                <div className={rescate.contenedorAdoptante}>
                    <div className={rescate.perfil}>
                        {image ? (
                            <Image
                                width={200}
                                height={200}
                                src={createObjectURL}
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
                            <label htmlFor="nombre" className="form-label">Nombre<span className="text-warning fw-bold">*</span></label>
                            <input type="text" placeholder="Nombre" name="nombre" onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="input mb-3">
                            <label htmlFor="especies" className="form-label">Especie<span className="text-warning fw-bold">*</span></label>
                            <Especies especies={especies} handleChange={handleInputChange} required={true} />
                        </div>
                        <InputLabel id={"raza"} label={"Raza"} placeholder={"Raza"} name={"raza"} onChange={handleInputChange} />
                    </div>
                </div>

                <div className={rescate.contenedor}>
                    <div className={rescate.busqueda}>
                        <InputLabel id={"edad"} type={"number"} label={"Edad"} placeholder={"edad"} name={"edad"} onChange={handleInputChange} />
                    </div>

                    <div className={rescate.busqueda}>
                        <label htmlFor="sexo" className="form-label">Sexo<span className="text-warning fw-bold">*</span></label>
                        <Sexos handleChange={handleInputChange} required={true} />
                    </div>

                    <div className={rescate.busqueda}>
                        <label htmlFor="tamano" className="form-label">Tamaño</label>
                        <Tamanos handleChange={handleInputChange} required={true} />
                    </div>
                </div>
                <div className={rescate.cartilla}>
                    <p>Ha sido maltratado?</p>
                    <input type="checkbox" name="maltratado" id="maltratado" value={false} onChange={handleTernary} className="form-check-input" />
                    <p>Cuenta con cartilla de vacunación?</p>
                    <input type="checkbox" name="cartilla" id="cartilla" value={false} onChange={handleTernary} className="form-check-input" />
                </div>
                <div className={rescate.contendor}>
                </div>

                <div className="input">
                    <label htmlFor="motivo">Motivo de abandono</label>
                    <textarea name="motivo" id="motivo" rows="4" onChange={handleInputChange} className="form-control"></textarea>
                </div>


                <div className={rescate.buton}>
                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={uploadToServer}>Registrar</button>
                </div>
            </form>

            <Dialog id={"errorRellenado"} isOpen={fieldsDialog} onClose={() => setFieldsDialog(false)}>
                <h1>Error de rellenado</h1>
                <p>Rellena los campos obligatorios antes de registrar la mascota</p>
            </Dialog>
            <Dialog id={"registrado"} isOpen={registradoDialog} onClose={() => setRegistradoDialog(false)}>
                <h1>Mascota registrada</h1>
                <p>La mascota ha sido registrada en el sistema</p>
                <p>Espere un momento en lo que es redirigido a su perfil</p>
            </Dialog>
            <Dialog id={"error"} isOpen={errorDialog} onClose={() => setErrorDialog(false)}>
                <h1>Error de servidor</h1>
                <p>Ha ocurrido un error en el servidor</p>
                <p>Vuelva a intentarlo más tarde</p>
            </Dialog>
        </>
    )
}