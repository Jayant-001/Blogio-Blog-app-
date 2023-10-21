"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const CommentForm = ({ postSlug }) => {
    const [desc, setDesc] = useState("");
    const session = useSession();
    const queryClient = useQueryClient();

    const commentMutation = useMutation({
        mutationFn: async () =>
            await axios.post(`/api/comments`, {
                userEmail: session.data.user.email,
                desc,
                postSlug: postSlug,
            }),
        onSuccess: ({ data }) => {
            alert("Comment added");
            queryClient.invalidateQueries({
                queryKey: ["post", postSlug, "comments"],
            });
        },
        onError: (error) => {
            console.log("error", error.message);
        },
    });

    const handlePostComment = (e) => {
        e.preventDefault();

        commentMutation.mutate();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold ">Discussion</h2>
            </div>

            {/* Create comment form */}
            <form className="mb-6" onSubmit={handlePostComment}>
                <div className="py-2 px-2 mb-4  rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">
                        Your comment
                    </label>
                    <textarea
                        id="comment"
                        rows="6"
                        className="px-0 w-full text-sm outline-none resize-none active:border-0 active:ring-0 focus:outline-0 focus:ring-0 dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write a comment..."
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                </div>
                {session.status === "authenticated" ? (
                    <input
                        type="submit"
                        className="inline-flex border cursor-pointer hover:bg-slate-800 items-center py-2.5 px-4 text-xs font-medium text-center rounded-lg focus:ring-4 "
                        value="Post comment"
                    />
                ) : (
                    <p>
                        <Link href="/login" className="text-blue-500 underline">
                            Login
                        </Link>{" "}
                        to post a comment.
                    </p>
                )}
            </form>
        </div>
    );
};

export default CommentForm;
