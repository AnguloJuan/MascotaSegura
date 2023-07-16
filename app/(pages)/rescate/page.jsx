import rescate from "./rescate.module.css"
import Rescate from "./rescate";
import { getPrisma } from "@/app/lib/prisma";
import { GetUser } from "@/app/lib/user";

const prisma = getPrisma();

export default async function RescatePage() {
    const especies = await prisma.especie.findMany();
    const user = GetUser();
    const idRefugio = user.idRefugio;
    return (
        <>
            <div>
                <h3>Registrar Mascota</h3>
                <Rescate especies={especies} idRefugio={idRefugio} />
            </div>
        </>
    )
}