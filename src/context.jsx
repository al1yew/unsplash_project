import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme:dark"
    ).matches;

    const storedDarkMode = localStorage.getItem("darktheme") === "true";

    return prefersDarkMode || storedDarkMode;
};

export const AppProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
    const [searchTerm, setSearchTerm] = useState("cat");

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        localStorage.setItem("darktheme", newDarkTheme);
    };

    useEffect(() => {
        document.body.classList.toggle("dark-theme", isDarkTheme);
    }, [isDarkTheme]);

    return (
        <AppContext.Provider
            value={{ toggleDarkTheme, isDarkTheme, searchTerm, setSearchTerm }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => useContext(AppContext);
