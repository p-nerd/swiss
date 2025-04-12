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

import { LogoIcon } from "@/components/icons/logo-icon";
import { Button } from "@/components/ui/button";

const tools = [
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

export const Home = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <a href="/">
                            <LogoIcon />
                        </a>
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
                                <a href="#tools">
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
            <section id="tools" className="w-full py-12 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                Tools
                            </h2>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Discover our most powerful and versatile tools to boost your
                                productivity.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
                        {tools.map((tool, index) => (
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
        </div>
    );
};
