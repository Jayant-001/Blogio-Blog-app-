"use client";
import React, { useEffect } from "react";
import FeaturedPostItem from "../post/FeaturedPostItem";
import Pagination from "../common/Pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async (page) => {
    const { data, error } = await axios.get(`/api/posts?page=${page}`);
    if (error) return [];
    return data;
};

const PostList = ({ page, category }) => {
    const demoPosts = [
        {
            id: "clmxboc740004t4xk0kos4neu",
            createdAt: "2023-09-24T10:34:09.835Z",
            slug: "al",
            title: "abc",
            desc: "abc desc",
            img: null,
            views: 0,
            catSlug: "react",
            userEmail: "copycoder01@gmail.com",
            category: {
                id: "clmx8lcrm0002t4gg16lk7vah",
                slug: "react",
                title: "React",
            },
        },
    ];

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["posts", page],
        queryFn: async () =>
            await axios.get(
                `/api/posts?page=${page}&category=${category || ""}`
            ),
    });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h1>{JSON.stringify(error)}</h1>;
    }

    const { posts, total, postPerPage } = data.data;
    const hasPrev = (page - 1) * postPerPage > 0;
    const hasNext = (page - 1) * postPerPage + postPerPage < total;

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-widest my-3">
                Recent posts
            </h1>
            <div className="space-y-3">
                {posts.map((post) => {
                    return <FeaturedPostItem post={post} key={post.id} />;
                })}
            </div>
            <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
        </div>
    );
};

export default PostList;
