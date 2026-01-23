import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, MapPin, Phone, Wifi, WifiOff, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import type { OfflinePack } from "@/data/responsibleTravelData";

interface OfflineSafetyPackProps {
  packs: OfflinePack[];
}

export function OfflineSafetyPack({ packs }: OfflineSafetyPackProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<string[]>([]);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = (packId: string) => {
    setDownloading(packId);
    setDownloadProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(null);
          setDownloaded((d) => [...d, packId]);
          toast.success("Offline pack downloaded successfully!", {
            description: "Available in your device's downloads folder.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <WifiOff className="w-6 h-6 text-primary" />
            Offline Safety Packs
          </h2>
          <p className="text-muted-foreground mt-1">
            Download essential safety info for low-connectivity areas
          </p>
        </div>
        <Badge variant="secondary" className="hidden sm:flex">
          Premium Feature
        </Badge>
      </div>

      {/* Info Banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Why Download Offline Packs?</h4>
              <p className="text-sm text-muted-foreground">
                Remote areas in Nepal often have limited connectivity. These packs ensure you have
                critical emergency contacts, evacuation routes, and cultural guidelines even without internet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packs.map((pack, index) => {
          const isDownloading = downloading === pack.id;
          const isDownloaded = downloaded.includes(pack.id);

          return (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-soft">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pack.destination}</CardTitle>
                        <CardDescription className="text-xs">
                          Last updated: {new Date(pack.lastUpdated).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {pack.size}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Contents List */}
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Includes:
                    </span>
                    <ul className="grid grid-cols-1 gap-1">
                      {pack.contents.slice(0, 4).map((content, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <FileText className="w-3 h-3 text-muted-foreground" />
                          {content}
                        </li>
                      ))}
                      {pack.contents.length > 4 && (
                        <li className="text-xs text-muted-foreground pl-5">
                          +{pack.contents.length - 4} more items
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Download Progress */}
                  {isDownloading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Downloading...</span>
                        <span>{downloadProgress}%</span>
                      </div>
                      <Progress value={downloadProgress} className="h-2" />
                    </div>
                  )}

                  {/* Download Button */}
                  <Button
                    onClick={() => handleDownload(pack.id)}
                    disabled={isDownloading || isDownloaded}
                    variant={isDownloaded ? "outline" : "default"}
                    className="w-full"
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Downloaded
                      </>
                    ) : isDownloading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                        />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download Pack
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Wifi className="w-4 h-4" />
        <span>Packs are automatically updated when you're online</span>
      </div>
    </div>
  );
}
