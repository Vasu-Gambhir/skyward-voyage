import { SortAsc, DollarSign, Clock, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

interface FlightSortProps {
  value: 'price' | 'duration' | 'departure' | 'arrival';
  onChange: (value: 'price' | 'duration' | 'departure' | 'arrival') => void;
}

const sortOptions = [
  {
    value: 'price' as const,
    label: 'Price',
    description: 'Lowest to highest',
    icon: DollarSign
  },
  {
    value: 'duration' as const,
    label: 'Duration',
    description: 'Shortest to longest',
    icon: Clock
  },
  {
    value: 'departure' as const,
    label: 'Departure',
    description: 'Earliest to latest',
    icon: Plane
  },
  {
    value: 'arrival' as const,
    label: 'Arrival',
    description: 'Earliest to latest',
    icon: Plane
  }
];

export const FlightSort = ({ value, onChange }: FlightSortProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedSort = sortOptions.find(option => option.value === value);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SortAsc className="w-4 h-4" />
          Sort: {selectedSort?.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-popover border-card-border shadow-medium" align="end">
        <div className="space-y-1">
          <div className="text-sm font-medium mb-2">Sort by</div>
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.value}
                variant={value === option.value ? "default" : "ghost"}
                className="w-full justify-start h-auto p-3 text-left"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};