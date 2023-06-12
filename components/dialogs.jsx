export function ErrorDialog({ id, children }) {
    const dialog = document.getElementById(`${id}`);
    const closeDialog = () => {
        dialog.close();
    }
    return (
        <dialog id={id}>
            <button id="btnErrorCorreo" className="btn cerrar-dialog" onClick={closeDialog}>X</button>
            <h1>Error</h1>
            {children}
        </dialog>
    )
}

export function ConfirmarDialog({ id, children }) {
    const dialog = document.getElementById(`${id}`);
    const closeDialog = () => {
        dialog.close();
    }
    return (
        <dialog id={id}>
            <button id="btnErrorCorreo" className="btn cerrar-dialog" onClick={closeDialog}>X</button>
            {children}
            <button id="btnErrorCorreo" className="btn btn-primary" onClick={closeDialog}>Ok</button>
        </dialog>
    )
}

export function NotificacionDialog({ id, children }) {
    const dialog = document.getElementById(`${id}`);
    const closeDialog = () => {
        dialog.close();
    }
    return (
        <dialog id={id}>
            <button id="btnErrorCorreo" className="btn cerrar-dialog" onClick={closeDialog}>X</button>
            {children}
        </dialog>
    )
}