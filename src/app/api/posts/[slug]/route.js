import prisma from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        const { slug } = await params;

        const post = await prisma.post.findUnique({
            where: {
                slug: slug,
            },
            include: {
                category: true,
                user: true,
                comments: true,
            },
        });

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
