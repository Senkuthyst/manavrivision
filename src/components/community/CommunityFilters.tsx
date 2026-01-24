import { motion } from "framer-motion";
import { Filter, TrendingUp, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { destinationFilters, tagFilters } from "@/data/communityData";

interface CommunityFiltersProps {
  selectedDestination: string;
  selectedTags: string[];
  sortBy: 'recent' | 'popular' | 'discussed';
  onDestinationChange: (destination: string) => void;
  onTagToggle: (tag: string) => void;
  onSortChange: (sort: 'recent' | 'popular' | 'discussed') => void;
}

export function CommunityFilters({
  selectedDestination,
  selectedTags,
  sortBy,
  onDestinationChange,
  onTagToggle,
  onSortChange,
}: CommunityFiltersProps) {
  const sortOptions = [
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'popular', label: 'Popular', icon: TrendingUp },
    { id: 'discussed', label: 'Most Discussed', icon: MessageSquare },
  ] as const;

  return (
    <div className="space-y-4">
      {/* Destination Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>Feed</span>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-2">
            {destinationFilters.map((dest) => (
              <motion.button
                key={dest.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDestinationChange(dest.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  selectedDestination === dest.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                )}
              >
                <span>{dest.icon}</span>
                <span>{dest.name}</span>
              </motion.button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      </div>

      {/* Tag Filters */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-muted-foreground">Topics</span>
        <div className="flex flex-wrap gap-2">
          {tagFilters.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagToggle(tag.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                selectedTags.includes(tag.id)
                  ? tag.color
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              #{tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Sort:</span>
        <div className="flex gap-1">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.id}
                variant={sortBy === option.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onSortChange(option.id)}
                className="gap-1.5"
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{option.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
