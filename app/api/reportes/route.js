import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuid } from 'uuid';
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { GetUser } from "@/app/lib/user";

const prisma = getPrisma();

export async function POST(req) {
    try {
        const formData = await req.formData();
        const reporte = formData.get("reporte");
        const userType = formData.get("userType");
        const image = formData.get("image");
        const reporteParsed = JSON.parse(reporte.substring(reporte.indexOf('{'), reporte.lastIndexOf('}') + 1));
        const { descripcion, municipio } = reporteParsed;
        let nombre, correo, idReportador;
        if (userType != 1) {
            ({ nombre, correo } = reporteParsed);
        } else {
            idReportador = reporteParsed.idReportador
        }

        let uniqueName;
        if (image != "null") {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            uniqueName = `${uuid()}.${image.name.split('.').pop()}`;
            const filePath = path.join(process.cwd(), "public/images/reportes", uniqueName);
            writeFile(filePath, buffer);
        }
        try {
            const date = new Date().toISOString();
            let reporte
            if (userType != 1) {
                reporte = await prisma.reporte.create({
                    data: {
                        descripcion: descripcion,
                        fechaCreada: date,
                        municipio: { connect: { id: parseInt(municipio) } },
                        imagen: image != "null" ? uniqueName : undefined,
                        nombre,
                        correo,
                    }
                });
            } else {
                reporte = await prisma.reporte.create({
                    data: {
                        descripcion: descripcion,
                        fechaCreada: date,
                        reportador: { connect: { id: parseInt(idReportador) } },
                        municipio: { connect: { id: parseInt(municipio) } },
                        imagen: image != "null" ? uniqueName : undefined
                    }
                });
            }
            return NextResponse.json({ message: "reporte registrado", reporte }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "fallo al registrar reporte" }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "fallo al registrar mascota" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        let reportes;
        const search = req.nextUrl.searchParams.get('search');
        const { id, estadoReporte, estado, municipio } = JSON.parse(search);
        try {
            reportes = await prisma.reporte.findMany({
                where: {
                    id: id ? { equals: parseInt(id) } : undefined,
                    estadoReporte: estadoReporte ? { id: { equals: parseInt(estadoReporte) } } : undefined,
                    AND: [
                        municipio
                            ? { municipio: { id: (parseInt(municipio)) } }
                            : estado
                                ? { municipio: { estado: { id: parseInt(estado) } } }
                                : undefined,
                    ],
                },
                include: {
                    municipio: {
                        include: {
                            estado: true,
                        }
                    },
                }
            });
        } catch (error) {
            console.log(error);
        }
        return NextResponse.json({ reportes }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ error: 'Fallo al registrar el reporte' }, { staus: 500 });
    }
}

export async function PUT(req) {
    try {
        const formData = await req.formData();
        const reporteInit = formData.get("reporteInit");
        const reporte = formData.get("reporte");
        const image = formData.get("image");
        const reporteInitParsed = JSON.parse(reporteInit.substring(reporteInit.indexOf('{'), reporteInit.lastIndexOf('}') + 1));
        const reporteParsed = JSON.parse(reporte.substring(reporte.indexOf('{'), reporte.lastIndexOf('}') + 1));

        const { descripcion, municipio, estadoReporte } = reporteParsed;

        let uniqueName;
        if (image !== "null") {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            uniqueName = `${uuid()}.${image.name.split('.').pop()}`;
            const filePath = path.join(process.cwd(), "public/images/reportes", uniqueName);
            writeFile(filePath, buffer);

            if (reporteInitParsed.imagen) {
                const oldFilePath = path.join(process.cwd(), "public/images/reportes", reporteInitParsed.imagen);

                // Elimina la imagen anterior utilizando fs/promises
                await unlink(oldFilePath);
            }
        }

        try {
            await prisma.reporte.update({
                where: {
                    id: parseInt(reporteInitParsed.id),
                },
                data: {
                    descripcion: descripcion !== reporteInitParsed.descripcion ? descripcion : undefined,
                    municipio: municipio !== reporteInitParsed.municipio ? { connect: { id: parseInt(municipio) } } : undefined,
                    estadoReporte: estadoReporte !== reporteInitParsed.estadoReporte ? { connect: { id: parseInt(estadoReporte) } } : undefined,
                    imagen: image !== "null" ? uniqueName : undefined
                }
            });

            return NextResponse.json({ message: 'Reporte modified' }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: 'Modification failed' }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Fields Failed' }, { status: 500 });
    }
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get('id');

    try {
        //delete image
        const imagenPath = await prisma.reporte.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                imagen: true,
            }
        });
        if (imagenPath.imagen !== null) {
            const oldFilePath = path.join(process.cwd(), "public/images/reportes", imagenPath.imagen);
            await unlink(oldFilePath);
        }

        //delete user
        await prisma.reporte.delete({
            where: {
                id: parseInt(id)
            }
        });

        return NextResponse.json({ message: "Reporte eliminado" }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ error: 'Fallo al eliminar reporte' }, { staus: 500 });
    }
}