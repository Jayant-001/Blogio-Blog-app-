"use client";
import { createContext, useState } from "react";

export const themeContext = createContext();

const isBrowser = () => {
    return typeof window !== "undefined";
};

const getFromLocalStorage = () => {
    if (isBrowser()) {
        const mode = localStorage.getItem("theme");
        return mode || "light";
    }
};

const ThemeContextProvider = ({ children }) => {
    const mode = getFromLocalStorage();
    const [theme, setTheme] = useState(mode);

    const toggleTheme = () => {
        const changedMode = mode === "light" ? "dark" : "light";
        if (isBrowser()) {
            localStorage.setItem("theme", changedMode);
            setTheme(changedMode);
        }
    };

    return (
        <themeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </themeContext.Provider>
    );
};

export default ThemeContextProvider;
