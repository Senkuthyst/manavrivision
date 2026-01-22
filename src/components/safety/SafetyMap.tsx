import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  ZoomIn,
  ZoomOut,
  Layers
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  safetyZones, 
  getSafetyLevelColor, 
  getSafetyLevelLabel,
  type SafetyZone 
} from "@/data/safetyData";
import { cn } from "@/lib/utils";

interface SafetyMapProps {
  onZoneSelect?: (zone: SafetyZone) => void;
  selectedZoneId?: string;
}

export function SafetyMap({ onZoneSelect, selectedZoneId }: SafetyMapProps) {
  const [zoom, setZoom] = useState(1);
  const [showLegend, setShowLegend] = useState(true);

  const getLevelIcon = (level: SafetyZone['level']) => {
    switch (level) {
      case 'peaceful': return CheckCircle2;
      case 'caution': return AlertTriangle;
      case 'high-risk': return Shield;
    }
  };

  const getLevelStyles = (level: SafetyZone['level']) => {
    switch (level) {
      case 'peaceful': return 'bg-success/20 border-success text-success hover:bg-success/30';
      case 'caution': return 'bg-secondary/20 border-secondary text-secondary hover:bg-secondary/30';
      case 'high-risk': return 'bg-destructive/20 border-destructive text-destructive hover:bg-destructive/30';
    }
  };

  // Calculate relative positions for a stylized map
  const getZonePosition = (zone: SafetyZone) => {
    const bounds = { minLat: 27.0, maxLat: 29.0, minLng: 83.0, maxLng: 87.0 };
    const x = ((zone.coordinates.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    const y = 100 - ((zone.coordinates.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(10, Math.min(90, y)) };
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Live Safety Map
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setZoom(Math.min(2, zoom + 0.25))}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowLegend(!showLegend)}
            >
              <Layers className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Real-time safety conditions across Nepal destinations
        </p>
      </CardHeader>
      <CardContent>
        <div 
          className="relative bg-gradient-to-b from-muted/50 to-muted rounded-lg overflow-hidden"
          style={{ height: '400px', transform: `scale(${zoom})`, transformOrigin: 'center' }}
        >
          {/* Stylized Nepal map background */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M10,50 Q20,30 40,25 Q60,20 80,35 Q90,45 85,60 Q75,75 55,80 Q35,85 20,70 Q10,60 10,50"
                fill="currentColor"
                className="text-primary"
              />
            </svg>
          </div>

          {/* Safety zones */}
          {safetyZones.map((zone) => {
            const pos = getZonePosition(zone);
            const Icon = getLevelIcon(zone.level);
            const isSelected = selectedZoneId === zone.id;

            return (
              <motion.button
                key={zone.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border-2 transition-all cursor-pointer",
                  getLevelStyles(zone.level),
                  isSelected && "ring-2 ring-ring ring-offset-2"
                )}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => onZoneSelect?.(zone)}
              >
                <Icon className="w-5 h-5" />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap bg-background/80 px-1 rounded">
                  {zone.name.split(' ')[0]}
                </span>
              </motion.button>
            );
          })}

          {/* Legend */}
          {showLegend && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 border shadow-lg"
            >
              <p className="text-xs font-medium mb-2 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Safety Zones
              </p>
              <div className="space-y-1.5">
                {(['peaceful', 'caution', 'high-risk'] as const).map((level) => {
                  const Icon = getLevelIcon(level);
                  return (
                    <div key={level} className="flex items-center gap-2 text-xs">
                      <Icon className={cn("w-3 h-3", `text-${getSafetyLevelColor(level)}`)} />
                      <span>{getSafetyLevelLabel(level)}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Last updated */}
          <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
            Updated: Just now
          </div>
        </div>

        {/* Selected zone details */}
        {selectedZoneId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-muted/50 rounded-lg"
          >
            {(() => {
              const zone = safetyZones.find(z => z.id === selectedZoneId);
              if (!zone) return null;
              return (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{zone.name}</h4>
                    <Badge variant={zone.level === 'peaceful' ? 'default' : zone.level === 'caution' ? 'secondary' : 'destructive'}>
                      {getSafetyLevelLabel(zone.level)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{zone.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {zone.factors.map((factor, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
