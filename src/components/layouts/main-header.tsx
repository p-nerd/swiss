import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export const MainHeader = ({ pathname }: { pathname: string | null }) => {
    const routes = [
        {
            href: "/tools/converters",
            label: "Converters",
            active: pathname?.startsWith("/tools/converters")
        },
        {
            href: "/tools/generators",
            label: "Generators",
            active: pathname?.startsWith("/tools/generators")
        },
        {
            href: "/tools/formatters",
            label: "Formatters",
            active: pathname?.startsWith("/tools/formatters")
        },
        {
            href: "/tools/encoders",
            label: "Encoders & Decoders",
            active: pathname?.startsWith("/tools/encoders")
        },
        {
            href: "/tools/calculators",
            label: "Calculators",
            active: pathname?.startsWith("/tools/calculators")
        }
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center">
                <a href="/" className="flex items-center space-x-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded bg-red-600">
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                            S
                        </div>
                    </div>
                    <span className="font-bold text-xl hidden sm:inline-block">swiss</span>
                </a>
                <nav className="ml-6 hidden md:flex gap-6">
                    {routes.map((route) => (
                        <a
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                route.active ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            {route.label}
                        </a>
                    ))}
                </nav>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <div className="relative w-full max-w-sm lg:max-w-xs">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search tools..."
                            className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};
