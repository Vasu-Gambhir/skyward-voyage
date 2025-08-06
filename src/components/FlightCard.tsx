import { Clock, MapPin, ArrowRight, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flight } from "@/services/flightApi";

interface FlightCardProps {
  flight: Flight;
  onSelect?: () => void;
}

export const FlightCard = ({ flight, onSelect }: FlightCardProps) => {
  const leg = flight.legs[0];

  if (!leg) return null;

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getStopText = (stopCount: number) => {
    if (stopCount === 0) return "Nonstop";
    if (stopCount === 1) return "1 stop";
    return `${stopCount} stops`;
  };

  return (
    <Card className="p-6 hover:shadow-medium transition-all duration-300 bg-card/95 backdrop-blur-sm border-card-border">
      <div className="flex items-center justify-between">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Airline and Flight Info */}
          <div className="flex items-center gap-3">
            {leg.carriers?.[0]?.logoUrl && (
              <img
                src={leg.carriers[0].logoUrl}
                alt={leg.carriers[0].name}
                className="w-8 h-8 rounded object-contain"
              />
            )}
            <div>
              <div className="font-medium text-sm">
                {leg.carriers?.marketing[0]?.name || "Unknown Airline"}
              </div>
              <div className="text-xs text-muted-foreground">{leg.id}</div>
            </div>
          </div>

          {/* Route and Time */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="font-bold text-lg">
                {formatTime(leg.departure)}
              </div>
              <div className="text-sm text-muted-foreground">
                {leg.origin.displayCode}
              </div>
            </div>

            <div className="flex-1 flex items-center gap-2 min-w-0">
              <div className="flex-1 flex items-center gap-1">
                <Circle className="w-2 h-2 fill-current text-primary" />
                <div className="flex-1 h-px bg-border"></div>
                {leg.stopCount > 0 && (
                  <>
                    <Circle className="w-2 h-2 fill-current text-muted-foreground" />
                    <div className="flex-1 h-px bg-border"></div>
                  </>
                )}
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </div>

            <div className="text-center">
              <div className="font-bold text-lg">{formatTime(leg.arrival)}</div>
              <div className="text-sm text-muted-foreground">
                {leg.destination.displayCode}
              </div>
            </div>
          </div>

          {/* Duration and Stops */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">
                {formatDuration(leg.durationInMinutes)}
              </span>
            </div>
            <Badge
              variant={leg.stopCount === 0 ? "default" : "secondary"}
              className="text-xs"
            >
              {getStopText(leg.stopCount)}
            </Badge>
          </div>

          {/* Price */}
          <div className="text-right md:text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {flight.price.formatted}
            </div>
            <div className="text-sm text-muted-foreground">per person</div>
          </div>
        </div>

        {/* Select Button */}
        <div className="ml-6">
          <Button
            onClick={onSelect}
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
          >
            Select
          </Button>
        </div>
      </div>

      {/* Route Details */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>
              {leg.origin.name} → {leg.destination.name}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
