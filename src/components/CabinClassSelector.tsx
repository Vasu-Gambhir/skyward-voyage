import { Crown, Armchair, Sofa, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

interface CabinClassSelectorProps {
  value: 'economy' | 'premium_economy' | 'business' | 'first';
  onChange: (value: 'economy' | 'premium_economy' | 'business' | 'first') => void;
}

const cabinClasses = [
  {
    value: 'economy' as const,
    label: 'Economy',
    description: 'Standard comfort and service',
    icon: Plane
  },
  {
    value: 'premium_economy' as const,
    label: 'Premium Economy',
    description: 'Extra space and enhanced service',
    icon: Armchair
  },
  {
    value: 'business' as const,
    label: 'Business',
    description: 'Priority service and luxury',
    icon: Sofa
  },
  {
    value: 'first' as const,
    label: 'First Class',
    description: 'Ultimate luxury experience',
    icon: Crown
  }
];

export const CabinClassSelector = ({ value, onChange }: CabinClassSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedClass = cabinClasses.find(c => c.value === value);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start bg-input border-input-border hover:bg-secondary"
        >
          {selectedClass && (
            <>
              <selectedClass.icon className="mr-2 h-4 w-4" />
              {selectedClass.label}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 bg-popover border-card-border shadow-medium" align="start">
        <div className="space-y-2">
          {cabinClasses.map((cabinClass) => {
            const Icon = cabinClass.icon;
            return (
              <Button
                key={cabinClass.value}
                variant={value === cabinClass.value ? "default" : "ghost"}
                className="w-full justify-start h-auto p-3 text-left"
                onClick={() => {
                  onChange(cabinClass.value);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{cabinClass.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {cabinClass.description}
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