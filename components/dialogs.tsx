import { useRef, useEffect, LegacyRef } from 'react';

interface Dialog {
  id: string,
  children: React.ReactNode,
  onClose: Function,
  isOpen: boolean,
  fun?: Function,
  okDialog?: boolean,
  confirmar?: boolean,
}

export function Dialog(props: Dialog) {
  const { id, children, isOpen, onClose, okDialog, confirmar, fun } = props;
  const dialogRef: LegacyRef<HTMLDialogElement> = useRef(null);

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
    fun ? fun() : undefined;
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
