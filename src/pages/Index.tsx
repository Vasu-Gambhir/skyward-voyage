import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FlightSearch, SearchParams } from "@/components/FlightSearch";
import { FlightResults } from "@/components/FlightResults";
import { Flight, flightApi } from "@/services/flightApi";
import { useToast } from "@/hooks/use-toast";
import { demoFlights } from "@/lib/demoFlights";

const Index = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (params: SearchParams) => {
    if (!params.origin || !params.destination || !params.departureDate) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in all required fields to search for flights.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const searchParams = {
        originSkyId: params.origin.skyId,
        destinationSkyId: params.destination.skyId,
        originEntityId: params.origin.entityId,
        destinationEntityId: params.destination.entityId,
        cabinClass: params.cabinClass,
        adults: params.passengers.adults,
        date: params.departureDate.toISOString().split("T")[0],
      };

      const results = await flightApi.searchFlights(searchParams);
      console.log("Resssssssssssssssssssssss", results);
      setFlights(results);

      toast({
        title: "Search Complete",
        description: `Found ${results.length} flights for your search.`,
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Unable to search for flights. Please try again later.",
        variant: "destructive",
      });
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlightSelect = (flight: Flight) => {
    toast({
      title: "Flight Selected",
      description: `Selected flight for ${flight.price.formatted}. Booking functionality coming soon!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Search Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto -mt-16 relative z-20">
            <FlightSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </section>

        {/* Results Section */}
        {hasSearched && (
          <section className="container mx-auto px-4 pb-12">
            <FlightResults
              flights={flights}
              isLoading={isLoading}
              onFlightSelect={handleFlightSelect}
            />
          </section>
        )}

        {/* Welcome Message for First Time Users */}
        {!hasSearched && (
          <section className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold">Welcome to SkyWings</h2>
              <p className="text-lg text-muted-foreground">
                Your premium flight booking experience. Search, compare, and
                book flights from hundreds of airlines worldwide.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="font-semibold">Smart Search</h3>
                  <p className="text-sm text-muted-foreground">
                    Find the best flights with our intelligent search engine
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="font-semibold">Best Prices</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare prices from hundreds of travel sites instantly
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-semibold">Fast Booking</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick and secure booking process in just a few clicks
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
