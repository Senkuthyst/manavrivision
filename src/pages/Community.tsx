import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Camera, 
  Heart, 
  MessageCircle,
  MapPin,
  Star,
  Upload,
  TrendingUp,
  Award
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIGuide } from "@/components/AIGuide";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const communityPosts = [
  {
    id: 1,
    author: "Sarah Mitchell",
    avatar: "SM",
    location: "Poon Hill",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600",
    caption: "Sunrise at Poon Hill - woke up at 4am and it was absolutely worth it! The view of Annapurna South and Machapuchare is unforgettable. 🏔️",
    likes: 234,
    comments: 18,
    isLiked: false,
  },
  {
    id: 2,
    author: "Raj Sharma",
    avatar: "RS",
    location: "Bhaktapur",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=600",
    caption: "Found this hidden pottery workshop in Bhaktapur. The artisan has been making traditional clay pots for 40 years! 🏺",
    likes: 189,
    comments: 24,
    isLiked: true,
  },
  {
    id: 3,
    author: "Emma Chen",
    avatar: "EC",
    location: "Thamel, Kathmandu",
    image: "https://images.unsplash.com/photo-1582654291742-cf06c8b3e08a?w=600",
    caption: "Best momos in Kathmandu! This little place in Thamel serves the most authentic buffalo momos. Ask for extra chutney! 🥟",
    likes: 312,
    comments: 45,
    isLiked: false,
  },
];

const hiddenGems = [
  { name: "Rara Lake", location: "Mugu District", rating: 4.9, votes: 128 },
  { name: "Tilicho Lake", location: "Manang District", rating: 4.8, votes: 95 },
  { name: "Gokyo Lakes", location: "Solukhumbu", rating: 4.9, votes: 156 },
  { name: "Siddha Cave", location: "Bandipur", rating: 4.7, votes: 67 },
];

const topContributors = [
  { name: "Priya Thapa", posts: 47, avatar: "PT" },
  { name: "John Walker", posts: 38, avatar: "JW" },
  { name: "Maya Gurung", posts: 35, avatar: "MG" },
];

export default function Community() {
  const [posts, setPosts] = useState(communityPosts);

  const toggleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Travel Community</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Share Your Journey
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Connect with fellow travelers, share hidden gems, and inspire responsible tourism
            </p>
            <Button variant="gold" size="lg">
              <Upload className="w-5 h-5" />
              Share Your Experience
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Posts Feed */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Recent Discoveries
              </h2>
              
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl shadow-soft overflow-hidden"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                      {post.avatar}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{post.author}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {post.location}
                      </div>
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="aspect-[4/3] relative">
                    <img
                      src={post.image}
                      alt={post.location}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Post Actions */}
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={cn(
                          "flex items-center gap-1.5 transition-colors",
                          post.isLiked ? "text-destructive" : "text-muted-foreground hover:text-destructive"
                        )}
                      >
                        <Heart className={cn("w-5 h-5", post.isLiked && "fill-current")} />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                    </div>
                    <p className="text-foreground">
                      <span className="font-medium">{post.author}</span>{" "}
                      <span className="text-muted-foreground">{post.caption}</span>
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Hidden Gems */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 shadow-soft"
              >
                <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-secondary" />
                  Community Hidden Gems
                </h3>
                <div className="space-y-4">
                  {hiddenGems.map((gem, index) => (
                    <div key={gem.name} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{gem.name}</h4>
                        <p className="text-xs text-muted-foreground">{gem.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-secondary">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-medium">{gem.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{gem.votes} votes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Top Contributors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 shadow-soft"
              >
                <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Top Contributors
                </h3>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                        index === 0 
                          ? "bg-secondary text-secondary-foreground" 
                          : "bg-muted text-foreground"
                      )}>
                        {contributor.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{contributor.name}</h4>
                        <p className="text-xs text-muted-foreground">{contributor.posts} posts</p>
                      </div>
                      {index === 0 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                          #1
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Responsible Tourism */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-success/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-display font-bold text-success mb-2">
                  🌿 Responsible Tourism
                </h3>
                <p className="text-sm text-success/80">
                  Help preserve Nepal's natural beauty. Share tips on eco-friendly travel, 
                  support local communities, and leave no trace behind.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIGuide />
    </div>
  );
}
