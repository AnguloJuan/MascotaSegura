"use client"
import { useState } from "react";
import { Dialog } from "@/components/dialogs";
import { useRouter } from "next/navigation";

export default function EliminarReporte({ props }) {
    const [warningDialog, setWarningDialog] = useState(false);
    const { addToast } = useToast();
    const router = useRouter();

    const deleteReporte = async (e) => {
        setWarningDialog(false);
        const response = await fetch(`/api/reportes?id=${props.reporte.id}`, {
            method: "DELETE"
        });
        if (response.status == 200) {
            addToast("Reporte eliminado con exito", "success");
            router.replace("/reportes");
        } else {
            response.json().then(res => console.log(res.message))
            addToast("Ha ocurrido un error en el servidor", "error");
        }
    };
    const warning = (e) => {
        e.preventDefault();
        setWarningDialog(true);
    }

    return (
        <>
            <button type="submit" className="btn btn-danger btn-lg" onClick={warning} >Eliminar reporte</button>

            <Dialog id={"warning"} isOpen={warningDialog} onClose={() => setWarningDialog(false)} fun={deleteReporte} confirmar={true} contenido={true} >
                <h1>Advertencia</h1>
                <p>Estas apunto de eliminar a un reporte de la pagina<br />Esta accion sera irreversible</p>
                <p>Haga clic en confirmar para continuar</p>
            </Dialog>
        </>
    )
}