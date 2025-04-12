export const MainFooter = () => {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto py-8 md:py-12">
                <p className="text-center">
                    &copy; {new Date().getFullYear()}{" "}
                    <a
                        target="_blank"
                        href="https://developershihab.com"
                        className="hover:underline hover:underline-offset-2"
                    >
                        Shihab Mahamud
                    </a>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    );
};
