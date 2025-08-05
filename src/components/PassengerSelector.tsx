import { useState } from 'react';
import { Users, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface PassengerSelectorProps {
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  onChange: (passengers: { adults: number; children: number; infants: number; }) => void;
}

export const PassengerSelector = ({ passengers, onChange }: PassengerSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updatePassengers = (type: 'adults' | 'children' | 'infants', delta: number) => {
    const newCount = Math.max(0, passengers[type] + delta);
    
    // Ensure at least 1 adult
    if (type === 'adults' && newCount === 0) return;
    
    onChange({
      ...passengers,
      [type]: newCount
    });
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const getPassengerText = () => {
    const parts = [];
    if (passengers.adults > 0) parts.push(`${passengers.adults} adult${passengers.adults > 1 ? 's' : ''}`);
    if (passengers.children > 0) parts.push(`${passengers.children} child${passengers.children > 1 ? 'ren' : ''}`);
    if (passengers.infants > 0) parts.push(`${passengers.infants} infant${passengers.infants > 1 ? 's' : ''}`);
    
    return parts.length > 0 ? parts.join(', ') : '1 adult';
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start bg-input border-input-border hover:bg-secondary"
        >
          <Users className="mr-2 h-4 w-4" />
          <span className="truncate">{getPassengerText()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-popover border-card-border shadow-medium" align="start">
        <div className="space-y-4">
          <div className="space-y-3">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Adults</div>
                <div className="text-sm text-muted-foreground">Age 12+</div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updatePassengers('adults', -1)}
                  disabled={passengers.adults <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{passengers.adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updatePassengers('adults', 1)}
                  disabled={passengers.adults >= 9}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Children</div>
                <div className="text-sm text-muted-foreground">Age 2-11</div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updatePassengers('children', -1)}
                  disabled={passengers.children <= 0}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{passengers.children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updatePassengers('children', 1)}
                  disabled={passengers.children >= 8}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Infants</div>
                <div className="text-sm text-muted-foreground">Under 2</div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updatePassengers('infants', -1)}
                  disabled={passengers.infants <= 0}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{passengers.infants}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updatePassengers('infants', 1)}
                  disabled={passengers.infants >= passengers.adults}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <Button 
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};