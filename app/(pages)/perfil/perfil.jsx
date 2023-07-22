"use client"
import InputLabel from "@/components/Input";
import perfilAdoptador from "./perfil.module.css";
import { Estados } from "@/components/Selects";
import { Municipios } from "@/components/SelectsClient";
import { useState } from "react";
import { Dialog } from "@/components/dialogs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function Perfil({ props }) {

    //formatting date
    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }
    const day = pad(new Date(props.user.fechaRegistro).getDay(), 2);
    const month = pad(new Date(props.user.fechaRegistro).getMonth(), 2);
    const year = new Date(props.user.fechaRegistro).getFullYear();
    const date = `${year}-${month}-${day}`;

    const [user, setUser] = useState(props.userType == 1 ? {
        nombre: props.user.nombre,
        apellido: props.user.apellido,
        correo: props.user.correo,
        telefono: props.user.telefono,
        fechaRegistro: date,
        estado: props.userEstado.idEstado,
        municipio: props.userMunicipio,

    } : props.user.idTipoUsuario == 2 ? {
        correo: props.user.correo,
        telefono: props.user.telefono,
    } : {
        nombre: props.user.nombre,
        apellido: props.user.apellido,
        correo: props.user.correo,
        telefono: props.user.telefono,
        NIP: props.user.NIP,
        fechaRegistro: date,
        tipoEmpleado: props.user.idTipoUsuario,
    });
    const router = useRouter();
    const userType = props.userType;
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
    //const date =  new Date(Date.parse(props.user.fechaRegistro)).toLocaleDateString("es-mx", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'});


    const handleInputChange = (e) => {
        setUnmodified(false);
        const { name, value } = e.target;
        setUser((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    };
    const handleEstadoChange = (e) => {
        setUnmodified(false);
        const { name, value } = e.target;
        setUser((prevCriteria) => ({ ...prevCriteria, [name]: value }));
        // Reset selected municipio when estado user
        setUser((prevCriteria) => ({ ...prevCriteria, municipio: 0 }));
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
        if (!user.correo || !user.telefono || !user.municipio || isNaN(user.telefono)) {
            setInvalidFieldsDialog(true);
        } else {
            try {
                const body = new FormData();
                BigInt.prototype.toJSON = function () { return this.toString() }
                body.set("user", JSON.stringify(user));
                body.set("userType", JSON.stringify(userType));
                body.set("userInit", JSON.stringify(props.user));
                body.set("image", image);
                const response = await fetch("/api/adoptante", {
                    method: "PUT",
                    body
                });
                if (response.status == 200) {
                    setModifiedDialog(true);
                    response.json().then(
                        response => setCookie('token', response.token)
                    )
                    router.refresh();
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

    const modifyEmpleado = async (e) => {
        e.preventDefault();
        //field validation
        if (userType == 2) {
            if (!user.correo || !user.telefono) {
                setInvalidFieldsDialog(true);
                return;
            }
        } else if (userType == 3) {
            if (!user.nombre || !user.apellido || !user.correo || !user.telefono || !user.fechaRegistro) {
                setInvalidFieldsDialog(true);
                return;
            }
        }

        try {
            const body = new FormData();
            BigInt.prototype.toJSON = function () { return this.toString() }
            body.set("user", JSON.stringify(user));
            body.set("userType", JSON.stringify(userType));
            body.set("userInit", JSON.stringify(props.user));
            userType == 3 && body.set("image", image);
            const response = await fetch("/api/empleado", {
                method: "PUT",
                body
            });
            if (response.status == 200) {
                setModifiedDialog(true);
                response.json().then(
                    response => setCookie('token', response.token)
                )
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

    const deleteAdoptante = async (e) => {
        setWarningDialog(false);
        const id = props.user.id;
        const userType = props.userType;
        const params = JSON.stringify({ id, userType });
        const response = await fetch(`/api/adoptante?params=${params}`, {
            method: "DELETE"
        });
        if (response.status == 200) {
            setDeletedDialog(true);
            router.replace("/login");
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
        userType == 1 ? (
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
                            ) : props.user.imagen ? (
                                <Image
                                    width={200}
                                    height={200}
                                    src={`/images/adoptantes/${props.user.imagen}`}
                                    alt={`ImagenAdoptante${props.user.id}`} />
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
                        <InputLabel id={"nombre"} label={"Nombre"} placeholder={"Nombre"} value={user.nombre} disabled />
                        <InputLabel id={"apellido"} label={"Apellido"} placeholder={"Apellido"} value={user.apellido} disabled />
                        <InputLabel
                            id={"correo"}
                            label={"Correo electronico"}
                            placeholder={"Correo electrónico"}
                            onChange={handleInputChange}
                            name={"correo"}
                            value={user.correo} />
                        <InputLabel
                            id={"telefono"}
                            label={"Numero de telefono"}
                            placeholder={"Numero de telefono"}
                            onChange={handleInputChange}
                            name={"telefono"}
                            value={user.telefono} />
                        <div className={perfilAdoptador.datosperfil}>
                            <div className="input mb-3 mt-3">
                                <label htmlFor="estado" className="form-label">Estado</label>
                                <Estados handleChange={handleEstadoChange} estados={props.estados} value={user.estado} />
                            </div>
                            <div className="input mb-3 mt-3">
                                <label htmlFor="municipio" className="form-label">Municipio</label>
                                <Municipios handleChange={handleInputChange} municipiosInicial={props.municipios} selectedEstado={user.estado} value={user.municipio} />
                            </div>
                        </div>
                        <div className="contenedor-btn d-flex flex-row justify-content-center gap-2 m-3">
                            <button type="submit" className="btn btn-primary btn-lg" onClick={modifyAdoptante} disabled={unmodified}>Guardar</button>
                            <button type="submit" className="btn btn-danger btn-lg" onClick={warning}>Eliminar cuenta</button>
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
                    <h1>Cuenta eliminada</h1>
                    <p>Se ha eliminado su cuenta de la pagina</p>
                    <p>Sera redirigido a la pagina Inicar sesión</p>
                </Dialog>
                <Dialog id={"warning"} isOpen={warningDialog} onClose={() => setWarningDialog(false)} fun={deleteAdoptante} confirmar={true}>
                    <h1>Advertencia</h1>
                    <p>Estas apunto de eliminar su cuenta de la pagina<br />Esta acción sera irreversible</p>
                    <p>Haga clic en confirmar para continuar</p>
                </Dialog>
                <Dialog id={"adopcion"} isOpen={adopcionDialog} onClose={() => setAdopcionDialog(false)}>
                    <h1>Error al eliminar cuenta</h1>
                    <p>Se ha encontrado que tiene al menos una mascota adoptada</p>
                    <p>No puede eliminar la cuenta si ha adoptado a una mascota</p>
                    <p>Cancele la adopción y devuelva la mascota al refugio si quiere eliminar la cuenta</p>
                </Dialog>
            </>

        ) : userType == 2 ? (
            <>
                <form className="m-3">
                    <div className="perfilEmpleado">
                        <h1>Perfil</h1>
                        <div className="datos-empleado">
                            <div className={perfilAdoptador.perfil}>
                                {props.user.imagen ? (
                                    <Image
                                        width={200}
                                        height={200}
                                        src={`/images/empleados/${props.user.imagen}`}
                                        alt={`ImagenEmpleado${props.user.id}`} />
                                ) : (
                                    <Image
                                        width={200}
                                        height={200}
                                        src={"/images/defaultUser.png"}
                                        alt="DefaultIcon" />
                                )}
                            </div>
                            <InputLabel id={"nombre"} label={"Nombre"} name={"nombre"} value={props.user.nombre} disabled />
                            <InputLabel id={"apellido"} label={"Apellido"} name={"apellido"} value={props.user.apellido} disabled />
                            <InputLabel
                                id={"correo"}
                                label={"Correo electronico"}
                                name={"correo"}
                                value={user.correo}
                                onChange={handleInputChange} />
                            <InputLabel
                                id={"numero"}
                                label={"Numero de telefono"}
                                placeholder={"Numero de telefono"}
                                name={"telefono"}
                                value={user.telefono}
                                onChange={handleInputChange} />
                            <InputLabel id={"NIP"} label={"NIP"} name={"nip"} value={props.user.NIP} disabled />
                            <InputLabel
                                id={"fecRegistro"}
                                type={"text"}
                                label={"Fecha de registro"}
                                name={"fechaRegistro"}
                                disabled
                                value={new Date(Date.parse(props.user.fechaRegistro)).toLocaleDateString("es-mx", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })} />
                            <InputLabel id={"tipoEmpleado"} label={"Tipo empleado"} name={"tipoEmpleado"} value={"Empleado"} disabled />
                            <button
                                className="btn btn-primary m-2"
                                type="submit"
                                disabled={unmodified}
                                onClick={modifyEmpleado}>Guardar</button>
                        </div>
                    </div>
                </form>

                <Dialog id={"invalidField"} isOpen={invalidFieldsDialog} onClose={() => setInvalidFieldsDialog(false)}>
                    <h1>Error valores invalidos</h1>
                    <p>No se pueden modificar datos con valores invalidos</p>
                    <p>El campo correo, y telefono no puede quedar vacio</p>
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
            </>
        ) : userType == 3 && (
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
                                        alt="UploadedImage" />
                                ) : props.user.imagen ? (
                                    <Image
                                        width={200}
                                        height={200}
                                        src={`/images/empleados/${props.user.imagen}`}
                                        alt={`ImagenEmpleado${props.user.id}`} />
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

                            <InputLabel id={"nombre"} label={"Nombre"} name={"nombre"} value={user.nombre} onChange={handleInputChange} />
                            <InputLabel id={"apellido"} label={"Apellido"} name={"apellido"} value={user.apellido} onChange={handleInputChange} />
                            <InputLabel
                                id={"correo"}
                                label={"Correo electronico"}
                                name={"correo"}
                                value={user.correo}
                                onChange={handleInputChange} />
                            <InputLabel
                                id={"numero"}
                                label={"Numero de telefono"}
                                placeholder={"Numero de telefono"}
                                name={"telefono"} value={user.telefono}
                                onChange={handleInputChange} />
                            <InputLabel id={"NIP"} label={"NIP"} name={"nip"} value={user.NIP} onChange={handleInputChange} disabled />
                            <InputLabel
                                id={"fecRegistro"}
                                type={"date"}
                                label={"Fecha de registro"}
                                name={"fechaRegistro"}
                                value={user.fechaRegistro}
                                onChange={handleInputChange}
                                disabled />
                            <InputLabel id={"tipoEmpleado"} label={"Tipo empleado"} name={"tipoEmpleado"} value={"Administrador"} disabled />
                            <center>
                                <button
                                    className="btn btn-primary m-2 btn-lg"
                                    type="submit"
                                    disabled={unmodified}
                                    onClick={modifyEmpleado}>Guardar</button>
                            </center>
                        </div>
                    </div>
                </form>

                <Dialog id={"invalidField"} isOpen={invalidFieldsDialog} onClose={() => setInvalidFieldsDialog(false)}>
                    <h1>Error valores invalidos</h1>
                    <p>No se pueden modificar datos con valores invalidos</p>
                    <p>Los campos no pueden quedar vacios</p>
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
            </>
        )
    )
}
