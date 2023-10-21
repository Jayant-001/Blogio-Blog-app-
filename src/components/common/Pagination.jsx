"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ page, hasPrev, hasNext }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const styles = {
        button: "bg-orange-500 px-8 py-2 rounded-md active:opacity-80",
    };

    return (
        <div className="w-full flex justify-around my-8">
            <button
                onClick={() =>
                    router.push(
                        `/?page=${parseInt(page) - 1}${
                            searchParams.has("category")
                                ? "&category=" + searchParams.get("category")
                                : ""
                        }`
                    )
                }
                className={`${styles.button} ${
                    hasPrev ? "" : "disabled:cursor-not-allowed opacity-50"
                }`}
                disabled={!hasPrev}
            >
                Prev
            </button>
            <button
                onClick={() =>
                    router.push(
                        `/?page=${parseInt(page) + 1}${
                            searchParams.has("category")
                                ? "&category=" + searchParams.get("category")
                                : ""
                        }`
                    )
                }
                className={`${styles.button} ${
                    hasNext ? "" : "disabled:cursor-not-allowed opacity-50"
                }`}
                disabled={!hasNext}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
