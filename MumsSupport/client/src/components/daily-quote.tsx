import { Sparkles } from "lucide-react";
import { Quote } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";

type DailyQuoteProps = {
  quote: Quote;
};

export function DailyQuote({ quote }: DailyQuoteProps) {
  const { theme } = useTheme();
  
  // Choose background class based on current theme
  let bgClass = "";
  switch(theme) {
    case 'pink':
      bgClass = "bg-gradient-pink-blue";
      break;
    case 'blue':
      bgClass = "bg-gradient-green-blue";
      break;
    case 'green':
      bgClass = "bg-gradient-mint-sky";
      break;
    case 'violet':
      bgClass = "bg-gradient-violet-pink";
      break;
    case 'peach-lavender':
      bgClass = "bg-gradient-peach-lavender";
      break;
    case 'mint-sky':
      bgClass = "bg-gradient-mint-sky";
      break;  
    case 'rainbow-pastel':
      bgClass = "bg-gradient-rainbow-pastel";
      break;
    case 'rainbow-animated':
      bgClass = "bg-gradient-rainbow-animated";
      break;
    default:
      bgClass = "bg-gradient-pink-blue";
  }
  
  return (
    <Card className={`${bgClass} rounded-xl p-4 mb-6 shadow-sm`}>
      <div className="flex items-start space-x-3">
        <div className="text-2xl">✨</div>
        <div>
          <h3 className="font-quicksand text-lg font-semibold text-white">Today's Reminder</h3>
          <p className="text-white font-quicksand text-sm mt-1">
            "{quote.content}"
          </p>
          {quote.author && (
            <p className="text-white text-xs mt-1">
              — {quote.author}
            </p>
          )}
          <p className="text-white text-xs mt-2 italic">Tap to share this quote</p>
        </div>
      </div>
    </Card>
  );
}
