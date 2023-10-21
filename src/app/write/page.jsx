"use client";
import React, { useState } from "react";
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
    if(!res.ok) {
        alert("Image upload failed")
    }
    const imageData = await res.json();
    return imageData.url;
};

const WritePage = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState("");
    const [image, setImage] = useState(null);

    const styles = {
        icon: "text-2xl font-extrabold ",
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        const image = e.target.files[0];

        if (image.size > 2000000) {
            alert("Image size limit 2 MB");
            return;
        }

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "blogio_cloud");
        setImage(data);
    };

    const handlePublish = async (e) => {
        e.preventDefault();

        const imageUrl = await imageUpload(image);
        console.log(imageUrl)

        console.log(image);
        console.log(title);
        console.log(desc);
    };

    return (
        <div className="flex flex-col gap-3 p-3 my-2">
            <h2 className=" font-bold text-3xl">Write your story here</h2>
            <input
                className="text-3xl focus:outline-none  bg-transparent"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
