import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const prisma = getPrisma();

export async function POST(req) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method Not Allowed' }, {status: 405});
    }

    const { adopcionId, estado } = req.body;

    try {
        const updatedAdopcion = await prisma.adopcion.update({
            where: { id: adopcionId },
            data: { estadoAdopcion: estado },
        });
        NextResponse.json({ success: true, adopcion: updatedAdopcion }, {status: 200});
    } catch (error) {
        console.error('Error occurred while updating adopcion', error);
        NextResponse.json({ error: 'Failed to update adopcion' }, {staus: 500});
    }
}
