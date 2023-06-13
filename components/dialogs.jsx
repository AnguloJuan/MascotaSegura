import { useRef, useEffect } from 'react';

export function Dialog({ id, children, isOpen, onClose, okDialog, confirmar, fun }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    fun();
  };

  return (
    <dialog id={id} ref={dialogRef}>
      <button id={`btnCerrar${id}`} className="btn cerrar-dialog" onClick={handleClose}>
        X
      </button>
      {children}
      {okDialog && (
        <button id={`btnCerrar${id}`} className="btn btn-primary" onClick={handleClose}>
          Ok
        </button>
      )}
      {confirmar && (
        <>
          <button id={`btnCerrar${id}`} className="btn btn-primary" onClick={handleClose}>
            Cancelar
          </button>
          <button id={`btnConfirmar${id}`} className="btn btn-primary" onClick={handleConfirm}>
            Confirmar
          </button>
        </>
      )}
    </dialog>
  );
}
