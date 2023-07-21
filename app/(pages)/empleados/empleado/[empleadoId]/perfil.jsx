"use client"
import InputLabel from "@/components/Input";
import perfilAdoptador from "./perfil.module.css";
import { useState } from "react";
import { Dialog } from "@/components/dialogs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PerfilPage({ props }) {
    const [empleado, setAdoptante] = useState({
        nombre: props.empleado.nombre,
        apellido: props.empleado.apellido,
        correo: props.empleado.correo,
        telefono: props.empleado.telefono,
        NIP: props.empleado.NIP,
        fechaRegistro: props.date,
        tipoEmpleado: props.empleado.idTipoUsuario,
    });
    const [unmodified, setUnmodified] = useState(true);
    const [invalidFieldsDialog, setInvalidFieldsDialog] = useState(false);
    const [modifiedDialog, setModifiedDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [unmodifiedDialog, setUnmodifiedDialog] = useState(false);
    const [errorCorreoDialog, setErrorCorreoDialog] = useState(false);
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
    //actualizacion de imagen
    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            setUnmodified(false);
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const modifyEmpleado = async (e) => {
        e.preventDefault();

        try {
            const body = new FormData();
            BigInt.prototype.toJSON = function () { return this.toString() }
            body.set("user", JSON.stringify(empleado));
            body.set("userType", JSON.stringify(props.userType));
            body.set("userInit", JSON.stringify(props.empleado));
            body.set("image", image);
            const response = await fetch("/api/empleado", {
                method: "PUT",
                body
            });
            if (response.status == 200) {
                setModifiedDialog(true);
                router.refresh();
            } else {
                response.json().then(res => console.log(res.message))
                setErrorDialog(true);
                setUnmodified(true);
            }
        } catch (error) {
            console.log(error);
            setErrorDialog(true);
        }
    };

    const deleteEmpleado = async (e) => {
        setWarningDialog(false);
        const response = await fetch(`/api/empleado?id=${props.empleado.id}`, {
            method: "DELETE"
        });
        if (response.status == 200) {
            setDeletedDialog(true);
            router.replace("/empleados");
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
            <form className="m-3">
                <div className="perfilEmpleado">
                    <h1>Perfil</h1>
                    <div className="datos-empleado">
                        <div className={perfilAdoptador.perfil}>
                            {image ? (
                                <Image
                                    width={200}
                                    height={200}
                                    src={createObjectURL}
                                    alt={`Uploaded Image`} />

                            ) : props.empleado.imagen ? (
                                <Image
                                    width={200}
                                    height={200}
                                    src={`/images/empleados/${props.empleado.imagen}`}
                                    alt={`ImagenEmpleado${props.empleado.id}`} />
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
                        <InputLabel id={"nombre"} label={"Nombre"} name={"nombre"} value={empleado.nombre} onChange={handleInputChange} />
                        <InputLabel id={"apellido"} label={"Apellido"} name={"apellido"} value={empleado.apellido} onChange={handleInputChange} />
                        <InputLabel
                            id={"correo"}
                            label={"Correo electronico"}
                            name={"correo"}
                            value={empleado.correo}
                            onChange={handleInputChange} />
                        <InputLabel
                            id={"numero"}
                            label={"Numero de telefono"}
                            placeholder={"Numero de telefono"}
                            name={"telefono"} value={empleado.telefono}
                            onChange={handleInputChange} />
                        <InputLabel id={"NIP"} label={"NIP"} name={"nip"} onChange={handleInputChange} value={empleado.NIP} disabled />
                        <InputLabel
                            id={"fecRegistro"}
                            type={"date"}
                            label={"Fecha de registro"}
                            name={"fechaRegistro"}
                            value={empleado.fechaRegistro}
                            onChange={handleInputChange}
                            disabled />
                        <div className="input mb-3 mt-3">
                            <label htmlFor="tipoEmpleado" className="form-label">Tipo empleado</label>
                            <select
                                id="tipoEmpleado"
                                onChange={handleInputChange}
                                name="tipoEmpleado"
                                className="form-select"
                                value={empleado.tipoEmpleado}>
                                <option value="">Selecciona el tipo empleado</option>
                                <option value={2}>Empleado</option>
                                <option value={3}>Administrador</option>
                            </select>
                        </div>

                        <center>
                            <button
                                className="btn btn-primary m-2 btn-lg"
                                type="submit"
                                disabled={unmodified}
                                onClick={modifyEmpleado}>Guardar</button>
                            <button type="submit" className="btn btn-danger btn-lg" onClick={warning} >Eliminar cuenta</button>
                        </center>
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
            <Dialog id={"deleted"} isOpen={deletedDialog} onClose={() => setDeletedDialog(false)}>
                <h1>Adoptante Eliminado</h1>
                <p>Se ha eliminado el empleado de la pagina</p>
                <p>Sera redirigido a la pagina empleados</p>
            </Dialog>
            <Dialog id={"warning"} isOpen={warningDialog} onClose={() => setWarningDialog(false)} fun={deleteEmpleado} confirmar={true}>
                <h1>Advertencia</h1>
                <p>Estas apunto de eliminar a un empleado de la pagina<br />Esta accion sera irreversible</p>
                <p>Haga clic en confirmar para continuar</p>
            </Dialog>
        </>
    )
}