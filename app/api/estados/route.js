import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const prisma = getPrisma();

export async function GET() {
    try {
        let municipios
        try {
            municipios = await prisma.municipio.findMany();
        } catch (error) {
            console.log(error);
        }
        return NextResponse.json({ municipios }, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: 'Failed to fetch municipios' }, { staus: 500 });
    }
}
