import { createContext, useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

// Context
const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
})

// Provider
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    useEffect(()=> {
        // Check localStorage on mount
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark'); 
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Hook
export const useTheme = () => useContext(ThemeContext);

// Toggle Button Component
export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="h-9 w-9 rounded-md" 
            aria-label="Toggle theme">
                {theme === 'light' ? (
                    <Moon className="w-4 h-4 transition-all" />    
                ) : (
                    <Sun className="w-4 h-4 transition-all" />
                )}
        </Button>
    )
}