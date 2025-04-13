export const LogoIcon = ({ className }: { className?: string }) => {
    return (
        <div className="flex items-center">
            <div className="relative h-10 w-10 overflow-hidden rounded bg-primary">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-4xl">
                    S
                </div>
            </div>
            <span className="font-bold text-4xl inline-block">wiss</span>
        </div>
    );
};
