import { useRef, useEffect, useState } from 'react';
import jsPDF from 'jspdf';

export default function DescargarDocumentoAdopcion({ mascota }) {
    const dialogRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen && dialogRef.current) {
            dialogRef.current.showModal();
        } else if (!isOpen && dialogRef.current) {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const generatePdf = () => {
        //generate pdf
        const doc = new jsPDF();
        doc.text('Documento de adopción', 10, 10);
        doc.text('Datos del adoptante:', 10, 20);
        doc.text('Nombre: ', 10, 30);
        doc.text('Apellidos: ', 10, 40);
        doc.text('DNI: ', 10, 50);
        doc.text('Dirección: ', 10, 60);
        doc.text('Teléfono: ', 10, 70);
        doc.text('Email: ', 10, 80);
        doc.text('Datos de la mascota:', 10, 20);
        doc.text(`Nombre: ${mascota.nombre}`, 10, 10);
        doc.text(`Edad: ${mascota.edad}`, 10, 20);
        doc.text(`Especie: ${mascota.especie}`, 10, 30);
        doc.text(`Raza: ${mascota.raza}`, 10, 40);
        doc.text(`Sexo: ${mascota.sexo}`, 10, 50);
        doc.text(`Tamaño: ${mascota.tamano}`, 10, 60);
        //Download the document
        // doc.save('documentoAdopcion.pdf');
        //print pdf
        doc.autoPrint();
        doc.output('dataurlnewwindow');

        setIsOpen(false);
    };

    return (
        <button id='descargarDocumento' type='button' className="btn btn-primary btn-lg" onClick={generatePdf}>
            Descargar documento
        </button>
    );
}
