import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Country, CountryPost } from "./types";
import { request } from "./utils";
import { Bounce, toast } from "react-toastify";

type CountriesContextValue = {
  countries: Country[] | undefined;
  posts: { [alpha2: string]: CountryPost[] | undefined } | undefined;
  loading: boolean;
};

const CountriesContext = createContext<CountriesContextValue | undefined>(
  undefined,
);

export function CountriesProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const [countries, setCountries] = useState<Country[] | undefined>();

  const [countryPosts, setCountryPosts] = useState<{
    [alpha2: string]: CountryPost[] | undefined;
  }>();

  useEffect(() => {
    async function loadData() {
      try {
        const islandPosts = await request<CountryPost[]>(
          "/.netlify/functions/get_posts",
          {
            method: "GET",
          },
        );

        const formattedCountryPosts: {
          [alpha2: string]: CountryPost[];
        } = {};
        islandPosts?.forEach((countryPost) => {
          if (!formattedCountryPosts[countryPost.countryAlpha2]) {
            formattedCountryPosts[countryPost.countryAlpha2] = [];
          }
          formattedCountryPosts[countryPost.countryAlpha2] = [
            ...formattedCountryPosts[countryPost.countryAlpha2],
            countryPost,
          ];
        });
        setCountryPosts(formattedCountryPosts);

        const islandCountries = await request<Country[]>(
          "/.netlify/functions/get_countries",
          {
            method: "GET",
          },
        );
        setCountries(
          islandCountries.sort((a, b) => {
            return a.name.localeCompare(b.name);
          }),
        );
      } catch (e) {
        toast("Error retrieving posts :(", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <CountriesContext.Provider
      value={{
        countries: countries,
        posts: countryPosts,
        loading,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  const context = useContext(CountriesContext);

  if (!context) {
    throw new Error("useCountries must be used within a CountriesProvider");
  }

  return context;
}
