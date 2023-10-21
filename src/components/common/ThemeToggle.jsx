"use client";
import { themeContext } from "@/context/ThemeContext";
import Image from "next/image";
import React, { useContext, useState } from "react";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(themeContext);

    return (
        <div
            className={`w-[40px] h-[20px] rounded-[50px] bg-black flex items-center justify-between relative cursor-pointer p-1 mx-2 ${
                theme === "dark" ? "bg-white" : "bg-[#0f172a]"
            }`}
            onClick={toggleTheme}
        >
            <Image src="/moon.png" alt="" width={14} height={14} />
            <div
                className={`w-[15px] h-[15px] absolute rounded-[50%] bg-white ${
                    theme === "dark"
                        ? "left-1  bg-[#0f172a]"
                        : "right-1 bg-[white]"
                } `}
            ></div>
            <Image src="/sun.png" alt="" width={14} height={14} />
        </div>
    );
};

export default ThemeToggle;
