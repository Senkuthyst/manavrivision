import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  MoreHorizontal,
  Flag,
  EyeOff,
  CheckCircle2,
  Award,
  BookOpen,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CommunityPost as PostType, tagFilters } from "@/data/communityData";
import { formatDistanceToNow } from "date-fns";

interface CommunityPostProps {
  post: PostType;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onReport: (postId: string) => void;
  onShare: (postId: string) => void;
}

export function CommunityPost({ post, onLike, onSave, onReport, onShare }: CommunityPostProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(post.comments);

  const getTagStyle = (tagId: string) => {
    return tagFilters.find(t => t.id === tagId)?.color || 'bg-muted text-muted-foreground';
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: `new-${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: 'YU',
        isCulturallyVerified: false,
      },
      content: newComment,
      likes: 0,
      createdAt: new Date(),
      isLiked: false,
    };
    
    setLocalComments([...localComments, comment]);
    setNewComment("");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-soft overflow-hidden border border-border/50"
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-sm">
              {post.author.avatar}
            </div>
            {post.author.isCulturallyVerified && (
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-success flex items-center justify-center border-2 border-card">
                <CheckCircle2 className="w-3 h-3 text-success-foreground" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground">{post.author.name}</h4>
              {post.author.isCulturallyVerified && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-success/10 text-success border-success/30">
                  Culturally Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{post.destination}</span>
              <span>•</span>
              <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onReport(post.id)} className="text-destructive">
              <Flag className="w-4 h-4 mr-2" />
              Report Post
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EyeOff className="w-4 h-4 mr-2" />
              Hide Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tags */}
      <div className="px-4 pb-2 flex flex-wrap gap-1.5">
        {post.tags.map(tag => (
          <span
            key={tag}
            className={cn(
              "text-[10px] px-2 py-0.5 rounded-full font-medium",
              getTagStyle(tag)
            )}
          >
            #{tag}
          </span>
        ))}
        {post.hasLearnedBeforePosting && (
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            Learned First
          </span>
        )}
      </div>

      {/* Post Image with TravelLens Watermark */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={post.media.url}
          alt={post.destination}
          className="w-full h-full object-cover"
        />
        {/* TravelLens Watermark */}
        <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg">
          <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
            <span className="text-[8px] font-bold text-primary-foreground">TL</span>
          </div>
          <span className="text-[10px] font-semibold text-foreground">TravelLens</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(post.id)}
              className={cn(
                "gap-1.5 px-2",
                post.isLiked && "text-destructive hover:text-destructive"
              )}
            >
              <Heart className={cn("w-5 h-5", post.isLiked && "fill-current")} />
              <span className="font-medium">{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="gap-1.5 px-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{localComments.length}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare(post.id)}
              className="gap-1.5 px-2"
            >
              <Share2 className="w-5 h-5" />
              <span className="font-medium">{post.shares}</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSave(post.id)}
            className={cn("h-8 w-8", post.isSaved && "text-secondary")}
          >
            <Bookmark className={cn("w-5 h-5", post.isSaved && "fill-current")} />
          </Button>
        </div>

        {/* Caption */}
        <p className="text-foreground text-sm leading-relaxed">
          <span className="font-semibold">{post.author.name}</span>{" "}
          {post.caption}
        </p>

        {/* Cultural Reflection */}
        {post.reflection && (
          <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-1.5">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary">What I Learned</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {post.reflection}
            </p>
          </div>
        )}

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 border-t border-border pt-4 space-y-3"
            >
              {localComments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                      {comment.author.avatar}
                    </div>
                    {comment.author.isCulturallyVerified && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success flex items-center justify-center border border-card">
                        <CheckCircle2 className="w-2 h-2 text-success-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium text-foreground">{comment.author.name}</span>{" "}
                      <span className="text-muted-foreground">{comment.content}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{formatDistanceToNow(comment.createdAt, { addSuffix: true })}</span>
                      <button className="hover:text-foreground transition-colors">
                        {comment.likes} likes
                      </button>
                      <button className="hover:text-foreground transition-colors">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add Comment */}
              <div className="flex gap-2 pt-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground flex-shrink-0">
                  YU
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a respectful comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    className="flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="h-9 w-9"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
