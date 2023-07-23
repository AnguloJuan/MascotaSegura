import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const prisma = getPrisma();

export async function GET() {
    try {
        let estados
        try {
            estados = await prisma.estado.findMany();
        } catch (error) {
            console.log(error);
        }
        return NextResponse.json({ estados }, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: 'Failed to fetch estados' }, { staus: 500 });
    }
}
