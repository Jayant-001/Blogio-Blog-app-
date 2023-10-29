import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedPostItem = ({ post }) => {

    return (
        <section className="  rounded-md shadow-lg shadow-gray-700 h-fit">
            <div className=" mx-auto flex md:flex-row flex-col gap-5">
                {/* <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"> */}
                <div className="w-[30%] h-[100%] object-contain relative">
                    <img
                        className="object-cover object-center rounded-l"
                        alt="hero"
                        fill={true}
                        src="/culture.png"
                    />
                </div>
                <div className="lg:flex-grow md:w-1/2 py-3 flex flex-col md:items-start md:text-left items-center text-center">
                    <p>
                        <span>{post.createdAt.substring(0, 10)}</span>{" "}
                        <span className="bg-lime-600 rounded-full px-2">
                            {post.category.title}
                        </span>
                    </p>
                    <h1 className="title-font sm:text-3xl text-2xl mb-4 font-medium ">
                        {post.title}
                    </h1>
                    <div dangerouslySetInnerHTML={{ __html: post?.desc }} />
                    {/* <p className="mb-8 leading-relaxed">{post.desc}</p> */}
                    <div className="flex justify-center">
                        <Link
                            href={`/${post.slug}`}
                            className="inline-flex underline border-0 hover:opacity-70 cursor-pointer text-lg"
                        >
                            Read more
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPostItem;
