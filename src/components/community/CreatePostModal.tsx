import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  Image,
  Video,
  FileText,
  MapPin,
  Tag,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { destinationFilters, tagFilters, getRandomRespectPrompt } from "@/data/communityData";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: {
    caption: string;
    destination: string;
    tags: string[];
    reflection: string;
    mediaType: 'image' | 'video' | 'text';
  }) => void;
  userCompletedQuizzes?: string[];
}

export function CreatePostModal({ isOpen, onClose, onSubmit, userCompletedQuizzes = [] }: CreatePostModalProps) {
  const [step, setStep] = useState<'respect' | 'media' | 'details'>('respect');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'text' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reflection, setReflection] = useState("");
  const [hasAcceptedRespect, setHasAcceptedRespect] = useState(false);
  
  const respectPrompt = getRandomRespectPrompt();
  const hasLearnedDestination = userCompletedQuizzes.includes(destination);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = () => {
    if (!caption || !destination) return;
    
    onSubmit({
      caption,
      destination,
      tags: selectedTags,
      reflection,
      mediaType: mediaType || 'text',
    });
    
    // Reset form
    setStep('respect');
    setMediaType(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setCaption("");
    setDestination("");
    setSelectedTags([]);
    setReflection("");
    setHasAcceptedRespect(false);
    onClose();
  };

  const handleClose = () => {
    setStep('respect');
    setHasAcceptedRespect(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary" />
            Share Your Journey
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Step 1: Cultural Respect Prompt */}
          {step === 'respect' && (
            <motion.div
              key="respect"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="bg-warning/10 border border-warning/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">A Gentle Reminder</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {respectPrompt}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <h4 className="font-medium text-foreground text-sm">Community Guidelines:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Share authentic experiences that inspire responsible travel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Respect local customs, people, and sacred sites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Get permission before photographing individuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Add a "What I Learned" reflection to educate others</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="accept-respect"
                  checked={hasAcceptedRespect}
                  onChange={(e) => setHasAcceptedRespect(e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="accept-respect" className="text-sm text-muted-foreground">
                  I understand and will share responsibly
                </label>
              </div>

              <Button
                onClick={() => setStep('media')}
                disabled={!hasAcceptedRespect}
                className="w-full"
                variant="gold"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 2: Media Selection */}
          {step === 'media' && (
            <motion.div
              key="media"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                Choose what you'd like to share:
              </p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'image', icon: Image, label: 'Photo' },
                  { type: 'video', icon: Video, label: 'Video' },
                  { type: 'text', icon: FileText, label: 'Story' },
                ].map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => setMediaType(type as 'image' | 'video' | 'text')}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                      mediaType === type
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Icon className={cn(
                      "w-8 h-8",
                      mediaType === type ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-sm font-medium",
                      mediaType === type ? "text-primary" : "text-muted-foreground"
                    )}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              {mediaType && mediaType !== 'text' && (
                <div className="space-y-2">
                  {previewUrl ? (
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full aspect-video object-cover"
                      />
                      <button
                        onClick={() => {
                          setPreviewUrl(null);
                          setSelectedFile(null);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {/* TravelLens Watermark Preview */}
                      <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-primary flex items-center justify-center">
                          <span className="text-[6px] font-bold text-primary-foreground">TL</span>
                        </div>
                        <span className="text-[8px] font-semibold text-foreground">TravelLens</span>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload {mediaType}
                      </span>
                      <input
                        type="file"
                        accept={mediaType === 'image' ? 'image/*' : 'video/*'}
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                  <p className="text-xs text-muted-foreground text-center">
                    📌 Your post will include a TravelLens watermark
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('respect')} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={() => setStep('details')}
                  disabled={!mediaType || (mediaType !== 'text' && !previewUrl)}
                  className="flex-1"
                  variant="gold"
                >
                  Next
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Details */}
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Caption */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Caption *
                </label>
                <Textarea
                  placeholder="Share your story..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Destination *
                </label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinationFilters.filter(d => d.id !== 'all').map(dest => (
                      <SelectItem key={dest.id} value={dest.id}>
                        {dest.icon} {dest.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {destination && hasLearnedDestination && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    You've completed the cultural quiz for this destination!
                  </Badge>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {tagFilters.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => handleTagToggle(tag.id)}
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

              {/* Reflection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-secondary" />
                  What I Learned (Optional)
                </label>
                <Textarea
                  placeholder="Share a cultural insight or learning moment..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  rows={2}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Adding a reflection earns you the "Learned First" badge! 🎓
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('media')} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!caption || !destination}
                  className="flex-1"
                  variant="gold"
                >
                  Share Post
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
