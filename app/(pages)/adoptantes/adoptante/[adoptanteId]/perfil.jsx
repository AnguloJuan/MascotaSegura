"use client"
import InputLabel from "@/components/Input";
import perfilAdoptador from "./perfil.module.css";
import { Estados } from "@/components/Selects";
import { Municipios } from "@/components/SelectsClient";
import { useState } from "react";
import { Dialog } from "@/components/dialogs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PerfilPage({ props }) {
    //formatting date
    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }
    const day = pad(new Date(props.adoptante.fechaRegistro).getDay(), 2);
    const month = pad(new Date(props.adoptante.fechaRegistro).getMonth(), 2);
    const year = new Date(props.adoptante.fechaRegistro).getFullYear();
    const date = `${year}-${month}-${day}`;

    const [adoptante, setAdoptante] = useState({
        nombre: props.adoptante.nombre,
        apellido: props.adoptante.apellido,
        correo: props.adoptante.correo,
        telefono: props.adoptante.telefono,
        fechaRegistro: date,
        estado: props.adoptanteEstado.idEstado,
        municipio: props.adoptanteMunicipio,
    });
    const [unmodified, setUnmodified] = useState(true);
    const [invalidFieldsDialog, setInvalidFieldsDialog] = useState(false);
    const [modifiedDialog, setModifiedDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [unmodifiedDialog, setUnmodifiedDialog] = useState(false);
    const [errorCorreoDialog, setErrorCorreoDialog] = useState(false);
    const [adopcionDialog, setAdopcionDialog] = useState(false);
    const [deletedDialog, setDeletedDialog] = useState(false);
    const [warningDialog, setWarningDialog] = useState(false);
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const router = useRouter();

    const handleInputChange = (e) => {
        setUnmodified(false);
        const { name, value } = e.target;
        setAdoptante((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    };
    const handleEstadoChange = (e) => {
        setUnmodified(false);
        const { name, value } = e.target;
        setAdoptante((prevCriteria) => ({ ...prevCriteria, [name]: value }));
        // Reset selected municipio when estado adoptante
        setAdoptante((prevCriteria) => ({ ...prevCriteria, municipio: 0 }));
        e.target.value ?
            document.getElementById("municipio").disabled = false
            : document.getElementById("municipio").disabled = true;
    };
    //actualizacion de imagen
    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            setUnmodified(false);
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const modifyAdoptante = async (e) => {
        e.preventDefault();
        if (!adoptante.correo || !adoptante.telefono || !adoptante.municipio || isNaN(adoptante.telefono)) {
            setInvalidFieldsDialog(true);
        } else {
            try {
                const body = new FormData();
                BigInt.prototype.toJSON = function () { return this.toString() }
                body.set("userType", JSON.stringify(props.userType));
                body.set("user", JSON.stringify(adoptante));
                body.set("userInit", JSON.stringify(props.adoptante));
                
                //subir imagen a cloudinary
                body.set("file", image);
                body.set("upload_preset", 'mascotaSegura');

                const data = await fetch('https://api.cloudinary.com/v1_1/dyvwujin9/image/upload', {
                    method: 'POST',
                    body
                }).then(r => r.json());

                body.set("image", data.secure_url);

                const response = await fetch("/api/adoptante", {
                    method: "PUT",
                    body
                });
                if (response.status == 200) {
                    setModifiedDialog(true);
                    setUnmodified(true);
                } else {
                    response.json().then(res => console.log(res.message))
                    setErrorDialog(true);
                }
            } catch (error) {
                console.log(error);
                setErrorDialog(true);
            }
        }
    };
    const deleteAdoptante = async (e) => {
        setWarningDialog(false);
        const id = props.adoptante.id;
        const userType = props.userType;
        const params = JSON.stringify({ id, userType });
        const response = await fetch(`/api/adoptante?params=${params}`, {
            method: "DELETE"
        });
        if (response.status == 200) {
            setDeletedDialog(true);
            router.replace("/adoptantes");
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
            {/* Perfil adoptante */}
            <form className="m-3">
                <h1>Perfil</h1>
                <div className={perfilAdoptador.datosperfil}>
                    <div className={perfilAdoptador.perfil}>
                        {image ? (
                            <Image
                                width={200}
                                height={200}
                                src={createObjectURL}
                                alt="UploadedImage" />
                        ) : props.adoptante.imagen ? (
                            <Image
                                width={200}
                                height={200}
                                src={props.adoptante.imagen}
                                alt={`ImagenAdoptante${props.adoptante.id}`} />
                        ) : (
                            <Image
                                width={200}
                                height={200}
                                src={"/images/defaultUser.png"}
                                alt="DefaultIcon" />
                        )}
                        <input id="perfil"
                            type="file"
                            name="perfil"
                            onChange={uploadToClient}
                            accept="image/*, .jpg, .png, .svg, .webp, .jfif"
                            className="form-control" />
                    </div>
                    <InputLabel id={"nombre"} label={"Nombre"} placeholder={"Nombre"} name={"nombre"} value={adoptante.nombre} onChange={handleInputChange} />
                    <InputLabel id={"apellido"} label={"Apellido"} placeholder={"Apellido"} name={"apellido"} value={adoptante.apellido} onChange={handleInputChange} />
                    <InputLabel
                        id={"correo"}
                        label={"Correo electronico"}
                        placeholder={"Correo electrónico"}
                        onChange={handleInputChange}
                        value={adoptante.correo} />
                    <InputLabel
                        id={"numero"}
                        label={"Numero de telefono"}
                        placeholder={"Numero de telefono"}
                        onChange={handleInputChange}
                        value={adoptante.telefono} />
                    <div className={perfilAdoptador.datosperfil}>
                        <div className="input mb-3 mt-3">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <Estados handleChange={handleEstadoChange} estados={props.estados} value={adoptante.estado} />
                        </div>
                        <div className="input mb-3 mt-3">
                            <label htmlFor="municipio" className="form-label">Municipio</label>
                            <Municipios handleChange={handleInputChange} municipiosInicial={props.municipios} selectedEstado={adoptante.estado} value={adoptante.municipio} />
                        </div>
                    </div>
                    <div className="contenedor-btn d-flex flex-row justify-content-center gap-2 m-3">
                        <button type="submit" className="btn btn-primary btn-lg" onClick={modifyAdoptante} disabled={unmodified}>Guardar</button>
                        <button type="submit" className="btn btn-danger btn-lg" onClick={warning} >Eliminar cuenta</button>
                    </div>
                </div>
            </form>

            <Dialog id={"errorCorreo"} isOpen={errorCorreoDialog} onClose={() => setErrorCorreoDialog(false)}>
                <h1>Error de correo</h1>
                <p>No se puedieron guardar los cambios porque ya se existe una cuenta con ese correo</p>
            </Dialog>
            <Dialog id={"invalidField"} isOpen={invalidFieldsDialog} onClose={() => setInvalidFieldsDialog(false)}>
                <h1>Error valores invalidos</h1>
                <p>No se pueden modificar datos con valores invalidos</p>
                <p>El campo correo, y telefono no puede quedar vacio</p>
                <p>El campo estado y municipio debe haber seleccionado una opción</p>
            </Dialog>
            <Dialog id={"unmodified"} isOpen={unmodifiedDialog} onClose={() => setUnmodifiedDialog(false)}>
                <h1>Error de modificación</h1>
                <p>No se ha registrado ningun cambio</p>
            </Dialog>
            <Dialog id={"modified"} isOpen={modifiedDialog} onClose={() => setModifiedDialog(false)}>
                <h1>Se han guardado los cambios</h1>
                <p>Los cambios han sido guardados correctamente en la base de datos</p>
            </Dialog>
            <Dialog id={"error"} isOpen={errorDialog} onClose={() => setErrorDialog(false)}>
                <h1>Error de servidor</h1>
                <p>Ha ocurrido un error en el servidor</p>
                <p>Vuelva a intentarlo más tarde</p>
            </Dialog>
            <Dialog id={"adopcion"} isOpen={adopcionDialog} onClose={() => setAdopcionDialog(false)}>
                <h1>Error al eliminar cuenta</h1>
                <p>Se ha encontrado que tiene al menos una mascota adoptada</p>
                <p>No puede eliminar la cuenta si ha adoptado a una mascota</p>
                <p>Cancele la adopción y devuelva la mascota al refugio para que pueda eliminar la cuenta</p>
            </Dialog>
            <Dialog id={"deleted"} isOpen={deletedDialog} onClose={() => setDeletedDialog(false)}>
                <h1>Adoptante Eliminado</h1>
                <p>Se ha eliminado el adoptante de la pagina</p>
                <p>Sera redirigido a la pagina adoptantes</p>
            </Dialog>
            <Dialog id={"warning"} isOpen={warningDialog} onClose={() => setWarningDialog(false)} fun={deleteAdoptante} confirmar={true}>
                <h1>Advertencia</h1>
                <p>Estas apunto de eliminar a un adoptante de la pagina<br />Esta acción sera irreversible</p>
                <p>Haga clic en confirmar para continuar</p>
            </Dialog>
        </>
    )
}