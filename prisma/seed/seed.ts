// @ts-nocheck

/**
 * ! Executing this script will delete all data in your database and seed it with 10 tipoUsuario.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { PrismaClient } from "@prisma/client";
import { createSeedClient } from "@snaplet/seed";
import { copycat } from '@snaplet/copycat';

const main = async () => {
  // @ts-ignore
  const seed = await createSeedClient();
  
  const prisma = new PrismaClient();
  const estado = await prisma.estado.findMany({ select: { id: true } });
  const municipio = await prisma.municipio.findMany({ select: { id: true } });
  const tipoUsuario = await prisma.tipoUsuario.findMany({ select: { id: true } });
  const estadoReporte = await prisma.estadoReporte.findMany({ select: { id: true } });
  const tamano = await prisma.tamano.findMany({ select: { id: true } });
  const sexo = await prisma.sexo.findMany({ select: { id: true } });
  const especie = await prisma.especie.findMany({ select: { id: true } });
  const estadoAdopcion = await prisma.estadoAdopcion.findMany({ select: { id: true } });
  const refugio = await prisma.refugio.findMany({ select: { id: true } });

  // Truncate all tables in the database except for the ones listed below
  await seed.$resetDatabase([
    "!*_prisma_migrations",
    "!*estado",
    "!*municipio",
    "!*tipoUsuario",
    "!*estadoReporte",
    "!*tamano",
    "!*sexo",
    "!*estadoAdopcion",
    "!*refugio",
    "!*empleado",
    "!*espacios",
    "!*especie",
  ],);

  // Seed the database with 10 empleado
  await seed.empleado((x) => x(10,
    {
      idTipoUsuario: 2,
      imagen: '',
      correo: (ctx) =>
        copycat.email(ctx.seed, {
          domain: 'gmail.com',
        }),
    }),
    { connect: { refugio } });

  // Seed the database with 10 adoptante
  const { adoptante } = await seed.adoptante((x) => x(30, {
    idTipoUsuario: 1, imagen: '',
    correo: (ctx) =>
      copycat.email(ctx.seed, {
        domain: 'gmail.com',
      }),
      fechaRegistro: new Date(),
  }), { connect: { municipio } });


  const { raza } = await seed.raza((x) => x(60), { connect: { especie } });

  const { mascota } = await seed.mascota((x) => x(20, {
    imagen: '',
    edad: (ctx) =>
      copycat.int(ctx.seed, {
        min: 1,
        max: 20,
      }),
      fechaRegistro: new Date(),
      idRefugio: 1,
  }), { connect: { tamano, sexo, raza, especie, refugio } });


  await seed.adopcion((x) => x(10, {
    fechaCreada: new Date(),
    idRefugio: 1,
  }), { connect: { estadoAdopcion, mascota, refugio, adoptante } });

  await seed.reporte((x) => x(20, {
    imagen: '',
    correo: (ctx) =>
      copycat.email(ctx.seed, {
        domain: 'gmail.com',
      }),
      fechaCreada: new Date(),
  }), { connect: { estadoReporte, municipio, mascota, adoptante } });



  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();