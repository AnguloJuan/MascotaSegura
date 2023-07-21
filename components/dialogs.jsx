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
      <button type='button' id={`btnCerrar${id}`} className="btn cerrar-dialog text-black" onClick={handleClose}>
        X
      </button>
      {children}
      {okDialog && (
        <button id={`btnCerrar${id}`} type='button' className="btn btn-primary" onClick={handleClose}>
          Ok
        </button>
      )}
      {confirmar && (
        <div className='d-flex justify-content-around'>
          <button id={`btnCerrar${id}`} type='button' className="btn btn-primary" onClick={handleClose}>
            Cancelar
          </button>
          <button id={`btnConfirmar${id}`} type='button' className="btn btn-danger" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      )}
    </dialog>
  );
}
