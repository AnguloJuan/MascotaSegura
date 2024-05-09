import { getPrisma } from "@/app/lib/prisma";
import { GetUser } from "@/app/lib/user";
import Reportar from "./reportar";

const prisma = getPrisma();

export const metadata = {
    title: 'Reportar',
}

export default async function ReportarPage() {
    const user = await GetUser();

    const props = { user }

    return (
        <Reportar props={props} />
    )
}