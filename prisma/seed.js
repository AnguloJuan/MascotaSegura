// ./prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Estado
    await prisma.estado.createMany({
        data: [
            { id: 1, nombre: 'Baja California Sur' },
            { id: 2, nombre: 'Jalisco' },
            { id: 3, nombre: 'Yucatán' },
            { id: 4, nombre: 'Nuevo León' },
            { id: 5, nombre: 'Veracruz' }
        ],
    });

    // Municipio
    await prisma.municipio.createMany({
        data: [
            { id: 1, nombre: 'Loreto', idEstado: 1 },
            { id: 2, nombre: 'La Paz', idEstado: 1 },
            { id: 3, nombre: 'Comondú', idEstado: 1 },
            { id: 4, nombre: 'Mulegé', idEstado: 1 },
            { id: 5, nombre: 'Los Cabos', idEstado: 1 },
            { id: 6, nombre: 'Guadalajara', idEstado: 2 },
            { id: 7, nombre: 'Zapopan', idEstado: 2 },
            { id: 8, nombre: 'Tlaquepaque', idEstado: 2 },
            { id: 9, nombre: 'Tonalá', idEstado: 2 },
            { id: 10, nombre: 'Puerto Vallarta', idEstado: 2 },
            { id: 11, nombre: 'Mérida', idEstado: 3 },
            { id: 12, nombre: 'Valladolid', idEstado: 3 },
            { id: 13, nombre: 'Progreso', idEstado: 3 },
            { id: 14, nombre: 'Izamal', idEstado: 3 },
            { id: 15, nombre: 'Tizimín', idEstado: 3 },
            { id: 16, nombre: 'Monterrey', idEstado: 4 },
            { id: 17, nombre: 'San Pedro Garza García', idEstado: 4 },
            { id: 18, nombre: 'Guadalupe', idEstado: 4 },
            { id: 19, nombre: 'Apodaca', idEstado: 4 },
            { id: 20, nombre: 'Escobedo', idEstado: 4 },
            { id: 21, nombre: 'Veracruz', idEstado: 5 },
            { id: 22, nombre: 'Xalapa', idEstado: 5 },
            { id: 23, nombre: 'Coatzacoalcos', idEstado: 5 },
            { id: 24, nombre: 'Poza Rica', idEstado: 5 },
            { id: 25, nombre: 'Córdoba', idEstado: 5 }
        ],
    });

    // TipoUsuario
    await prisma.tipoUsuario.createMany({
        data: [
            { id: 1, usuario: 'Adoptante' },
            { id: 2, usuario: 'Empleado' },
            { id: 3, usuario: 'Administrador' }
        ],
    });

    // EstadoReporte
    await prisma.estadoReporte.createMany({
        data: [
            { id: 1, estado: 'Reportado' },
            { id: 2, estado: 'En investigación' },
            { id: 3, estado: 'Confirmado' },
            { id: 4, estado: 'Resuelto' },
            { id: 5, estado: 'Falso' },
        ],
    });

    // Tamano
    await prisma.tamano.createMany({
        data: [
            { id: 1, tamano: 'No especificado' },
            { id: 2, tamano: 'Diminuto' },
            { id: 3, tamano: 'Pequeño' },
            { id: 4, tamano: 'Mediano' },
            { id: 5, tamano: 'Grande' },
            { id: 6, tamano: 'Enorme' },
        ],
    });

    // Sexo
    await prisma.sexo.createMany({
        data: [
            { id: 1, sexo: 'Macho' },
            { id: 2, sexo: 'Hembra' },
            { id: 3, sexo: 'Indefinido' },
        ],
    });

    //Especie
    await prisma.especie.createMany({
        data: [
            { id: 1, especie: 'Perro' },
            { id: 2, especie: 'Gato' },
            { id: 3, especie: 'Ave' },
            { id: 4, especie: 'Reptil' },
            { id: 5, especie: 'Roedor' },
            { id: 6, especie: 'Pez' },
            { id: 7, especie: 'Caballo' },
            { id: 8, especie: 'Vaca' },
            { id: 9, especie: 'Cerdo' },
            { id: 10, especie: 'Chivo' },
        ],
    });

    // EstadoAdopcion
    await prisma.estadoAdopcion.createMany({
        data: [
            { id: 1, estadoAdopcion: 'Aceptado' },
            { id: 2, estadoAdopcion: 'Cancelado' },
            { id: 3, estadoAdopcion: 'Procesando' },
        ],
    });

    // Refugio
    await prisma.refugio.createMany({
        data: [
            {
                id: 1,
                nombre: "San Bernardo",
                espacios: 30,
                fechaCreada: '2023-06-28T20:54:05.000Z',
                idMunicipio: 2
            },
            {
                id: 2,
                nombre: "San quitin",
                espacios: 20,
                fechaCreada: '2023-06-28T20:54:05.000Z',
                idMunicipio: 3
            },
            {
                id: 3,
                nombre: "Marquez",
                espacios: 25,
                fechaCreada: '2023-06-28T20:54:05.000Z',
                idMunicipio: 4
            },
            {
                id: 4,
                nombre: "BellaVista",
                espacios: 15,
                fechaCreada: '2023-06-28T20:54:05.000Z',
                idMunicipio: 5
            },
            {
                id: 5,
                nombre: "Bountique",
                espacios: 10,
                fechaCreada: '2023-06-28T20:54:05.000Z',
                idMunicipio: 6
            },
            {
                id: 6,
                nombre: "Labres",
                espacios: 35,
                fechaCreada: '2023-06-28T20:54:05.000Z',
                idMunicipio: 3
            }
        ],
    });

    // Empleado
    await prisma.empleado.createMany({
        data: [
            {
                id: 1,
                idRefugio: 1,
                nombre: 'Luis',
                apellido: 'Ortega',
                correo: 'empleado1@gmail.com',
                contrasena: 'password1',
                telefono: BigInt('6121928402'), // Convertir el valor a BigInt
                NIP: 'DEF456',
                idTipoUsuario: 3,
            },
            {
                id: 2,
                idRefugio: 1,
                nombre: 'Emiliano',
                apellido: 'Hernandez',
                correo: 'emiliano@gmail.com',
                contrasena: 'password2',
                telefono: BigInt('6122004032'), // Convertir el valor a BigInt
                NIP: 'EMI654',
                idTipoUsuario: 2,
            },
            {
                id: 3,
                idRefugio: 1,
                nombre: 'Federico',
                apellido: 'Castillos',
                correo: 'fede@gmail.com',
                contrasena: 'password3',
                telefono: BigInt('987654321'), // Convertir el valor a BigInt
                NIP: 'FED325',
                idTipoUsuario: 2,
            },
        ],
    });

    // Espacios
    await prisma.espacios.createMany({
        data: [
            {
                id: 2,
                espacioTotal: 20,
                espacioDisponible: 5,
                idEspecie: 2,
                idRefugio: 1
            },
            {
                id: 3,
                espacioTotal: 15,
                espacioDisponible: 10,
                idEspecie: 1,
                idRefugio: 1
            },
            {
                id: 4,
                espacioTotal: 10,
                espacioDisponible: 7,
                idEspecie: 3,
                idRefugio: 1
            },
            {
                id: 5,
                espacioTotal: 12,
                espacioDisponible: 6,
                idEspecie: 2,
                idRefugio: 2
            },
            {
                id: 6,
                espacioTotal: 18,
                espacioDisponible: 9,
                idEspecie: 1,
                idRefugio: 2
            },
            {
                id: 7,
                espacioTotal: 10,
                espacioDisponible: 5,
                idEspecie: 3,
                idRefugio: 2
            },
            {
                id: 8,
                espacioTotal: 15,
                espacioDisponible: 7,
                idEspecie: 2,
                idRefugio: 3
            },
            {
                id: 9,
                espacioTotal: 12,
                espacioDisponible: 6,
                idEspecie: 1,
                idRefugio: 3
            },
            {
                id: 10,
                espacioTotal: 18,
                espacioDisponible: 9,
                idEspecie: 3,
                idRefugio: 3
            },
            {
                id: 11,
                espacioTotal: 20,
                espacioDisponible: 10,
                idEspecie: 2,
                idRefugio: 4
            }
        ],
    });


    console.log('Seed completado.');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
