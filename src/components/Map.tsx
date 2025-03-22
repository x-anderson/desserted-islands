import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer as ReactLeafletMapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { Country, CountryPost } from "../data/types";
import L from "leaflet";
import "./Map.css";
import Section from "./Section";
import { useLocation, useSearchParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

require("leaflet-spin");

export default function MapContainer() {
  const location = useLocation();
  const lastHash = useRef("");

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1);
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      document
        .getElementById(lastHash.current)
        ?.scrollIntoView({ block: "start" });
      lastHash.current = "";
    }
  }, [location]);

  return (
    <Section about="map" background="dark">
      <div className="map-header">
        <h2 className="map-header-title" id="map">
          Desserted Islands Map
        </h2>
      </div>
      <p className="map-section-text">
        Discover desserts recipes! Click the markers on the map below to explore
        dessert recipes from the world's island countries.
      </p>
      <div className="map-container">
        <ReactLeafletMapContainer center={[51.505, -0.09]} zoom={2} minZoom={2}>
          <Map />
        </ReactLeafletMapContainer>
      </div>
    </Section>
  );
}

const SELECTED_COUNTRY_URL_PARAM = "selectedCountry";

function Map() {
  const createIcon = (icon: "cake" | "spinner") => {
    return L.icon({
      iconUrl: require(icon === "cake"
        ? "../img/cake_marker.png"
        : "../img/spinner_marker.png"),
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  const map = useMap();
  map.scrollWheelZoom.disable();

  const [countries, setCountries] = useState<Country[] | undefined>();
  const countriesByAlpha2 = useMemo(() => {
    const record: Record<string, Country> = {};
    countries?.forEach((country) => {
      record[country.alpha2] = country;
    });
    return record;
  }, [countries]);
  const [countryPosts, setCountryPosts] = useState<{
    [alpha2: string]: CountryPost[] | undefined;
  }>();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>();

  useEffect(() => {
    const fetchPosts = async () => {
      // @ts-ignore
      map.spin(true, { color: `var(--marker-icon-color)` });
      const islandPosts = await request<CountryPost[]>(
        "/.netlify/functions/get_posts",
        {
          method: "GET",
        }
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
        }
      );
      setCountries(
        islandCountries.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
      );
    };

    fetchPosts().then(() => {
      // @ts-ignore
      map.spin(false);
    });
  }, [map]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetAlpha2Params = useCallback(
    (alpha2: string) => {
      setSearchParams((params) => {
        params.set(SELECTED_COUNTRY_URL_PARAM, alpha2);
        return params;
      });
      const newCountry = countriesByAlpha2[alpha2];
      setSelectedCountry(newCountry);
    },
    [countriesByAlpha2, setSearchParams]
  );

  const handleClearAlpha2Params = useCallback(() => {
    setSearchParams((params) => {
      params.delete(SELECTED_COUNTRY_URL_PARAM);
      return params;
    });
    setSelectedCountry(null);
  }, [setSearchParams]);

  const popupRefs = useRef<{ [alpha2: string]: L.Popup | null }>({});

  useEffect(() => {
    const selectedCountryAlpha2 = searchParams.get(SELECTED_COUNTRY_URL_PARAM);
    if (selectedCountryAlpha2) {
      const selectedCountry = countriesByAlpha2[selectedCountryAlpha2];
      if (selectedCountry) {
        map.flyTo([selectedCountry.lat, selectedCountry.lng]);
        const selectedCountryRef = popupRefs.current?.[selectedCountry.alpha2];
        if (selectedCountryRef) {
          selectedCountryRef.setLatLng([
            selectedCountry.lat,
            selectedCountry.lng,
          ]);
          map.openPopup(selectedCountryRef);
        }
        setSelectedCountry(selectedCountry);
      }
    }
    // We only want this to run if countries change (which should happen only on load)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, selectedCountry]);

  const handleSelectCountryFromAutocomplete = (country: Country | null) => {
    if (country) {
      handleSetAlpha2Params(country.alpha2);
    } else {
      handleClearAlpha2Params();
    }
  };

  const countryMarkers = useMemo(() => {
    if (!countryPosts || !countries) {
      return;
    }
    // When the user pans to another copy of the map, they do not see the markers on that copy
    // as the markers are on only 1 layer. One option is to use the worldCopyJump option in leaflet
    // but it doesn't work well when panning zoomed out. Instead, we can create some copies of the
    // markers along the longitude to ensure they appear on more copies to give the impression to
    // the user that they can scroll back and forth.
    const countriesUpdatedLng: Country[] = [...countries];
    countries.forEach((country) => {
      for (let i = 360; i <= 1080; i += 360) {
        countriesUpdatedLng.push({
          ...country,
          lng: country.lng + i,
        });
        countriesUpdatedLng.push({
          ...country,
          lng: country.lng - i,
        });
      }
    });
    return countries.map((country, idx) => {
      const posts = countryPosts[country.alpha2];
      const hasPost = posts?.length && posts.length > 0;
      return (
        <Marker
          key={`${country.alpha2}-${idx}`}
          opacity={hasPost ? 1 : 0.5}
          position={{ lat: country.lat, lng: country.lng }}
          icon={createIcon(hasPost ? "cake" : "spinner")}
          zIndexOffset={hasPost ? 1000 : undefined}
          eventHandlers={{
            click: () => handleSetAlpha2Params(country.alpha2),
          }}
        >
          <Popup
            ref={(r) => {
              if (popupRefs.current) {
                popupRefs.current[country.alpha2] = r;
              }
            }}
            closeButton={false}
            eventHandlers={{ remove: () => handleClearAlpha2Params() }}
          >
            <h5>{country.name}</h5>
            {posts?.map((post, idx) => {
              return (
                <div key={`${idx}-${post.url}`} className="map-popover-content">
                  {post.subCountry && <h6>{post.subCountry}</h6>}
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Link to the Instagram post (Opens in new tab)"
                  >
                    View dessert on Instagram!
                    <br></br>
                  </a>
                </div>
              );
            })}
            {!hasPost && <p>Coming soon....</p>}
          </Popup>
        </Marker>
      );
    });
  }, [countryPosts, countries, handleSetAlpha2Params, handleClearAlpha2Params]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
      {countries && (
        <div
          style={{ pointerEvents: "all", top: "10px", right: "10px" }}
          className="country-autocomplete leaflet-top leaflet-right"
        >
          <Autocomplete
            options={countries}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Find an island country..." />
            )}
            getOptionLabel={(option) => {
              return option.name;
            }}
            onChange={(e, value) => {
              handleSelectCountryFromAutocomplete(value);
            }}
            value={selectedCountry || null}
          />
        </div>
      )}

      {countryMarkers}
    </>
  );
}

// Helper to handle fetch type assertions
async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}
