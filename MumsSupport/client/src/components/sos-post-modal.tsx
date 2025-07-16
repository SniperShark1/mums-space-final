import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";

type SOSPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  isPending: boolean;
};

export function SOSPostModal({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}: SOSPostModalProps) {
  const [content, setContent] = useState("");
  const { user } = useAuth();

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      // Reset form after submission
      setContent("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-quicksand text-center text-xl">
            <span className="text-status-sos">SOS</span> - Need Urgent Support
          </DialogTitle>
          <DialogDescription className="text-center">
            Your SOS post will be highlighted and prioritized in the community feed
          </DialogDescription>
        </DialogHeader>

        <Alert className="bg-pink-lighter border-pink-soft">
          <AlertDescription>
            SOS posts are for when you need immediate emotional support or advice from the community. Other mums will be notified about your request.
          </AlertDescription>
        </Alert>

        <div className="mt-4">
          <Textarea
            placeholder="What's going on? Share what you're struggling with and the kind of support you need..."
            className="min-h-[120px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isPending}
            className="bg-status-sos hover:bg-red-500 text-white w-full sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending SOS...
              </>
            ) : (
              "Post SOS Request"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
