import {createContext, useState} from "react"

interface IThemeContextInterface {
    darkMode: boolean;
    toggleDarkMode: () => void;
    idString: string;
    setIdString: any;
}

export const ThemeContext = createContext<IThemeContextInterface>({
    darkMode: false,
    toggleDarkMode: () => {},
    idString: "",
    setIdString: ""
});

interface IThemeContextProviderProps {
    children: React.ReactNode;
}

const ThemeContextProvider = ({children} : IThemeContextProviderProps) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const toggleDarkMode = () => {
        setDarkMode((prevState) => !prevState);
    }

    const [idString, setIdString] = useState<string>("")

    return <ThemeContext.Provider value={{darkMode, toggleDarkMode, idString, setIdString}}>
        {children}
    </ThemeContext.Provider>
}

export default ThemeContextProvider;