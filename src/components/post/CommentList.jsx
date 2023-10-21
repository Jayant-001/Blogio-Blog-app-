"use client";
import axios from "axios";
import React from "react";
import CommentItem from "./CommentItem";
import { useQuery } from "@tanstack/react-query";

const CommentList = ({ postSlug }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["post", postSlug, "comments"],
        queryFn: async () =>
            await axios.get(`/api/comments?postSlug=${postSlug}`),
    });

    if (isLoading) {
        return <h1>Comments are loading</h1>;
    }
    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const comments = data.data;

    return (
        <div>
            {comments?.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
