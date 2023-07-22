"use client"
import style from "../reporte.module.css";
import { useState } from "react";
import { Dialog } from "@/components/dialogs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Estados, EstadosReporte } from "@/components/Selects";
import { Municipios } from "@/components/SelectsClient";
import Input from "@/components/Input";

export default function Reportar({ props }) {
    const userType = props.user.idTipoUsuario;
    const [reporte, setReporte] = useState({
        descripcion: "",
        municipio: 0,
        nombre: "",
        correo: "",
        idReportador: props.user.id,
        estado: 0,
    });
    const [unmodified, setUnmodified] = useState(true);
    const [invalidFieldsDialog, setInvalidFieldsDialog] = useState(false);
    const [reportadoDialog, setReportadoDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [unmodifiedDialog, setUnmodifiedDialog] = useState(false);
    const [warningDialog, setWarningDialog] = useState(false);
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const router = useRouter();

    const handleInputChange = (e) => {
        setUnmodified(false);
        const { name, value } = e.target;
        setReporte((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    };
    const handleEstadoChange = (e) => {
        setUnmodified(false);
        const { name, value } = e.target;
        setReporte((prevCriteria) => ({ ...prevCriteria, [name]: value }));
        // Reset selected municipio when estado reporte
        setReporte((prevCriteria) => ({ ...prevCriteria, municipio: 0 }));
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

    const reportar = async (e) => {
        setWarningDialog(false);
        setUnmodified(true);
        if (!reporte.municipio || !reporte.descripcion) {
            setInvalidFieldsDialog(true);
            return;
        }
        if (userType !== 1 && (!reporte.nombre || !reporte.correo)) {
            setInvalidFieldsDialog(true);
            return;
        }
        try {
            const body = new FormData();
            body.set("reporte", JSON.stringify(reporte));
            body.set("userType", JSON.stringify(userType));
            body.set("image", image);
            const response = await fetch("/api/reportes", {
                method: "POST",
                body
            });
            if (response.status == 200) {
                setReportadoDialog(true);
                response.json().then(res => (router.replace(`/reportes/reporte/${res.reporte.id}`)))
            } else {
                response.json().then(res => console.log(res.message))
                setErrorDialog(true);
                setUnmodified(false);
            }
        } catch (error) {
            console.log(error);
            setErrorDialog(true);
            setUnmodified(false);
        }
    };

    return (
        <>
            <form className="m-3">
                <div className="perfilEmpleado">
                    <h1>Información del reporte</h1>
                    <div className="datos-reporte">
                        <center>
                            <div className={style.perfil}>
                                {image ? (
                                    <Image
                                        width={200}
                                        height={200}
                                        src={createObjectURL}
                                        alt={`Uploaded Image`}
                                        className="rounded-top" />

                                ) : (
                                    <Image
                                        width={250}
                                        height={250}
                                        src={"/images/defaultReporte.png"}
                                        alt="DefaultIcon"
                                        className="rounded-top" />
                                )}
                                <input id="perfil"
                                    type="file"
                                    name="perfil"
                                    onChange={uploadToClient}
                                    accept="image/*, .jpg, .png, .svg, .webp, .jfif"
                                    className="form-control" />
                            </div>
                        </center>

                        <div className="input mb-3 mt-3">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <Estados handleChange={handleEstadoChange} estados={props.estados} value={reporte.estado} />
                        </div>
                        <div className="input mb-3 mt-3">
                            <label htmlFor="municipio" className="form-label">Municipio</label>
                            <Municipios handleChange={handleInputChange} selectedEstado={reporte.estado} value={reporte.municipio} />
                        </div>
                        <div className="input mb-3 mt-3">
                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                            <textarea name="descripcion" id="descripcion" rows="5" placeholder="Descripción"
                                onChange={handleInputChange} value={reporte.descripcion} className="form-control" required></textarea>
                        </div>

                        {userType !== 1 && (
                            <>
                                <Input id={"nombre"} label={"Nombre completo"} placeholder={"Nombre completo"}
                                    value={reporte.nombre} name={"nombre"} onChange={handleInputChange} required />

                                <Input id={"correo"} label={"Correo electrónico"} placeholder={"Correo electrónico"}
                                    value={reporte.correo} name={"correo"} onChange={handleInputChange} required />
                            </>
                        )}

                        <center>
                            <button
                                className="btn btn-danger m-2 btn-lg"
                                type="submit"
                                disabled={unmodified}
                                onClick={(e) => { e.preventDefault(), setWarningDialog(true) }}>Reportar</button>
                        </center>
                    </div>
                </div>
            </form>


            <Dialog id={"invalidField"} isOpen={invalidFieldsDialog} onClose={() => setInvalidFieldsDialog(false)}>
                <h1>Error valores invalidos</h1>
                <p>No se pueden dejar campos con datos con datos vacios</p>
                <p>En los campos estado, municipio debe haber seleccionado una opción</p>
            </Dialog>
            <Dialog id={"unmodified"} isOpen={unmodifiedDialog} onClose={() => setUnmodifiedDialog(false)}>
                <h1>Error de modificación</h1>
                <p>No se ha registrado ningun cambio</p>
            </Dialog>
            <Dialog id={"modified"} isOpen={reportadoDialog} onClose={() => setReportadoDialog(false)}>
                <h1>Reporte registrado</h1>
                <p>El reporte ha sido guardados correctamente en la base de datos</p>
            </Dialog>
            <Dialog id={"error"} isOpen={errorDialog} onClose={() => setErrorDialog(false)}>
                <h1>Error de servidor</h1>
                <p>Ha ocurrido un error en el servidor</p>
                <p>Vuelva a intentarlo más tarde</p>
            </Dialog>
            <Dialog id={"warning"} isOpen={warningDialog} onClose={() => setWarningDialog(false)} fun={reportar} confirmar={true}>
                <h1>Advertencia</h1>
                <p>Estas por reportar un caso de maltrato animal</p>
                <p>Se investigara y se llevaran acciones legales para este caso</p>
                <p>Haga clic en confirmar para continuar</p>
            </Dialog>
        </>
    )
}