export function Dialog({ id, children, isOpen, onClose, okDialog, confirmar, fun }) {
    return (
      <>
        {isOpen && (
          <dialog id={id} open>
            <button id={`btnCerrar${id}`} className="btn cerrar-dialog" onClick={onClose}>
              X
            </button>
            {children}
            {okDialog && (
              <button id={`btnCerrar${id}`} className="btn btn-primary" onClick={onClose}>
                Ok
              </button>
            )}
            {confirmar && (
              <>
                <button id={`btnCerrar${id}`} className="btn btn-primary" onClick={onClose}>
                  Cancelar
                </button>
                <button id={`btnConfirmar${id}`} className="btn btn-primary" onClick={fun}>
                  Confirmar
                </button>
              </>
            )}
          </dialog>
        )}
      </>
    );
  }
  