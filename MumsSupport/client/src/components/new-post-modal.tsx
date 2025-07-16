import { useState } from "react";
import { X, Image, Loader2 } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";

type NewPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, imageUrl?: string) => void;
  isPending: boolean;
};

export function NewPostModal({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}: NewPostModalProps) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useAuth();

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content, imageUrl || undefined);
      // Reset form fields after submission
      setContent("");
      setImageUrl("");
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-quicksand">Create a Post</DialogTitle>
          <DialogDescription>
            Share your thoughts, questions, or a moment with the community
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start space-x-3 mt-2">
          <Avatar className="h-10 w-10">
            {user?.avatar ? (
              <AvatarImage src={user.avatar} alt={user.displayName} />
            ) : null}
            <AvatarFallback className="bg-pink-soft text-white">
              {getInitials(user?.displayName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-grow">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[100px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {imageUrl && (
              <div className="mt-3 relative">
                <img
                  src={imageUrl}
                  alt="Post preview"
                  className="rounded-md w-full max-h-[200px] object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => setImageUrl("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            <div className="mt-3">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-500"
                  onClick={() => {
                    // In a real app, this would open an image upload dialog
                    const url = prompt("Enter image URL");
                    if (url) setImageUrl(url);
                  }}
                >
                  <Image className="h-4 w-4 mr-1" />
                  Add Photo
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isPending}
            className="bg-pink-soft hover:bg-pink-600"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
