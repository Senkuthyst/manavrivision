import { motion } from "framer-motion";
import { 
  Gauge, 
  TrendingUp, 
  Shield,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { riskAssessments, getSafetyLevelLabel, type RiskAssessment } from "@/data/safetyData";
import { cn } from "@/lib/utils";

interface RiskAssessmentCardProps {
  destinationId: string;
}

export function RiskAssessmentCard({ destinationId }: RiskAssessmentCardProps) {
  const assessment = riskAssessments.find(a => a.destinationId === destinationId) || riskAssessments[0];

  const getRiskColor = (level: number) => {
    if (level <= 25) return 'bg-success';
    if (level <= 50) return 'bg-secondary';
    if (level <= 75) return 'bg-accent';
    return 'bg-destructive';
  };

  const getOverallIcon = (risk: RiskAssessment['overallRisk']) => {
    switch (risk) {
      case 'peaceful': return CheckCircle2;
      case 'caution': return AlertTriangle;
      case 'high-risk': return Shield;
    }
  };

  const getOverallColor = (risk: RiskAssessment['overallRisk']) => {
    switch (risk) {
      case 'peaceful': return 'text-success bg-success/10';
      case 'caution': return 'text-secondary bg-secondary/10';
      case 'high-risk': return 'text-destructive bg-destructive/10';
    }
  };

  const OverallIcon = getOverallIcon(assessment.overallRisk);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-primary" />
          AI Risk Assessment
          <Badge variant="outline" className="ml-auto text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            Updated hourly
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Risk */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "flex items-center gap-4 p-4 rounded-lg",
            getOverallColor(assessment.overallRisk)
          )}
        >
          <div className="p-3 rounded-full bg-background">
            <OverallIcon className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium opacity-80">Overall Status</p>
            <h3 className="text-2xl font-display font-bold">
              {getSafetyLevelLabel(assessment.overallRisk)}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Confidence</p>
            <p className="text-xl font-bold">{assessment.confidence}%</p>
          </div>
        </motion.div>

        {/* Risk Factors */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Risk Factors Analysis</h4>
          
          {Object.entries(assessment.factors).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm capitalize font-medium">{key}</span>
                <span className="text-xs text-muted-foreground">
                  {value.level <= 25 ? 'Low' : value.level <= 50 ? 'Moderate' : value.level <= 75 ? 'Elevated' : 'High'}
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all", getRiskColor(value.level))}
                  style={{ width: `${value.level}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="p-4 bg-muted/50 rounded-lg border">
          <p className="text-sm font-medium mb-1">📍 AI Recommendation</p>
          <p className="text-sm text-muted-foreground">{assessment.recommendation}</p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center italic">
          Risk assessment is AI-generated based on available data. 
          Always verify with official sources before travel.
        </p>
      </CardContent>
    </Card>
  );
}
