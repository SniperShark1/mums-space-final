import { useState } from "react";
import { Heart, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { PostWithUser } from "@shared/schema";

type SOSPostCardProps = {
  post: PostWithUser;
  onLike: () => void;
  onUnlike: () => void;
};

export function SOSPostCard({ post, onLike, onUnlike }: SOSPostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  const handleLikeClick = () => {
    if (isLiked) {
      setIsLiked(false);
      onUnlike();
    } else {
      setIsLiked(true);
      onLike();
    }
  };
  
  const timeAgo = post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : '';
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="bg-white rounded-xl p-4 mb-6 border-2 border-status-sos shadow-md animate-pulse-slow">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="bg-status-sos text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
            SOS
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-quicksand font-semibold">{post.user.displayName}</span>
            {post.user.memberType && (
              <Badge variant="secondary" className="bg-blue-gentle text-blue-800 text-xs">
                {post.user.memberType}
              </Badge>
            )}
            <span className="text-gray-400 text-xs">{timeAgo}</span>
          </div>
          <div className="font-opensans text-gray-700 text-base">
            <p>{post.content}</p>
          </div>
          {post.imageUrl && (
            <div className="mt-3 mb-3">
              <img 
                src={post.imageUrl} 
                alt="Post image" 
                className="rounded-lg w-full h-auto" 
              />
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex space-x-4">
              <button 
                className={`flex items-center space-x-1 ${isLiked ? 'text-pink-600' : 'text-gray-500'}`}
                onClick={handleLikeClick}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500">
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm">{post.commentsCount}</span>
              </button>
            </div>
            <Button className="bg-pink-soft hover:bg-pink-600 text-white px-4 py-1 rounded-full text-sm transition-colors">
              Support Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
