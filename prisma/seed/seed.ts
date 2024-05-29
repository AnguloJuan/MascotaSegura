/**
 * ! Executing this script will delete all data in your database and seed it with 10 tipoUsuario.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  await seed.tipoUsuario([
    { usuario: 'Adoptante', },
    { usuario: 'Empleado', },
    { usuario: 'Administrador', },
  ])

  await seed.estado([
    { nombre: 'Aguascalientes', },
    { nombre: 'Baja California', },
    { nombre: 'Baja California Sur', },
    { nombre: 'Campeche', },
    { nombre: 'Chiapas', },
    { nombre: 'Chihuahua', },
    { nombre: 'Ciudad de México', },
    { nombre: 'Coahuila', },
    { nombre: 'Colima', },
    { nombre: 'Durango', },
    { nombre: 'Guanajuato', },
    { nombre: 'Guerrero', },
    { nombre: 'Hidalgo', },
    { nombre: 'Jalisco', },
    { nombre: 'México', },
    { nombre: 'Michoacán', },
    { nombre: 'Morelos', },
    { nombre: 'Nayarit', },
    { nombre: 'Nuevo León', },
    { nombre: 'Oaxaca', },
    { nombre: 'Puebla', },
    { nombre: 'Querétaro', },
    { nombre: 'Quintana Roo', },
    { nombre: 'San Luis Potosí', },
    { nombre: 'Sinaloa', },
    { nombre: 'Sonora', },
    { nombre: 'Tabasco', },
    { nombre: 'Tamaulipas', },
    { nombre: 'Tlaxcala', },
    { nombre: 'Veracruz', },
    { nombre: 'Yucatán', },
    { nombre: 'Zacatecas', },
    { nombre: 'Extranjero', },
  ]);

  await seed.empleado([
    { correo: 'admin@gmail.com', contrasena: 'admin', idTipoUsuario: 3, imagen: '' },
  ])
  // Seed the database with 10 empleado
  await seed.empleado((x) => x(10, { idTipoUsuario: 2, imagen: '' }));

  // Seed the database with 10 adoptante
  await seed.adoptante((x) => x(10, { idTipoUsuario: 1, imagen: '' }));

  await seed.sexo([
    { sexo: 'Macho', },
    { sexo: 'Hembra', },
    { sexo: 'No especificado', },
  ])

  await seed.mascota((x) => x(20, {
    imagen: '',
    edad: Math.floor(Math.random() * 20) + 1,
    idSexo: Math.floor(Math.random() * 3) + 1
  }));

  await seed.estadoReporte([
    { estado: 'Reportado', },
    { estado: 'En investigación', },
    { estado: 'Confirmado', },
    { estado: 'Resuelto', },
    { estado: 'Falso', },
  ])

  await seed.reporte((x) => x(20, {
    imagen: '',
    estadoReporteId: Math.floor(Math.random() * 5) + 1
  }));


  await seed.estadoAdopcion([
    { estadoAdopcion: 'Aceptado', },
    { estadoAdopcion: 'Denegado', },
    { estadoAdopcion: 'Procesando', },
    { estadoAdopcion: 'Cancelado', },
    { estadoAdopcion: 'Devuelto', },
  ])
  await seed.adopcion((x) => x(10,
    {
      idEstadoAdopcion: Math.floor(Math.random() * 5) + 1,
    }
  ));


  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();