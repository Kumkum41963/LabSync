import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const { currentUser } = useAuth();
  // Simplified theme toggle logic
  const [isDark, setIsDark] = React.useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-[70px] border-b border-border bg-card/50 backdrop-blur-md px-6 flex items-center justify-end sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full text-muted-foreground">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <div className="h-6 w-[1px] bg-border mx-2" />

        {currentUser ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-none">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{currentUser.role.replace('_', ' ')}</p>
            </div>
            <Avatar className="h-9 w-9 border border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary">
                {currentUser.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Button size="sm">Sign In</Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;