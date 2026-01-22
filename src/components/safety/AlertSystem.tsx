import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  AlertTriangle, 
  CloudRain, 
  Vote, 
  Car, 
  Heart,
  X,
  ChevronRight,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { safetyAlerts, type SafetyAlert, type AlertType } from "@/data/safetyData";
import { cn } from "@/lib/utils";

const alertIconMap: Record<AlertType, React.ElementType> = {
  political: Vote,
  weather: CloudRain,
  health: Heart,
  transport: Car,
  general: Bell
};

const severityStyles = {
  low: 'bg-muted border-muted-foreground/20',
  medium: 'bg-secondary/10 border-secondary/30',
  high: 'bg-destructive/10 border-destructive/30'
};

interface AlertSystemProps {
  destinationId?: string;
  compact?: boolean;
}

export function AlertSystem({ destinationId, compact = false }: AlertSystemProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const activeAlerts = safetyAlerts.filter(
    alert => alert.isActive && !dismissedAlerts.includes(alert.id)
  );

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
  };

  if (activeAlerts.length === 0) {
    return (
      <Card className="border-success/30 bg-success/5">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-success/20">
              <Bell className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-success">No Active Alerts</p>
              <p className="text-sm text-muted-foreground">
                All systems normal. Safe travels!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className="space-y-2">
        {activeAlerts.slice(0, 2).map((alert) => {
          const Icon = alertIconMap[alert.type];
          return (
            <div
              key={alert.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border",
                severityStyles[alert.severity]
              )}
            >
              <Icon className={cn(
                "w-4 h-4",
                alert.severity === 'high' ? 'text-destructive' : 'text-secondary'
              )} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{alert.title}</p>
              </div>
              <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                {alert.severity}
              </Badge>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-secondary" />
          Active Alerts
          <Badge variant="secondary" className="ml-2">{activeAlerts.length}</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Current advisories affecting your destinations
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <AnimatePresence>
          {activeAlerts.map((alert, index) => {
            const Icon = alertIconMap[alert.type];
            const isExpanded = expandedAlert === alert.id;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "border rounded-lg overflow-hidden",
                  severityStyles[alert.severity]
                )}
              >
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer"
                  onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                >
                  <div className={cn(
                    "p-2 rounded-full",
                    alert.severity === 'high' 
                      ? 'bg-destructive/20 text-destructive' 
                      : 'bg-secondary/20 text-secondary'
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{alert.title}</h4>
                      <Badge 
                        variant={alert.severity === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" />
                      {alert.startDate} {alert.endDate && `- ${alert.endDate}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      isExpanded && "rotate-90"
                    )} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss(alert.id);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-sm text-muted-foreground mb-3">
                        {alert.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-medium">Affected areas:</span>
                        {alert.affectedAreas.map((area, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div className="text-center pt-2">
          <Button variant="ghost" size="sm">
            View All Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
