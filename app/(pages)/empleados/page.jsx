import { getPrisma } from "@/app/lib/prisma";
import { GetUser } from "@/app/lib/user";
import ListaEmpleados from "./listaEmpleados";

const prisma = getPrisma();

export const metadata = {
  title: 'Empleados',
}

export default async function adoptantes() {
  const user = await GetUser();
  const empleados = await prisma.empleado.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
  });

  const props = { user, empleados }
  return (
    <ListaEmpleados props={props} />
  )
}