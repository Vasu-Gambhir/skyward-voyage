import { useState } from 'react';
import { Calendar, Search, ArrowRight, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AirportSearch } from './AirportSearch';
import { DatePicker } from './DatePicker';
import { PassengerSelector } from './PassengerSelector';
import { CabinClassSelector } from './CabinClassSelector';

export interface SearchParams {
  origin: {
    skyId: string;
    entityId: string;
    name: string;
    code: string;
  } | null;
  destination: {
    skyId: string;
    entityId: string;
    name: string;
    code: string;
  } | null;
  departureDate: Date | null;
  returnDate?: Date | null;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
  tripType: 'roundtrip' | 'oneway' | 'multicity';
}

interface FlightSearchProps {
  onSearch: (params: SearchParams) => void;
  isLoading?: boolean;
}

export const FlightSearch = ({ onSearch, isLoading = false }: FlightSearchProps) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    origin: null,
    destination: null,
    departureDate: null,
    returnDate: null,
    passengers: { adults: 1, children: 0, infants: 0 },
    cabinClass: 'economy',
    tripType: 'roundtrip'
  });

  const handleSearch = () => {
    if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
      return;
    }
    onSearch(searchParams);
  };

  const swapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const totalPassengers = searchParams.passengers.adults + searchParams.passengers.children + searchParams.passengers.infants;

  return (
    <Card className="p-6 bg-card/95 backdrop-blur-sm border-card-border shadow-soft">
      <div className="space-y-6">
        {/* Trip Type Selector */}
        <div className="flex gap-2">
          {(['roundtrip', 'oneway', 'multicity'] as const).map((type) => (
            <Button
              key={type}
              variant={searchParams.tripType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSearchParams(prev => ({ ...prev, tripType: type }))}
              className="capitalize"
            >
              {type === 'roundtrip' ? 'Round trip' : type === 'oneway' ? 'One way' : 'Multi-city'}
            </Button>
          ))}
        </div>

        {/* Location and Date Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin */}
          <div className="relative">
            <label className="block text-sm font-medium text-foreground mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              From
            </label>
            <AirportSearch
              placeholder="Origin"
              value={searchParams.origin}
              onChange={(airport) => setSearchParams(prev => ({ ...prev, origin: airport }))}
            />
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="block text-sm font-medium text-foreground mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              To
            </label>
            <div className="flex items-center gap-2">
              <AirportSearch
                placeholder="Destination"
                value={searchParams.destination}
                onChange={(airport) => setSearchParams(prev => ({ ...prev, destination: airport }))}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={swapLocations}
                className="shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Departure
            </label>
            <DatePicker
              date={searchParams.departureDate}
              onSelect={(date) => setSearchParams(prev => ({ ...prev, departureDate: date }))}
              placeholder="Select date"
            />
          </div>

          {/* Return Date */}
          {searchParams.tripType === 'roundtrip' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Return
              </label>
              <DatePicker
                date={searchParams.returnDate}
                onSelect={(date) => setSearchParams(prev => ({ ...prev, returnDate: date }))}
                placeholder="Select date"
                disabled={(date) => searchParams.departureDate ? date < searchParams.departureDate : false}
              />
            </div>
          )}
        </div>

        {/* Passengers and Class */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Passengers
            </label>
            <PassengerSelector
              passengers={searchParams.passengers}
              onChange={(passengers) => setSearchParams(prev => ({ ...prev, passengers }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Class
            </label>
            <CabinClassSelector
              value={searchParams.cabinClass}
              onChange={(cabinClass) => setSearchParams(prev => ({ ...prev, cabinClass }))}
            />
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              disabled={!searchParams.origin || !searchParams.destination || !searchParams.departureDate || isLoading}
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
            >
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? 'Searching...' : 'Search Flights'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};