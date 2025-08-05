import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Plane } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { flightApi, Airport } from '@/services/flightApi';
import { cn } from '@/lib/utils';

interface AirportSearchProps {
  placeholder?: string;
  value: {
    skyId: string;
    entityId: string;
    name: string;
    code: string;
  } | null;
  onChange: (airport: { skyId: string; entityId: string; name: string; code: string; } | null) => void;
  className?: string;
}

export const AirportSearch = ({ placeholder = "Search airports", value, onChange, className }: AirportSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const airports = await flightApi.searchAirports(query);
        setResults(airports);
        setIsOpen(true);
      } catch (error) {
        console.error('Error searching airports:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query]);

  const handleSelect = (airport: Airport) => {
    onChange({
      skyId: airport.skyId,
      entityId: airport.entityId,
      name: airport.presentation.title,
      code: airport.navigation.localizedName.split(' ')[0] || airport.skyId
    });
    setQuery('');
    setIsOpen(false);
  };

  const displayValue = value ? `${value.code} - ${value.name}` : '';

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          value={query || displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            if (value && e.target.value !== displayValue) {
              onChange(null);
            }
          }}
          onFocus={() => setQuery('')}
          placeholder={placeholder}
          className="pl-10 bg-input border-input-border focus:border-primary"
        />
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-64 overflow-y-auto bg-popover border-card-border shadow-medium">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              <Plane className="w-4 h-4 animate-pulse mx-auto mb-2" />
              Searching airports...
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((airport) => (
                <Button
                  key={`${airport.skyId}-${airport.entityId}`}
                  variant="ghost"
                  className="w-full justify-start p-3 h-auto text-left hover:bg-secondary"
                  onClick={() => handleSelect(airport)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {airport.presentation.title}
                      </div>
                      {airport.presentation.subtitle && (
                        <div className="text-sm text-muted-foreground truncate">
                          {airport.presentation.subtitle}
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="flex-shrink-0">
                      {airport.navigation.localizedName.split(' ')[0] || airport.skyId}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-muted-foreground">
              No airports found
            </div>
          ) : null}
        </Card>
      )}
    </div>
  );
};