export type Country = {
  name: string;
  alpha2: string;
  alpha3: string;
  lat: number;
  lng: number;
};

export type CountryPost = {
  url: string;
  countryAlpha2: string;
  subCountry?: string;
};
