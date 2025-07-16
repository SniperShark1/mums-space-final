import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import { PostWithUser } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

type PostCardProps = {
  post: PostWithUser;
  onLike: () => void;
  onUnlike: () => void;
};

export function PostCard({ post, onLike, onUnlike }: PostCardProps) {
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
    <Card className="bg-white rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Avatar className="h-10 w-10">
            {post.user.avatar ? (
              <AvatarImage src={post.user.avatar} alt={post.user.displayName} />
            ) : null}
            <AvatarFallback className="bg-pink-soft text-white">
              {getInitials(post.user.displayName)}
            </AvatarFallback>
          </Avatar>
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
            <Button variant="ghost" className="text-pink-600 text-sm px-3 py-1 h-auto">
              Share Support
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
