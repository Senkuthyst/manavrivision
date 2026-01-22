import { motion } from "framer-motion";
import { 
  Plane, 
  Car, 
  Bus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  MapPin,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { evacuationRoutes, type EvacuationRoute } from "@/data/safetyData";
import { cn } from "@/lib/utils";

const transportIcons: Record<EvacuationRoute['type'], React.ElementType> = {
  air: Plane,
  road: Car,
  bus: Bus
};

const statusStyles = {
  open: { color: 'text-success', bg: 'bg-success/10', icon: CheckCircle2 },
  limited: { color: 'text-secondary', bg: 'bg-secondary/10', icon: AlertTriangle },
  closed: { color: 'text-destructive', bg: 'bg-destructive/10', icon: XCircle }
};

export function EvacuationPlanning() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Evacuation Planning
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Safe exit routes and transport availability
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            Preparedness Tool
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Important Notice */}
        <div className="p-3 bg-muted/50 rounded-lg border text-sm">
          <p className="text-muted-foreground">
            ℹ️ This information is for <strong>preparedness purposes only</strong>. 
            During actual emergencies, follow official government advisories and embassy guidance.
          </p>
        </div>

        {/* Routes */}
        <div className="space-y-3">
          {evacuationRoutes.map((route, index) => {
            const TransportIcon = transportIcons[route.type];
            const status = statusStyles[route.status];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-2 rounded-full",
                    status.bg
                  )}>
                    <TransportIcon className={cn("w-5 h-5", status.color)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium">{route.name}</h4>
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", status.color)}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {route.from} → {route.to}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {route.estimatedTime}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2">
                      {route.notes}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Airport Status
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Border Crossing Info
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
