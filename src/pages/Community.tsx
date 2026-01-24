import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Plus,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIGuide } from "@/components/AIGuide";
import { Button } from "@/components/ui/button";
import { CommunityPost } from "@/components/community/CommunityPost";
import { CommunityFilters } from "@/components/community/CommunityFilters";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import { CreatePostModal } from "@/components/community/CreatePostModal";
import { mockCommunityPosts, CommunityPost as PostType } from "@/data/communityData";
import { toast } from "@/hooks/use-toast";

export default function Community() {
  const [posts, setPosts] = useState<PostType[]>(mockCommunityPosts);
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'discussed'>('recent');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Mock user data - would come from auth in production
  const userCompletedQuizzes = ['kathmandu', 'pokhara', 'lumbini'];

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];
    
    // Filter by destination
    if (selectedDestination !== 'all') {
      result = result.filter(post => post.destinationId === selectedDestination);
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag as any))
      );
    }
    
    // Filter out hidden/reported posts
    result = result.filter(post => !post.isHidden && !post.isReported);
    
    // Sort
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.likes - a.likes);
        break;
      case 'discussed':
        result.sort((a, b) => b.comments.length - a.comments.length);
        break;
      case 'recent':
      default:
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    
    return result;
  }, [posts, selectedDestination, selectedTags, sortBy]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
    const post = posts.find(p => p.id === postId);
    toast({
      title: post?.isSaved ? "Removed from saved" : "Saved to collection",
      description: post?.isSaved ? "Post removed from your saved items" : "You can find this post in your saved items",
    });
  };

  const handleReport = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isReported: true }
        : post
    ));
    toast({
      title: "Post reported",
      description: "Thank you for helping keep our community respectful. We'll review this post.",
    });
  };

  const handleShare = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setPosts(posts.map(p => 
        p.id === postId 
          ? { ...p, shares: p.shares + 1 }
          : p
      ));
      // In production, this would open a share dialog
      navigator.clipboard.writeText(`https://travellens.app/community/post/${postId}`);
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard (includes TravelLens watermark)",
      });
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleCreatePost = (newPost: {
    caption: string;
    destination: string;
    tags: string[];
    reflection: string;
    mediaType: 'image' | 'video' | 'text';
  }) => {
    const post: PostType = {
      id: `post-${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: 'YU',
        isCulturallyVerified: userCompletedQuizzes.includes(newPost.destination),
        completedQuizzes: userCompletedQuizzes,
        totalPosts: 1,
      },
      destination: newPost.destination,
      destinationId: newPost.destination,
      tags: newPost.tags as any[],
      media: {
        type: newPost.mediaType,
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80', // Placeholder
      },
      caption: newPost.caption,
      reflection: newPost.reflection || undefined,
      likes: 0,
      comments: [],
      shares: 0,
      isLiked: false,
      isSaved: false,
      createdAt: new Date(),
      hasLearnedBeforePosting: !!newPost.reflection,
      isReported: false,
      isHidden: false,
    };
    
    setPosts([post, ...posts]);
    toast({
      title: "Post shared! 🎉",
      description: "Your experience is now visible to the TravelLens community",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Header */}
      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Cultural Community</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Share. Learn. <span className="text-secondary">Inspire.</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              A space for respectful cultural exchange. Share authentic experiences, 
              learn from fellow travelers, and celebrate Nepal's heritage together.
            </p>
            <Button 
              variant="gold" 
              size="lg" 
              onClick={() => setIsCreateModalOpen(true)}
              className="gap-2"
            >
              <Plus className="w-5 h-5" />
              Share Your Journey
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-8 space-y-6">
              {/* Filters */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-4 shadow-soft border border-border/50"
              >
                <CommunityFilters
                  selectedDestination={selectedDestination}
                  selectedTags={selectedTags}
                  sortBy={sortBy}
                  onDestinationChange={setSelectedDestination}
                  onTagToggle={handleTagToggle}
                  onSortChange={setSortBy}
                />
              </motion.div>

              {/* Posts */}
              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CommunityPost
                        post={post}
                        onLike={handleLike}
                        onSave={handleSave}
                        onReport={handleReport}
                        onShare={handleShare}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-card rounded-2xl shadow-soft border border-border/50"
                  >
                    <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No posts found</h3>
                    <p className="text-muted-foreground mb-4">
                      Be the first to share an experience from this destination!
                    </p>
                    <Button variant="gold" onClick={() => setIsCreateModalOpen(true)}>
                      Create First Post
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <CommunitySidebar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
        userCompletedQuizzes={userCompletedQuizzes}
      />

      <Footer />
      <AIGuide />
    </div>
  );
}
