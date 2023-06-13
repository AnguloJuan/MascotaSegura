export function Dialog({ id, children, okDialog, confirmar, fun }) {
    const dialog = document.getElementById(`${id}`);
    const closeDialog = () => {
        dialog.close();
    }
    return (
        <dialog id={id}>
            <button id={`btnCerrar${id}`} className="btn cerrar-dialog" onClick={closeDialog}>X</button>
            {children}
            {okDialog && (<button id={`btnCerrar${id}`} className="btn btn-primary" onClick={closeDialog}>Ok</button>)}
            {confirmar && (
                <>
                    <button id={`btnCerrar${id}`} className="btn btn-primary" onClick={closeDialog}>Cancelar</button>
                    <button id={`btnConfirmar${id}`} className="btn btn-primary" onClick={fun}>Confirmar</button>
                </>
            )}
        </dialog>
    )
}