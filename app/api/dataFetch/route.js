import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const prisma = getPrisma();

// api route to fetch simple data list from the database
export async function GET(request) {
    const search = request.nextUrl.searchParams.get('search');
    let data;
    try {
        try {
            // change prisma query to get the data requested
            if (search == 'especies') data = await prisma.especie.findMany();
            else if (search == 'razas') data = await prisma.mascota.findMany({
                // will remove this part of code as soon as schema is updated
                select: {
                    id: true,
                    raza: true,
                },
                distinct: 'raza',
            });
            else if (search == 'estados') data = await prisma.estado.findMany();
            else {
                return NextResponse.json({ error: 'Invalid search criteria' }, { status: 400 });
            }
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: 'Failed to fetch data ', error }, { staus: 500 });
        }
        return NextResponse.json({ data: data }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data ', error }, { staus: 500 });
    }
}
