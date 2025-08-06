import { Flight } from "@/services/flightApi";

export const demoFlights: Flight[] = [
  {
    id: "1",
    price: {
      raw: 199.99,
      formatted: "$199.99",
    },
    legs: [
      {
        id: "1",
        origin: {
          id: "1",
          entityId: "DEL",
          name: "Delhi",
          displayCode: "DEL",
        },
        destination: {
          id: "2",
          entityId: "BLR",
          name: "Bengaluru",
          displayCode: "BLR",
        },
        durationInMinutes: 150,
        stopCount: 0,
        departure: new Date("2025-08-10T06:00:00Z").toISOString(),
        arrival: new Date("2025-08-10T08:30:00Z").toISOString(),
        carriers: {
          marketing: [
            {
              id: 1,
              name: "Air India",
              logoUrl: "",
            },
          ],
        },
      },
    ],
  },
  {
    id: "2",
    price: {
      raw: 129.49,
      formatted: "$129.49",
    },
    legs: [
      {
        id: "2",
        origin: {
          id: "3",
          entityId: "DEL",
          name: "Delhi",
          displayCode: "DEL",
        },
        destination: {
          id: "4",
          entityId: "BLR",
          name: "Bengaluru",
          displayCode: "BLR",
        },
        durationInMinutes: 180,
        stopCount: 1,
        departure: new Date("2025-08-10T09:00:00Z").toISOString(),
        arrival: new Date("2025-08-10T12:00:00Z").toISOString(),
        carriers: {
          marketing: [
            {
              id: 2,
              name: "IndiGo",
              logoUrl: "",
            },
          ],
        },
      },
    ],
  },
  {
    id: "3",
    price: {
      raw: 349.0,
      formatted: "$349.00",
    },
    legs: [
      {
        id: "3",
        origin: {
          id: "5",
          entityId: "DEL",
          name: "Delhi",
          displayCode: "DEL",
        },
        destination: {
          id: "6",
          entityId: "BLR",
          name: "Bengaluru",
          displayCode: "BLR",
        },
        durationInMinutes: 210,
        stopCount: 2,
        departure: new Date("2025-08-10T11:00:00Z").toISOString(),
        arrival: new Date("2025-08-10T14:30:00Z").toISOString(),
        carriers: {
          marketing: [
            {
              id: 3,
              name: "Vistara",
              logoUrl: "",
            },
          ],
        },
      },
    ],
  },
];
