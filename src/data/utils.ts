import { useCountries } from "./CountriesProvider";

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
