import { useTheme, ThemeOption, themeNames } from '@/hooks/use-theme';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

export function ThemeDemo() {
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
    <Card className="mb-6 border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Palette className="h-5 w-5 mr-2 text-pink-600" />
          Personalize Your Experience
        </CardTitle>
        <CardDescription>
          Choose your favorite theme to customize your Mum's Space
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {themeOptions.map((themeOption) => {
            // Create theme preview class
            let previewClass = '';
            switch (themeOption) {
              case 'pink': previewClass = 'bg-pink-soft'; break;
              case 'blue': previewClass = 'bg-blue-gentle'; break;
              case 'green': previewClass = 'bg-green-gentle'; break;
              case 'violet': previewClass = 'bg-violet-gentle'; break;
              case 'peach-lavender': previewClass = 'bg-gradient-peach-lavender'; break;
              case 'mint-sky': previewClass = 'bg-gradient-mint-sky'; break;
              case 'rainbow-pastel': previewClass = 'bg-gradient-rainbow-pastel'; break;
              case 'rainbow-animated': previewClass = 'bg-gradient-rainbow-animated'; break;
              default: previewClass = 'bg-pink-soft';
            }
            
            return (
              <div 
                key={themeOption} 
                onClick={() => setTheme(themeOption)}
                className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                  theme === themeOption 
                    ? 'border-pink-600 shadow-md' 
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className={`h-12 w-full rounded-md mb-2 ${previewClass}`}></div>
                <p className="text-sm font-medium text-center">
                  {themeNames[themeOption]}
                  {theme === themeOption && (
                    <span className="block text-xs text-pink-600 font-normal">Current</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-4 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 app-background">
          <p className="text-center font-medium">
            Currently using: <span className="font-bold">{themeNames[theme]}</span> theme
          </p>
        </div>
      </CardContent>
    </Card>
  );
}