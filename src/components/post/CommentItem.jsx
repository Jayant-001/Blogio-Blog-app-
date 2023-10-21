'use client'
import Link from "next/link";
import React from "react";

const CommentItem = ({ comment }) => {
    return (
        <article className="mb-6 text-base rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <Link
                        href={`/user/${comment.user.id}`}
                        className="inline-flex items-center mr-3 font-semibold text-lg "
                    >
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Michael Gough"
                        />
                        <p>{comment.user.name}</p>
                    </Link>
                    <p className="text-sm">{comment.createdAt.substr(0, 10)}</p>
                </div>
            </div>
            <p>{comment.desc}</p>
        </article>
    );
};

export default CommentItem;
