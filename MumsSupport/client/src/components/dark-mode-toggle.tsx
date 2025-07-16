import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark-mode';
  
  const toggleDarkMode = () => {
    // Toggle between dark mode and the previous theme, or default to pink
    if (isDarkMode) {
      // Return to previous theme if stored, otherwise default to pink
      const previousTheme = localStorage.getItem('previous-theme') || 'pink';
      setTheme(previousTheme as any);
    } else {
      // Store current theme before switching to dark mode
      localStorage.setItem('previous-theme', theme);
      setTheme('dark-mode');
    }
  };
  
  return (
    <Card className="shadow-sm border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-orange-400" />
            <Switch 
              id="dark-mode" 
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
            />
            <Moon className="h-4 w-4 text-indigo-500" />
          </div>
          <Label htmlFor="dark-mode" className="text-sm font-medium cursor-pointer">
            {isDarkMode ? 'Night Mode' : 'Day Mode'}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}

// For quick access on mobile (fixed position button)
export function DarkModeFloatingButton() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark-mode';
  
  const toggleDarkMode = () => {
    if (isDarkMode) {
      const previousTheme = localStorage.getItem('previous-theme') || 'pink';
      setTheme(previousTheme as any);
    } else {
      localStorage.setItem('previous-theme', theme);
      setTheme('dark-mode');
    }
  };
  
  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-20 right-4 rounded-full shadow-md z-50 bg-card"
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-slate-400" />
      )}
    </Button>
  );
}