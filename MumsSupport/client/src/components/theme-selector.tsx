import React from 'react';
import { Check } from 'lucide-react';
import { useTheme, ThemeOption, themeNames } from '@/hooks/use-theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themeOptions: ThemeOption[] = [
    'pink',
    'blue',
    'green',
    'violet',
    'peach-lavender',
    'mint-sky',
    'rainbow-pastel',
    'rainbow-animated',
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <span className="sr-only">Change theme</span>
          <div className="flex items-center justify-center w-6 h-6 rounded-full overflow-hidden">
            <ThemePreview theme={theme} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themeOptions.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption}
            onClick={() => setTheme(themeOption)}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full overflow-hidden">
                <ThemePreview theme={themeOption} />
              </div>
              <span>{themeNames[themeOption]}</span>
            </div>
            {theme === themeOption && (
              <Check className="h-4 w-4 ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemePreview({ theme }: { theme: ThemeOption }) {
  let previewClass = '';
  
  switch (theme) {
    case 'pink':
      previewClass = 'bg-pink-soft';
      break;
    case 'blue':
      previewClass = 'bg-blue-gentle';
      break;
    case 'green':
      previewClass = 'bg-green-gentle';
      break;
    case 'violet':
      previewClass = 'bg-violet-gentle';
      break;
    case 'peach-lavender':
      previewClass = 'bg-gradient-peach-lavender';
      break;
    case 'mint-sky':
      previewClass = 'bg-gradient-mint-sky';
      break;
    case 'rainbow-pastel':
      previewClass = 'bg-gradient-rainbow-pastel';
      break;
    case 'rainbow-animated':
      previewClass = 'bg-gradient-rainbow-animated';
      break;
    default:
      previewClass = 'bg-pink-soft';
  }

  return <div className={`w-full h-full ${previewClass}`} />;
}