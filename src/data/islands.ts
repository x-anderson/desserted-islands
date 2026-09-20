export interface Island {
  name: string;
  alpha2: string;
  flag: string;
  coordinates: [number, number];
  done: boolean;
  instagramUrl: string;
}

export const ISLANDS: Island[] = [
  {
    name: "Aruba",
    alpha2: "AW",
    flag: "🇦🇼",
    coordinates: [-70.0, 12.17],
    done: true,
    instagramUrl: "https://www.instagram.com/p/CjF3Y8lj1gT/",
  },
  {
    name: "Malta",
    alpha2: "MT",
    flag: "🇲🇹",
    coordinates: [14.5, 35.9],
    done: true,
    instagramUrl: "https://www.instagram.com/p/CeWiV5YofWF/",
  },
  {
    name: "Svalbard",
    alpha2: "SJ",
    flag: "🇸🇯",
    coordinates: [20.0, 78.0],
    done: true,
    instagramUrl: "https://www.instagram.com/p/Cf_kehhoPrX/",
  },
  {
    name: "Madagascar",
    alpha2: "MG",
    flag: "🇲🇬",
    coordinates: [47.0, -20.0],
    done: true,
    instagramUrl: "https://www.instagram.com/p/CeoeuMnol2N/",
  },
  {
    name: "Indonesia",
    alpha2: "ID",
    flag: "🇮🇩",
    coordinates: [113.0, -2.0],
    done: true,
    instagramUrl: "https://www.instagram.com/p/CgaDujRjSxa/",
  },
  {
    name: "Tuvalu",
    alpha2: "TV",
    flag: "🇹🇻",
    coordinates: [179.0, -8.0],
    done: true,
    instagramUrl: "https://www.instagram.com/p/CkYCWTBjKEO/",
  },
  {
    name: "Fiji",
    alpha2: "FJ",
    flag: "🇫🇯",
    coordinates: [178.0, -18.0],
    done: false,
    instagramUrl: "#",
  },
  {
    name: "Mauritius",
    alpha2: "MU",
    flag: "🇲🇺",
    coordinates: [57.5, -20.3],
    done: false,
    instagramUrl: "#",
  },
  {
    name: "Cyprus",
    alpha2: "CY",
    flag: "🇨🇾",
    coordinates: [33.4, 35.1],
    done: false,
    instagramUrl: "#",
  },
  {
    name: "Iceland",
    alpha2: "IS",
    flag: "🇮🇸",
    coordinates: [-19.0, 65.0],
    done: false,
    instagramUrl: "#",
  },
  {
    name: "Samoa",
    alpha2: "WS",
    flag: "🇼🇸",
    coordinates: [-172.0, -13.8],
    done: false,
    instagramUrl: "#",
  },
  {
    name: "Seychelles",
    alpha2: "SC",
    flag: "🇸🇨",
    coordinates: [55.5, -4.7],
    done: false,
    instagramUrl: "#",
  },
  {
    name: "Bahamas",
    alpha2: "BS",
    flag: "🇧🇸",
    coordinates: [-76.0, 25.0],
    done: false,
    instagramUrl: "#",
  },
  {
    name: "Jamaica",
    alpha2: "JM",
    flag: "🇯🇲",
    coordinates: [-77.0, 18.1],
    done: false,
    instagramUrl: "#",
  },
  {
    name: "Trinidad and Tobago",
    alpha2: "TT",
    flag: "🇹🇹",
    coordinates: [-61.2, 10.7],
    done: false,
    instagramUrl: "#",
  },
];
