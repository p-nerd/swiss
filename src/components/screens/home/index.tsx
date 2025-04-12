import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ArrowRightIcon, KeyIcon } from "lucide-react";

import { LogoIcon } from "@/components/icons/logo-icon";
import { Button } from "@/components/ui/button";

const tools = [
    {
        icon: <KeyIcon className="h-8 w-8 text-red-500" />,
        title: "Password Generator",
        desc: "Generate strong, secure passwords with customizable length, character types, and advanced options.",
        href: "/password-generator"
    }
];

export const Home = () => {
    return (
        <div className="flex flex-col items-center">
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
                            <a href={tool.href} key={index}>
                                <Card className="flex flex-col">
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            {tool.icon}
                                            <CardTitle>{tool.title}</CardTitle>
                                        </div>
                                        <CardDescription>{tool.desc}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
