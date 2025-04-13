import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MoonIcon, SunIcon } from "lucide-react";

type TTheme = "light" | "dark";

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<TTheme>("light");

    // Get theme preferences from localStorage or system preference
    const getThemePreference = (): TTheme => {
        if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "light" || savedTheme === "dark") {
                return savedTheme;
            }
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    // Apply theme to document and update state
    const applyTheme = (newTheme: TTheme): void => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    // Toggle between light and dark themes
    const toggleTheme = (): void => {
        const newTheme: TTheme = theme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    };

    // Initialize theme on component mount
    useEffect(() => {
        const initialTheme = getThemePreference();
        applyTheme(initialTheme);

        // Listen for system preference changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleMediaChange = (): void => {
            if (!localStorage.getItem("theme")) {
                applyTheme(mediaQuery.matches ? "dark" : "light");
            }
        };

        mediaQuery.addEventListener("change", handleMediaChange);

        // Clean up event listener on component unmount
        return () => {
            mediaQuery.removeEventListener("change", handleMediaChange);
        };
    }, []);

    return (
        <div className="fixed top-4 right-4 z-50">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-full"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            <span className="sr-only">Toggle theme</span>
                            <SunIcon
                                className={`h-[1.2rem] w-[1.2rem] transition-all ${
                                    theme === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0"
                                }`}
                            />
                            <MoonIcon
                                className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                                    theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
                                }`}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Theme</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};
