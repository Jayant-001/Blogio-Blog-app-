"use client";
import { useContext, useEffect, useState } from "react";
import { themeContext } from "./ThemeContext";

const ContextProviders = ({ children }) => {
    const { theme } = useContext(themeContext);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (mounted) {
        return <div className={theme}>{children}</div>;
    }
};

export default ContextProviders;
