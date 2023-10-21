import Menu from "@/components/common/Menu";
import PostList from "@/components/home/PostList";
import React from "react";

const CategoryPage = ({ params, searchParams }) => {
    const page = searchParams.page || 1;

    const { category } = params;

    return (
        <div className="flex gap-2 w-full">
            <div className="w-full ">
                <PostList page={page} category={category} />
            </div>
            <div className="w-[35%] ">
                <Menu />
            </div>
        </div>
    );
};

export default CategoryPage;
