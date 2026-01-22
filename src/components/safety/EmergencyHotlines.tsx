import { motion } from "framer-motion";
import { 
  Phone, 
  Shield, 
  Ambulance, 
  Flame,
  Mountain,
  Building2,
  UserCheck,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { emergencyContacts, type EmergencyContact } from "@/data/safetyData";

const iconMap: Record<string, React.ElementType> = {
  Shield: Shield,
  UserCheck: UserCheck,
  Ambulance: Ambulance,
  Flame: Flame,
  Mountain: Mountain,
  Hospital: Building2
};

interface EmergencyHotlinesProps {
  compact?: boolean;
}

export function EmergencyHotlines({ compact = false }: EmergencyHotlinesProps) {
  const handleCall = (number: string) => {
    window.open(`tel:${number.replace(/\s/g, '')}`, '_self');
  };

  if (compact) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {emergencyContacts.slice(0, 3).map((contact) => {
          const Icon = iconMap[contact.icon] || Phone;
          return (
            <Button
              key={contact.id}
              variant="outline"
              className="flex items-center gap-2 h-auto py-3"
              onClick={() => handleCall(contact.number)}
            >
              <Icon className="w-4 h-4 text-destructive" />
              <div className="text-left">
                <div className="text-xs font-medium">{contact.name}</div>
                <div className="text-xs text-muted-foreground">{contact.number}</div>
              </div>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-destructive" />
          Emergency Hotlines
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          One-tap access to emergency services in Nepal
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {emergencyContacts.map((contact, index) => {
            const Icon = iconMap[contact.icon] || Phone;
            return (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-between h-auto py-4 px-4 group hover:border-destructive/50"
                  onClick={() => handleCall(contact.number)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-destructive/10 text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {contact.available24h && (
                      <Badge variant="secondary" className="text-xs">
                        24/7
                      </Badge>
                    )}
                    <span className="text-lg font-bold text-destructive">{contact.number}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            💡 <strong>Tip:</strong> Save these numbers offline before your trip. 
            Download our Offline Safety Pack for emergency access without internet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
