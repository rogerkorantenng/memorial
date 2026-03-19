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
    name: "Collection of Body & Funeral Begins",
    date: "2026-05-08",
    time: "9:00 AM",
    location: "Transition - Haatso, Accra",
    address: "Wegbe-Kpalime, Volta Region",
    dressCode: "Black",
    description: "Collection of body from Transition - Haatso, Accra. Funeral begins at Wegbe-Kpalime. No Wake Keeping.",
  },
  {
    id: "2",
    name: "Burial and Final Funeral Rites",
    date: "2026-05-09",
    time: "9:00 AM",
    location: "Wegbe-Kpalime",
    address: "Volta Region, Ghana",
    dressCode: "Black",
    description: "Burial and final funeral rites at Wegbe-Kpalime, Volta Region.",
  },
  {
    id: "3",
    name: "Thanksgiving Service",
    date: "2026-05-10",
    time: "9:00 AM",
    location: "E.P Church, Wegbe-Kpalime",
    address: "Volta Region, Ghana",
    dressCode: "Black",
    description: "Thanksgiving service at E.P Church, Wegbe-Kpalime, Volta Region.",
  },
];
