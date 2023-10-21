import prisma from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        
        const { searchParams } = new URL(req.url);
        const postSlug = searchParams.get("postSlug");

        const comments = await prisma.comment.findMany({
            where: {
                // ...GET(postSlug && { postSlug: postSlug }),
                postSlug,
            },
            include: { user: true },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        const { userEmail, desc, postSlug } = await req.json();

        const comment = await prisma.comment.create({
            data: {
                desc,
                userEmail,
                postSlug,
            },
        });

        return NextResponse.json({ comment }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
