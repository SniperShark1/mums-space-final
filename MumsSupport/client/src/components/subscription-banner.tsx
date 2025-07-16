import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type SubscriptionBannerProps = {
  onClose: () => void;
};

export function SubscriptionBanner({ onClose }: SubscriptionBannerProps) {
  return (
    <div className="fixed bottom-16 inset-x-0 bg-blue-gentle bg-opacity-95 py-3 px-4 shadow-lg z-20">
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-4">
          <p className="font-quicksand text-sm text-blue-800">
            <strong>Mum's Space Premium</strong> - Support our community for just $2/month
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-white text-blue-800 hover:bg-white/90">
            Try Free
          </Button>
          <button className="text-blue-800" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
