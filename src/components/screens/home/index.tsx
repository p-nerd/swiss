import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {
    ArrowRightIcon,
    CalculatorIcon,
    CodeIcon,
    FileTextIcon,
    RepeatIcon,
    Wand2Icon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const featuredTools = [
    {
        icon: <FileTextIcon className="h-8 w-8 text-red-500" />,
        title: "Text Tools",
        description: "Format, count, and manipulate text with ease",
        href: "/tools/text",
        examples: ["Case Converter", "Word Counter", "Lorem Ipsum Generator"]
    },
    {
        icon: <RepeatIcon className="h-8 w-8 text-blue-500" />,
        title: "Converters",
        description: "Convert between different units and formats",
        href: "/tools/converters",
        examples: ["JSON to CSV", "Image Converter", "Unit Converter"]
    },
    {
        icon: <Wand2Icon className="h-8 w-8 text-purple-500" />,
        title: "Generators",
        description: "Generate various types of content and data",
        href: "/tools/generators",
        examples: ["Password Generator", "QR Code Generator", "UUID Generator"]
    },
    {
        icon: <CodeIcon className="h-8 w-8 text-green-500" />,
        title: "Encoders & Decoders",
        description: "Encode and decode data in various formats",
        href: "/tools/encoders",
        examples: ["Base64", "URL Encoder", "HTML Entities"]
    },
    {
        icon: <CalculatorIcon className="h-8 w-8 text-amber-500" />,
        title: "Calculators",
        description: "Perform calculations for various purposes",
        href: "/tools/calculators",
        examples: ["Percentage Calculator", "Date Calculator", "BMI Calculator"]
    }
];

const categories = [
    { id: "popular", label: "Popular" },
    { id: "recent", label: "Recently Added" },
    { id: "developer", label: "Developer Tools" }
];

const popularTools = [
    { name: "Password Generator", category: "Generators", href: "/tools/generators/password" },
    { name: "JSON Formatter", category: "Formatters", href: "/tools/formatters/json" },
    { name: "Color Converter", category: "Converters", href: "/tools/converters/color" },
    { name: "Markdown Editor", category: "Editors", href: "/tools/editors/markdown" },
    { name: "Image Compressor", category: "Converters", href: "/tools/converters/image" },
    { name: "Base64 Encoder/Decoder", category: "Encoders", href: "/tools/encoders/base64" },
    { name: "URL Parser", category: "Developer Tools", href: "/tools/developer/url-parser" },
    { name: "CSV to JSON", category: "Converters", href: "/tools/converters/csv-json" }
];

const recentTools = [
    { name: "QR Code Scanner", category: "Utilities", href: "/tools/utilities/qr-scanner" },
    { name: "Regex Tester", category: "Developer Tools", href: "/tools/developer/regex" },
    {
        name: "CSS Minifier",
        category: "Developer Tools",
        href: "/tools/developer/css-minifier"
    },
    { name: "Favicon Generator", category: "Generators", href: "/tools/generators/favicon" },
    {
        name: "Meta Tags Generator",
        category: "Generators",
        href: "/tools/generators/meta-tags"
    },
    { name: "SVG Editor", category: "Editors", href: "/tools/editors/svg" },
    { name: "JWT Decoder", category: "Decoders", href: "/tools/decoders/jwt" },
    {
        name: "Cron Expression Generator",
        category: "Generators",
        href: "/tools/generators/cron"
    }
];

const developerTools = [
    { name: "JSON Validator", category: "Validators", href: "/tools/validators/json" },
    { name: "HTML Formatter", category: "Formatters", href: "/tools/formatters/html" },
    { name: "CSS Beautifier", category: "Formatters", href: "/tools/formatters/css" },
    {
        name: "JavaScript Minifier",
        category: "Developer Tools",
        href: "/tools/developer/js-minifier"
    },
    { name: "SQL Formatter", category: "Formatters", href: "/tools/formatters/sql" },
    { name: "Diff Checker", category: "Developer Tools", href: "/tools/developer/diff" },
    { name: "HTTP Request Tester", category: "Developer Tools", href: "/tools/developer/http" },
    {
        name: "Code Snippet Generator",
        category: "Generators",
        href: "/tools/generators/code-snippet"
    }
];

export const Home = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                Your Digital Swiss Army Knife
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                A versatile collection of web tools to help you with everyday tasks.
                                All in one place, all for free.
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button asChild size="lg">
                                <a href="/tools">
                                    Explore Tools
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <a href="/about">Learn More</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Tools Section */}
            <section className="w-full py-12 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                Featured Tools
                            </h2>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Discover our most powerful and versatile tools to boost your
                                productivity.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredTools.map((tool, index) => (
                            <Card key={index} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        {tool.icon}
                                        <CardTitle>{tool.title}</CardTitle>
                                    </div>
                                    <CardDescription>{tool.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                        {tool.examples.map((example, i) => (
                                            <li key={i}>{example}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="ghost" className="w-full">
                                        <a href={tool.href}>
                                            Explore {tool.title}
                                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Categories Section */}
            <section className="w-full py-12 md:py-24 bg-muted">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                Discover Tools
                            </h2>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Browse through our extensive collection of tools categorized for
                                your convenience.
                            </p>
                        </div>
                    </div>

                    <div className="mx-auto max-w-4xl py-8">
                        <Tabs defaultValue="popular" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                {categories.map((category) => (
                                    <TabsTrigger key={category.id} value={category.id}>
                                        {category.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value="popular" className="mt-6">
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {popularTools.map((tool, index) => (
                                        <a
                                            key={index}
                                            href={tool.href}
                                            className="group rounded-lg border p-3 hover:bg-accent"
                                        >
                                            <div className="font-medium">{tool.name}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {tool.category}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="recent" className="mt-6">
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {recentTools.map((tool, index) => (
                                        <a
                                            key={index}
                                            href={tool.href}
                                            className="group rounded-lg border p-3 hover:bg-accent"
                                        >
                                            <div className="font-medium">{tool.name}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {tool.category}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="developer" className="mt-6">
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {developerTools.map((tool, index) => (
                                        <a
                                            key={index}
                                            href={tool.href}
                                            className="group rounded-lg border p-3 hover:bg-accent"
                                        >
                                            <div className="font-medium">{tool.name}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {tool.category}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                        <div className="mt-8 text-center">
                            <Button asChild variant="outline">
                                <a href="/tools">
                                    View All Tools
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-12 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                Ready to Get Started?
                            </h2>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Explore our collection of tools and boost your productivity today.
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button asChild size="lg">
                                <a href="/tools">Explore Tools</a>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <a href="/feedback">Suggest a Tool</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
