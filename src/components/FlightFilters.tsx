import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Flight } from "@/services/flightApi";

interface FlightFiltersProps {
  filters: {
    priceRange: [number, number];
    stops: string[];
    airlines: string[];
    departureTime: string[];
    duration: [number, number];
  };
  onChange: (filters: any) => void;
  flights: Flight[];
}

export const FlightFilters = ({
  filters,
  onChange,
  flights,
}: FlightFiltersProps) => {
  // Extract unique airlines from flights
  const airlines = Array.from(
    new Set(
      flights.flatMap((flight) =>
        flight.legs.flatMap((leg) => leg.carriers?.map((c) => c.name) || [])
      )
    )
  ).sort();

  const maxPrice = Math.max(...flights.map((f) => f.price.raw), 2000);

  const stopOptions = [
    {
      value: "nonstop",
      label: "Nonstop",
      count: flights.filter((f) => f.legs[0]?.stopCount === 0).length,
    },
    {
      value: "1-stop",
      label: "1 stop",
      count: flights.filter((f) => f.legs[0]?.stopCount === 1).length,
    },
    {
      value: "2plus-stops",
      label: "2+ stops",
      count: flights.filter((f) => (f.legs[0]?.stopCount || 0) >= 2).length,
    },
  ];

  const timeOptions = [
    {
      value: "early-morning",
      label: "Early morning",
      subtitle: "5:00 AM - 11:59 AM",
    },
    { value: "afternoon", label: "Afternoon", subtitle: "12:00 PM - 5:59 PM" },
    { value: "evening", label: "Evening", subtitle: "6:00 PM - 11:59 PM" },
    { value: "overnight", label: "Overnight", subtitle: "12:00 AM - 4:59 AM" },
  ];

  const updateFilter = (key: string, value: any) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleArrayFilter = (
    key: "stops" | "airlines" | "departureTime",
    value: string
  ) => {
    const currentValues = filters[key];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    updateFilter(key, newValues);
  };

  const clearAllFilters = () => {
    onChange({
      priceRange: [0, maxPrice] as [number, number],
      stops: [],
      airlines: [],
      departureTime: [],
      duration: [0, 24] as [number, number],
    });
  };

  const hasActiveFilters =
    filters.stops.length > 0 ||
    filters.airlines.length > 0 ||
    filters.departureTime.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < maxPrice;

  return (
    <Card className="p-4 bg-card/95 backdrop-blur-sm border-card-border sticky top-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear all
            </Button>
          )}
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <Slider
            min={0}
            max={maxPrice}
            step={50}
            value={filters.priceRange}
            onValueChange={(value) =>
              updateFilter("priceRange", value as [number, number])
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}+</span>
          </div>
        </div>

        {/* Stops */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Stops</Label>
          <div className="space-y-2">
            {stopOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`stop-${option.value}`}
                    checked={filters.stops.includes(option.value)}
                    onCheckedChange={() =>
                      toggleArrayFilter("stops", option.value)
                    }
                  />
                  <Label
                    htmlFor={`stop-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {option.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Airlines */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Airlines</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {airlines.map((airline) => (
              <div key={airline} className="flex items-center space-x-2">
                <Checkbox
                  id={`airline-${airline}`}
                  checked={filters.airlines.includes(airline)}
                  onCheckedChange={() => toggleArrayFilter("airlines", airline)}
                />
                <Label
                  htmlFor={`airline-${airline}`}
                  className="text-sm font-normal cursor-pointer flex-1 truncate"
                  title={airline}
                >
                  {airline}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Departure Time */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Departure Time</Label>
          <div className="space-y-2">
            {timeOptions.map((option) => (
              <div key={option.value} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`time-${option.value}`}
                    checked={filters.departureTime.includes(option.value)}
                    onCheckedChange={() =>
                      toggleArrayFilter("departureTime", option.value)
                    }
                  />
                  <Label
                    htmlFor={`time-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
                <div className="ml-6 text-xs text-muted-foreground">
                  {option.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
