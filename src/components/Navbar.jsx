import { Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                    <Gamepad2 className="w-8 h-8 text-primary" />
                    <span className="text-xl font-bold">ThiGame</span>
                </div>

                {/* Desktop menu */}
                <div className="hidden lg:flex items-center gap-6">
                    <Button 
                        variant="ghost" 
                        className="text-base" 
                        onClick={() => navigate("/games")}>
                            Tous les jeux
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="text-base"
                        onClick={() => navigate('/about')}>
                            À propos
                    </Button>
                    <ThemeToggle />
                </div>

                {/* Mobile */}
                <div className="flex items-center gap-2 lg:hidden">
                    <ThemeToggle />
                    <Button 
                        variant="ghost" 
                        className="p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-background border-b py-4 lg:hidden">
                        <div className="container space-y-4">
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start"
                                onClick={() => {
                                navigate('/games');
                                setIsMenuOpen(false);
                                }}>
                                    Tous les jeux
                            </Button>
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start"
                                onClick={() => {
                                navigate('/about');
                                setIsMenuOpen(false);
                                }}>
                                    À propos
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}