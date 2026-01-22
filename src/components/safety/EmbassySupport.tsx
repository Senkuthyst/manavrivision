import { motion } from "framer-motion";
import { 
  Building2, 
  Phone, 
  Mail, 
  Globe,
  MapPin,
  ExternalLink,
  Search,
  Shield
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { embassies, type Embassy } from "@/data/safetyData";
import { useState } from "react";

export function EmbassySupport() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmbassies = embassies.filter(embassy =>
    embassy.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Embassy & Consulate Support
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your country's representation in Nepal for assistance during emergencies
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* How Embassies Help */}
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            How Embassies Can Help
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Issue emergency travel documents if passport is lost/stolen</li>
            <li>• Provide lists of local doctors, lawyers, and translators</li>
            <li>• Contact family members in emergencies</li>
            <li>• Assist during natural disasters or civil unrest</li>
            <li>• Register your travel for crisis notifications</li>
          </ul>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Embassy List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {filteredEmbassies.map((embassy, index) => (
            <motion.div
              key={embassy.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {embassy.country === 'United States' ? '🇺🇸' :
                       embassy.country === 'United Kingdom' ? '🇬🇧' :
                       embassy.country === 'Australia' ? '🇦🇺' :
                       embassy.country === 'India' ? '🇮🇳' :
                       embassy.country === 'China' ? '🇨🇳' : '🏛️'}
                    </span>
                    <div>
                      <h4 className="font-medium">{embassy.country}</h4>
                      <p className="text-sm text-muted-foreground">{embassy.name}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{embassy.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <a href={`tel:${embassy.phone}`} className="hover:text-primary">
                        {embassy.phone}
                      </a>
                      {embassy.emergencyLine && (
                        <Badge variant="destructive" className="text-xs ml-2">
                          Emergency
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      <span className="text-sm">{embassy.email}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a href={embassy.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-1" />
                    Website
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Registration Reminder */}
        <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
          <p className="text-sm">
            📋 <strong>Travel Registration:</strong> Register with your embassy before traveling. 
            This helps them contact you during emergencies and provide assistance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
