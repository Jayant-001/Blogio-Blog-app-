"use client";
import { themeContext } from "@/context/ThemeContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
// import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineLink } from "react-icons/ai";
import { BiSolidImage } from "react-icons/bi";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const imageUpload = async (data) => {
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/jayant-cloud/image/upload`,
        {
            method: "POST",
            body: data,
        }
    );
    if (!res.ok) {
        alert("Image upload failed");
    }
    const imageData = await res.json();
    return imageData.url;
};

const WritePage = () => {
    const session = useSession();
    const router = useRouter();
    const { theme } = useContext(themeContext);
    // const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

    if (session.status === "unauthenticated") {
        router.push("/");
    }
    const [post, setPost] = useState({
        title: "",
        desc: "",
        slug: "",
        catSlug: "",
        userEmail: "",
        img: "",
    });
    const [open, setOpen] = useState(false);
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState("");
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);

    const styles = {
        icon: "text-2xl font-extrabold ",
    };

    // fetching categories
    const categoryQuery = useQuery({
        queryKey: ["get", "categories"],
        queryFn: async () => await axios.get("/api/categories"),
    });

    if (categories.length < 1 && categoryQuery.data) {
        setCategories(categoryQuery.data.data.categories);
    }

    // create post mutation
    const postMutation = useMutation({
        mutationFn: async (post) => await axios.post("/api/posts", post),
        onSuccess: ({ data }) => {
            // TODO : Add toast
            console.log(data);
            alert("Post created");
            setPost({
                title: "",
                desc: "",
                slug: "",
                catSlug: "",
                userEmail: "",
                img: "",
            });
        },
        onError: (error) => {
            console.log(error);
            alert("Error", error.message);
        },
    });

    const handleImageChange = async (e) => {
        e.preventDefault();
        const image = e.target.files[0];

        if (image.size > 2000000) {
            alert("Image size limit 2 MB");
            return;
        }

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "blogio_cloud");

        const imageUrl = await imageUpload(data);
        setPost({ ...post, img: imageUrl });
    };

    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

    useEffect(() => {
        setPost({ ...post, desc: desc });
    }, [desc]);
    useEffect(() => {
        const slug = slugify(post.title);
        setPost({ ...post, slug: slug });
    }, [post.title]);
    useEffect(() => {
        setPost({ ...post, userEmail: session?.data?.user?.email });
    }, [session]);

    const handlePublish = async (e) => {
        e.preventDefault();

        postMutation.mutate(post);
    };

    return (
        <div className="flex flex-col gap-3 p-3 my-2">
            <h2 className=" font-bold text-3xl">Write your story here</h2>
            <input
                className="text-3xl focus:outline-none  bg-transparent"
                type="text"
                placeholder="Title"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            {/* Editor */}
            <div className="flex gap-5  relative">
                <button onClick={() => setOpen(!open)} className={styles.icon}>
                    <AiOutlinePlus />
                </button>
                {open && (
                    // add button
                    <div className="absolute left-8 flex gap-3">
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <label htmlFor="image" className="cursor-pointer">
                            <p className={styles.icon}>
                                <BiSolidImage />
                            </p>
                        </label>
                        <button className={styles.icon}>
                            <AiOutlineLink />
                        </button>
                    </div>
                )}
            </div>
            <ReactQuill
                className="w-full min-h-[100px]"
                theme="bubble"
                value={desc}
                onChange={setDesc}
                placeholder="Tell your story..."
            />
            <div className="h-[1px] bg-gray-400 my-2 mx-auto w-full" />
            <div>
                <select
                    onChange={(e) =>
                        setPost({ ...post, catSlug: e.target.value })
                    }
                    name="category"
                    className={`bg-white ${
                        theme === "dark" && "dark:bg-black"
                    }`}
                >
                    <option value="">Choose category</option>
                    {categories.map((cat) => (
                        <option value={cat.slug} key={cat.id}>
                            {cat.title}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={handlePublish}
                className="flex mx-auto font-bold border rounded-md px-5 py-2 bg-blue-600 active:bg-blue-300 active:opacity-75"
            >
                Publish
            </button>
        </div>
    );
};

export default WritePage;
