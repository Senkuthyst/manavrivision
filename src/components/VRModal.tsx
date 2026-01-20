import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Glasses, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PanoramicViewer, generateHotspots } from "./PanoramicViewer";

interface VRModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationId: string;
  destinationName: string;
  imageUrl: string;
}

export function VRModal({ 
  isOpen, 
  onClose, 
  destinationId, 
  destinationName, 
  imageUrl 
}: VRModalProps) {
  const [showViewer, setShowViewer] = useState(false);
  const hotspots = generateHotspots(destinationId);

  useEffect(() => {
    if (isOpen) {
      // Small delay before showing viewer for smooth transition
      const timer = setTimeout(() => setShowViewer(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowViewer(false);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-card rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Glasses className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-foreground text-lg">
                    {destinationName} - VR Tour
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Drag to look around • Click hotspots for info
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Viewer Container */}
            <div className="relative aspect-video bg-muted">
              {showViewer ? (
                <PanoramicViewer
                  imageUrl={imageUrl}
                  destinationName={destinationName}
                  hotspots={hotspots}
                  onClose={onClose}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">Preparing VR experience...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info Bar */}
            <div className="p-4 bg-muted/50 border-t border-border">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4" />
                  <span>For best experience, use fullscreen mode and a VR headset if available</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <span className="text-muted-foreground">{hotspots.length} Hotspots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">360° View</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}