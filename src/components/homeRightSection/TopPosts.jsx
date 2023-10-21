import Link from "next/link";
import React from "react";

const TopPosts = () => {
    const topPosts = [1, 2, 3, 4, 5];
    return (
        <div className="rounded-md shadow-lg shadow-gray-800 p-2">
            <p className="opacity-60">{"What's hot"}</p>
            <h3 className="text-2xl tracking-wider font-bold">Top Posts</h3>
            <div className=" flex flex-col gap-3 mt-3">
                {topPosts.map((post, id) => (
                    <TopPostItem key={id} />
                ))}
            </div>
        </div>
    );
};

const TopPostItem = () => {
    return (
        <Link href="" className=" cursor-pointer hover:opacity-60">
            <span className="text-sm rounded-full">Blockchain</span>
            <h6 className="text-md font-semibold">
                Lorem ipsum dolor sit amet...
            </h6>
            <p className="text-sm opacity-90">
                <span>Jayant</span> - <span>11.02.2023</span>
            </p>
        </Link>
    );
};

export default TopPosts;
