import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { SOSButton } from "@/components/sos-button";
import { SubscriptionBanner } from "@/components/subscription-banner";
import { UserStories } from "@/components/user-stories";
import { DailyQuote } from "@/components/daily-quote";
import { SOSPostCard } from "@/components/sos-post-card";
import { PostCard } from "@/components/post-card";
import { GroupActivityCard } from "@/components/group-activity-card";
import { LocalGroups } from "@/components/local-groups";
import { ThemeDemo } from "@/components/theme-demo";
import { NewPostModal } from "@/components/new-post-modal";
import { SOSPostModal } from "@/components/sos-post-modal";
import { VerificationRequired } from "@/components/verification-required";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";
import { Quote, PostWithUser } from "@shared/schema";

export default function HomePage() {
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [showSubscription, setShowSubscription] = useState(true);

  // Fetch posts
  const { 
    data: posts, 
    isLoading: isLoadingPosts,
    error: postsError
  } = useQuery<PostWithUser[]>({
    queryKey: ["/api/posts"],
  });

  // Fetch daily quote
  const { 
    data: quote, 
    isLoading: isLoadingQuote 
  } = useQuery<Quote>({
    queryKey: ["/api/quote"],
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: { content: string; imageUrl?: string; isSOS: boolean }) => {
      const res = await apiRequest("POST", "/api/posts", postData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
  });

  // Like/unlike post mutations
  const likePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      const res = await apiRequest("POST", `/api/posts/${postId}/like`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
  });

  const unlikePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      const res = await apiRequest("POST", `/api/posts/${postId}/unlike`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
  });

  // Handle post creation
  const handleCreatePost = (content: string, imageUrl?: string, isSOS: boolean = false) => {
    createPostMutation.mutate(
      { content, imageUrl, isSOS },
      {
        onSuccess: () => {
          setShowNewPostModal(false);
          setShowSOSModal(false);
        },
      }
    );
  };

  // Handle post like/unlike
  const handleLikePost = (postId: number, isLiked: boolean) => {
    if (isLiked) {
      unlikePostMutation.mutate(postId);
    } else {
      likePostMutation.mutate(postId);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16 pb-20 app-background">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Theme Demo - always visible */}
          <ThemeDemo />
          
          {/* Daily Quote - always visible */}
          {isLoadingQuote ? (
            <div className="bg-gradient-pink-blue rounded-xl p-4 mb-6 flex items-center justify-center h-24">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          ) : (
            quote && <DailyQuote quote={quote} />
          )}

          {/* Content requiring verification */}
          <VerificationRequired>
            {/* Stories */}
            <UserStories />

            {/* Posts */}
            {isLoadingPosts ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-pink-soft" />
              </div>
            ) : postsError ? (
              <div className="text-center py-8 text-red-500">
                Failed to load posts. Please try again.
              </div>
            ) : (
              <div className="space-y-6">
                {/* SOS Posts */}
                {posts
                  ?.filter(post => post.isSOS)
                  .map(post => (
                    <SOSPostCard
                      key={post.id}
                      post={post}
                      onLike={() => handleLikePost(post.id, false)}
                      onUnlike={() => handleLikePost(post.id, true)}
                    />
                  ))}

                {/* Regular Posts and Group Activities */}
                {posts
                  ?.filter(post => !post.isSOS)
                  .map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={() => handleLikePost(post.id, false)}
                      onUnlike={() => handleLikePost(post.id, true)}
                    />
                  ))}

                {/* Group Activity Sample - would come from backend in a full implementation */}
                <GroupActivityCard 
                  name="New Mums Group" 
                  description="There are 5 new posts in your 'New Mums' group today! Join the conversation about sleep training, first foods, and more." 
                />
              </div>
            )}

            {/* Local Groups */}
            <LocalGroups />
          </VerificationRequired>
        </div>
      </main>

      {/* SOS Button - conditionally render based on verification */}
      <VerificationRequired>
        <SOSButton onClick={() => setShowSOSModal(true)} />
      </VerificationRequired>

      {/* Bottom Navigation - always visible but New Post button should be conditionally disabled */}
      <BottomNavigation onNewPost={() => setShowNewPostModal(true)} />

      {/* Subscription Banner */}
      {showSubscription && (
        <SubscriptionBanner onClose={() => setShowSubscription(false)} />
      )}

      {/* New Post Modal */}
      <NewPostModal 
        isOpen={showNewPostModal} 
        onClose={() => setShowNewPostModal(false)} 
        onSubmit={(content, imageUrl) => handleCreatePost(content, imageUrl)}
        isPending={createPostMutation.isPending}
      />

      {/* SOS Post Modal */}
      <SOSPostModal 
        isOpen={showSOSModal} 
        onClose={() => setShowSOSModal(false)} 
        onSubmit={(content) => handleCreatePost(content, undefined, true)}
        isPending={createPostMutation.isPending}
      />
    </div>
  );
}
