import prisma from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const categories = await prisma.category.findMany();

        return NextResponse.json({ categories }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        const { category } = await req.json();
        const slug = category.toLowerCase().replaceAll(' ', '-')
        const res = await prisma.category.create({
            data: {
                slug,
                title: category,
            },
        });
        console.log(res);
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
