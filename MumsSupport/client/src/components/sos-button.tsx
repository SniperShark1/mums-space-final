import { Button } from "@/components/ui/button";

type SOSButtonProps = {
  onClick?: () => void;
};

export function SOSButton({ onClick }: SOSButtonProps) {
  return (
    <div className="fixed z-40 bottom-20 right-4 md:right-8">
      <Button 
        onClick={onClick}
        className="bg-status-sos hover:bg-red-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors animate-pulse-slow"
      >
        <span className="font-bold">SOS</span>
      </Button>
    </div>
  );
}
