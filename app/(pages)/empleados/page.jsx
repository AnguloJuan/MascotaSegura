import { getPrisma } from "@/app/lib/prisma";
import { GetUser } from "@/app/lib/user";
import ListaEmpleados from "./listaEmpleados";
const prisma = getPrisma();

export default async function adoptantes() {
  const user = GetUser();
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