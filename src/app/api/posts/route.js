import prisma from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const POST_PER_PAGE = 2;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page"));
    const category = searchParams.get("category");

    const query = {
        take: POST_PER_PAGE,
        skip: (page - 1) * POST_PER_PAGE,
        where: {
            ...(category && { catSlug: category }),
        },
        include: {
            category: true,
        },
    };

    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({ where: query.where }),
        ]);

        return NextResponse.json(
            { posts, total: count, postPerPage: POST_PER_PAGE },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        const { title, slug, desc, catSlug, userEmail, img } = await req.json();

        const post = await prisma.post.create({
            data: {
                title,
                desc,
                catSlug,
                userEmail,
                slug,
                img,
            },
        });

        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
