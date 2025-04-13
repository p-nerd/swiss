import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronLeft } from "lucide-react";

export const BackButton = () => {
    return (
        <div className="fixed top-4 left-4 z-50">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <a
                            href="/"
                            className={cn(
                                buttonVariants({ variant: "outline", size: "icon" }),
                                "h-10 w-10 rounded-full"
                            )}
                            aria-label="Go back"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </a>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Go back</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};
