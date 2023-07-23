"use client"
import { useState } from "react";
import { Dialog } from "@/components/dialogs";
import { useRouter } from "next/navigation";

export default function EliminarReporte({ props }) {
    const [errorDialog, setErrorDialog] = useState(false);
    const [deletedDialog, setDeletedDialog] = useState(false);
    const [warningDialog, setWarningDialog] = useState(false);
    const router = useRouter();

    const deleteReporte = async (e) => {
        setWarningDialog(false);
        const response = await fetch(`/api/reportes?id=${props.reporte.id}`, {
            method: "DELETE"
        });
        if (response.status == 200) {
            setDeletedDialog(true);
            router.replace("/reportes");
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
            <button type="submit" className="btn btn-danger btn-lg" onClick={warning} >Eliminar reporte</button>

            <Dialog id={"error"} isOpen={errorDialog} onClose={() => setErrorDialog(false)}>
                <h1>Error de servidor</h1>
                <p>Ha ocurrido un error en el servidor</p>
                <p>Vuelva a intentarlo más tarde</p>
            </Dialog>
            <Dialog id={"deleted"} isOpen={deletedDialog} onClose={() => setDeletedDialog(false)}>
                <h1>Reporte Eliminado</h1>
                <p>Se ha eliminado el reporte de la pagina</p>
                <p>Sera redirigido a la pagina reportes</p>
            </Dialog>
            <Dialog id={"warning"} isOpen={warningDialog} onClose={() => setWarningDialog(false)} fun={deleteReporte} confirmar={true}>
                <h1>Advertencia</h1>
                <p>Estas apunto de eliminar a un reporte de la pagina<br />Esta accion sera irreversible</p>
                <p>Haga clic en confirmar para continuar</p>
            </Dialog>
        </>
    )
}