import axios from "axios";

// Types for API responses
export interface Airport {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    subtitle?: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
  };
}

export interface Flight {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: Array<{
    id: string;
    origin: {
      id: string;
      entityId: string;
      name: string;
      displayCode: string;
    };
    destination: {
      id: string;
      entityId: string;
      name: string;
      displayCode: string;
    };
    durationInMinutes: number;
    stopCount: number;
    departure: string; // keep as string if you're not parsing to Date
    arrival: string;
    carriers: {
      marketing: Array<{
        id: number;
        logoUrl: string;
        name: string;
      }>;
    };
  }>;
}

export interface SearchFlightsParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  cabinClass?: "economy" | "premium_economy" | "business" | "first";
  adults?: number;
  sortBy?:
    | "best"
    | "price_high"
    | "price_low"
    | "duration"
    | "outbound_take_off_time"
    | "outbound_landing_time";
  currency?: string;
  market?: string;
  countryCode?: string;
  date?: string;
}

class FlightApiService {
  private readonly baseURL =
    import.meta.env.VITE_BASEURL || "https://sky-scrapper.p.rapidapi.com/api";
  private readonly headers = {
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
  };

  async searchAirports(
    query: string,
    locale: string = "en-US"
  ): Promise<Airport[]> {
    try {
      const response = await axios.get(
        `${this.baseURL}/v1/flights/searchAirport`,
        {
          params: { query, locale },
          headers: this.headers,
        }
      );

      return response.data?.data || [];
    } catch (error) {
      console.error("Error searching airports:", error);
      throw new Error("Failed to search airports");
    }
  }

  async searchFlights(params: SearchFlightsParams): Promise<Flight[]> {
    try {
      const searchParams = {
        originSkyId: params.originSkyId,
        destinationSkyId: params.destinationSkyId,
        originEntityId: params.originEntityId,
        destinationEntityId: params.destinationEntityId,
        cabinClass: params.cabinClass || "economy",
        adults: params.adults || 1,
        sortBy: params.sortBy || "best",
        currency: params.currency || "USD",
        market: params.market || "en-US",
        countryCode: params.countryCode || "US",
        ...(params.date && { date: params.date }),
      };

      const response = await axios.get(
        `${this.baseURL}/v2/flights/searchFlights`,
        {
          params: searchParams,
          headers: this.headers,
        }
      );

      return response.data?.data?.itineraries || [];
    } catch (error) {
      console.error("Error searching flights:", error);
      throw new Error("Failed to search flights");
    }
  }
}

export const flightApi = new FlightApiService();
