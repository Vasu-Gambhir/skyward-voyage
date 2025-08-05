import { useState } from 'react';
import { Clock, Users, ArrowRight, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flight } from '@/services/flightApi';
import { FlightCard } from './FlightCard';
import { FlightFilters } from './FlightFilters';
import { FlightSort } from './FlightSort';

interface FlightResultsProps {
  flights: Flight[];
  isLoading?: boolean;
  onFlightSelect?: (flight: Flight) => void;
}

export const FlightResults = ({ flights, isLoading = false, onFlightSelect }: FlightResultsProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure' | 'arrival'>('price');
  const [filters, setFilters] = useState({
    priceRange: [0, 2000] as [number, number],
    stops: [] as string[],
    airlines: [] as string[],
    departureTime: [] as string[],
    duration: [0, 24] as [number, number]
  });

  const filteredAndSortedFlights = flights
    .filter(flight => {
      // Price filter
      if (flight.price.raw < filters.priceRange[0] || flight.price.raw > filters.priceRange[1]) {
        return false;
      }

      // Stops filter
      if (filters.stops.length > 0) {
        const stopCount = flight.legs[0]?.stopCount || 0;
        const stopType = stopCount === 0 ? 'nonstop' : stopCount === 1 ? '1-stop' : '2plus-stops';
        if (!filters.stops.includes(stopType)) {
          return false;
        }
      }

      // Airlines filter
      if (filters.airlines.length > 0) {
        const flightAirlines = flight.legs.flatMap(leg => leg.carriers?.map(c => c.name) || []);
        if (!flightAirlines.some(airline => filters.airlines.includes(airline))) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price.raw - b.price.raw;
        case 'duration':
          return (a.legs[0]?.durationInMinutes || 0) - (b.legs[0]?.durationInMinutes || 0);
        case 'departure':
          return new Date(a.legs[0]?.departure || 0).getTime() - new Date(b.legs[0]?.departure || 0).getTime();
        case 'arrival':
          return new Date(a.legs[0]?.arrival || 0).getTime() - new Date(b.legs[0]?.arrival || 0).getTime();
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium">Searching for flights...</p>
          <p className="text-muted-foreground">Finding the best deals for you</p>
        </div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <Card className="p-12 text-center bg-card/95 backdrop-blur-sm">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No flights found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or selecting different dates.
          </p>
          <Button variant="outline">Modify Search</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <Card className="p-4 bg-card/95 backdrop-blur-sm border-card-border">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {filteredAndSortedFlights.length} flight{filteredAndSortedFlights.length !== 1 ? 's' : ''} found
            </h2>
            <p className="text-muted-foreground">
              Showing results for your search
            </p>
          </div>

          <div className="flex items-center gap-2">
            <FlightSort value={sortBy} onChange={setSortBy} />
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {(filters.stops.length > 0 || filters.airlines.length > 0) && (
                <Badge variant="secondary" className="ml-1">
                  {filters.stops.length + filters.airlines.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="lg:col-span-1">
            <FlightFilters
              filters={filters}
              onChange={setFilters}
              flights={flights}
            />
          </div>
        )}

        {/* Flight Results */}
        <div className={`space-y-4 ${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          {filteredAndSortedFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onSelect={() => onFlightSelect?.(flight)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};