import { getPrisma } from "@/app/lib/prisma";
import ListaAdoptantes from "./listaAdoptantes";
import { GetUser } from "@/app/lib/user";
const prisma = getPrisma();

export default async function adoptantes() {
    const user = GetUser();
    const adoptantes = await prisma.adoptante.findMany();
    const estados = await prisma.estado.findMany();

    const props = { user, adoptantes, estados }
    return (
        <ListaAdoptantes props={props} />
    )
}