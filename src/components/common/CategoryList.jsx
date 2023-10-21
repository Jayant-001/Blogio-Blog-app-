"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const CategoryList = () => {
    const demoCategories = [
        {
            name: "Coding",
            url: "/blogs/coding",
        },
        {
            name: "DSA",
            url: "/blogs/coding",
        },
        {
            name: "Blockchain",
            url: "/blogs/coding",
        },
        {
            name: "AI",
            url: "/blogs/coding",
        },
        {
            name: "Cloud",
            url: "/blogs/coding",
        },
        {
            name: "Serverless",
            url: "/blogs/coding",
        },
    ];

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => await axios.get("/api/categories"),
    });

    if (isLoading) {
        return <h1> Loading</h1>;
    }

    if (isError) {
        console.log(error);
        return <h1>{JSON.stringify(error)}</h1>;
    }

    const categories = data.data.categories;

    // console.log(categories);
    return (
        <div className="w-full  space-y-2 my-3 py-2">
            <h1 className="text-2xl font-bold tracking-wider">Categories</h1>
            <div className="flex flex-wrap justify-evenly">
                {categories.map((cat) => (
                    <CategoryItem key={cat.id} category={cat} />
                ))}
            </div>
        </div>
    );
};

const CategoryItem = ({ category }) => {
    // const searchParams = useSearchParams();
    // let q = {};
    // if (searchParams.has("page")) {
    //     q.page = searchParams.get("page");
    // }

    return (
        <Link
            // href={{ pathname: "/", query: { ...q, category: category.slug } }}
            href={`/posts/${category.slug}`}
            className="flex bg-[#57c4ff31] h-10 items-center justify-center m-2 px-3 rounded-lg"
        >
            {/* <Image
                src="/coding.png"
                alt="category image"
                width={32}
                height={32}
            /> */}
            <span className="capitalize">{category.title}</span>
        </Link>
    );
};

export default CategoryList;
