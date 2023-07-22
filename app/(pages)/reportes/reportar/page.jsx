import { getPrisma } from "@/app/lib/prisma";
import { GetUser } from "@/app/lib/user";
import Reportar from "./reportar";

const prisma = getPrisma();

export default async function ReportarPage() {
    const user = GetUser();
    const estados = await prisma.estado.findMany();

    const props = { user, estados }

    return (
        <Reportar props={props} />
    )
}