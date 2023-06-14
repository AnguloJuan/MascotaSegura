import { getPrisma } from "@/app/lib/prisma";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

const prisma = getPrisma();

export async function GET(req) {
    const { query } = req
    const name = query.name
    console.log(name);
    //const { estado } = name;
    //console.log(estado);

    try {
        const municipios = await prisma.municipio.findMany({
            where: {
                estado: {
                    id: parseInt(estado, 10),
                },
            },
        });
        NextResponse.json({ municipios }, { status: 200 });
    } catch (error) {
        NextResponse.json({ error: 'Failed to fetch municipios' }, { status: 500 });
    }
}