import React from "react";
import TopPosts from "../homeRightSection/TopPosts";
import CategoryList from "./CategoryList";

const Menu = () => {
    return (
        <div className="h-fit">
            <TopPosts />
            <CategoryList />
        </div>
    );
};

export default Menu;
