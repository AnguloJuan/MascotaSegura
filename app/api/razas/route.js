import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const prisma = getPrisma();

export async function GET(request) {
    const especie = request.nextUrl.searchParams.get('especie');
    try {
        let razas
        try {
            razas = await prisma.raza.findMany({
                where:{
                    idEspecie: parseInt(especie),
                }
            });
        } catch (error) {
            console.log(error);
        }
        return NextResponse.json({ razas: razas }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch razas' }, { staus: 500 });
    }
}
