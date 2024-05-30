import jsPDF from 'jspdf';
import convertDate from '@/app/lib/convertDate';
import Button from '@/components/Button';
import { IconDownload } from '@tabler/icons-react';

export default function DescargarDocumentoAdopcion({ mascota }) {
	const generatePdf = () => {
		//generate pdf
		const adoptante = mascota.adopcion.adoptante;
		const fechaAdopcion = convertDate(mascota.adopcion.fechaCreada);
		const doc = new jsPDF();
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(20);
		doc.text('Documento de adopción', 60, 20);

		doc.setFont('helvetica', 'bold');
		doc.setFontSize(14);
		doc.text('Datos del adoptante', 10, 30);

		doc.setFont('helvetica', 'normal');
		doc.setFontSize(12);
		doc.text(`Nombre: ${adoptante.nombre}`, 10, 40);
		doc.text(`Apellidos: ${adoptante.apellido}`, 10, 50);
		doc.text(
			`Dirección: ${adoptante.municipio.nombre}, ${adoptante.municipio.estado.nombre}`,
			10,
			60
		);
		doc.text(`Teléfono: ${adoptante.telefono}`, 10, 70);
		doc.text(`Email: ${adoptante.correo}`, 10, 80);

		doc.setFont('helvetica', 'bold');
		doc.setFontSize(14);
		doc.text('Datos de la mascota:', 10, 100);

		doc.setFont('helvetica', 'normal');
		doc.setFontSize(12);
		doc.text(`Nombre: ${mascota.nombre}`, 10, 110);
		doc.text(`Edad: ${mascota.edad}`, 10, 120);
		doc.text(`Especie: ${mascota.especie.especie}`, 10, 130);
		doc.text(`Raza: ${mascota.raza.raza}`, 10, 140);
		doc.text(`Sexo: ${mascota.sexo.sexo}`, 10, 150);
		doc.text(`Tamaño: ${mascota.tamano.tamano}`, 10, 160);
		doc.text(`Maltratado: ${mascota.maltratado ? 'Si' : 'No'}`, 10, 170);
		doc.text(
			`Descripción: ${
				mascota.descripcion ? mascota.descripcion : 'Sin descripción'
			}`,
			10,
			180
		);

		doc.setFont('helvetica', 'bold');
		doc.setFontSize(14);
		doc.text('Compromiso del adoptante:', 10, 190);

		doc.setFont('helvetica', 'normal');
		doc.setFontSize(12);
		doc.text(
			'Me comprometo a encargarme de esta mascota, cuidarloy quererlo',
			10,
			200
		);
		doc.text(
			'atender todas sus necesidades, protegerlo y tener sus vacunas al dia',
			10,
			210
		);

		doc.text(`Fecha de adopción: ${fechaAdopcion}`, 10, 230);
		doc.text('Firma del adoptante: ____________________', 10, 260);
		doc.text('Firma del refugio: ____________________', 110, 260);
		//Download the document
		// doc.save('documentoAdopcion.pdf');
		//print pdf
		doc.autoPrint();
		doc.output('dataurlnewwindow');
	};

	return (
		<Button
			type="button"
			className="flex gap-4 items-center"
			onClick={generatePdf}
		>
			<span>
				<IconDownload />
			</span>
			<span>Documento</span>
		</Button>
	);
}
