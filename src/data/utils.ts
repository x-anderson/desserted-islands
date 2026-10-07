import { useCountries } from "./CountriesProvider";
import { countryCodeEmoji } from "country-code-emoji";

// Helper to handle fetch type assertions
export async function request<TResponse>(
  url: string,
  config: RequestInit = {},
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}

type CountryCounts = {
  totalCountries: number;
  countriesCompleted: number;
};

type UseCountryCountsResult = CountryCounts & {
  loading: boolean;
};

export function useCountryCounts(): UseCountryCountsResult {
  const { posts, loading } = useCountries();

  const totalCountries = 103;

  const countriesCompleted = Object.entries(posts ?? {}).length;

  return {
    totalCountries,
    countriesCompleted,
    loading,
  };
}

export function getCountryEmoji(customAlpha2: string): string {
  let alpha2 = customAlpha2;
  // Some island countries dont have their own alpha2 and use their main
  // countries code - e.g. for India and Chile. To resolve this in the data
  // we have some custom alpha2s that have to be mapped here.
  if (alpha2 === "IN-AN" || alpha2 === "IN-LD") {
    alpha2 = "IN";
  }
  if (alpha2 === "CL-1" || alpha2 === "CL-2") {
    alpha2 = "CL";
  }
  return countryCodeEmoji(alpha2);
}
