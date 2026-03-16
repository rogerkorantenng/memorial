export type MemorialEvent = {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  address: string;
  dressCode?: string;
  description?: string;
};

export const events: MemorialEvent[] = [
  {
    id: "1",
    name: "Funeral Service",
    date: "2026-03-22",
    time: "10:00 AM",
    location: "Christ the King Cathedral",
    address: "Accra, Ghana",
    dressCode: "Black & White",
    description: "A celebration of life service followed by burial at the family cemetery.",
  },
  {
    id: "2",
    name: "Thanksgiving Service",
    date: "2026-03-29",
    time: "9:00 AM",
    location: "Holy Trinity Church",
    address: "Accra, Ghana",
    dressCode: "White",
    description: "A thanksgiving service to honor his memory.",
  },
];
