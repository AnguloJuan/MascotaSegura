import { getPrisma } from "@/app/lib/prisma";
import SignIn from "./signin";
import { estado } from "@prisma/client";

export const metadata = {
    title: 'Crear cuenta',
}
const prisma = getPrisma();

export default async function Page() {
    const estados: Array<estado> = await prisma.estado.findMany();
    return (
        <SignIn estados={estados} />
    );
}