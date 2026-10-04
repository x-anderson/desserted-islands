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
import Badge from "./Badge";
import { useLocation, useSearchParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import cakeMarker from "../img/cake_marker.png";
import spinnerMarker from "../img/spinner_marker.png";
import { useCountries } from "../data/CountriesProvider";
import Button from "./Button";
import React from "react";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

require("leaflet-spin");

const IG_URL = "https://www.instagram.com/desserted_islands/";

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
    <section className="map-section" id="the-map">
      <div className="map-header-container">
        <Badge title="The Map" />
        <h2>Where have I been?</h2>
        <p>Click a country to discover the dessert I've baked there!</p>
        <div className="map-legend">
          <div className="map-legend-item">
            <img
              className="map-legend-item-img"
              src={cakeMarker}
              alt="Baked marker"
            />
            <span>Baked</span>
          </div>
          <div className="map-legend-item">
            <img
              className="map-legend-item-img"
              src={spinnerMarker}
              alt="Coming soon marker"
            />
            <span>Coming soon</span>
          </div>
        </div>
      </div>

      <div className="map-container">
        <ReactLeafletMapContainer
          center={[51.505, -0.09]}
          zoom={2}
          minZoom={2}
          worldCopyJump
        >
          <Map />
        </ReactLeafletMapContainer>
      </div>
    </section>
  );
}

const SELECTED_COUNTRY_URL_PARAM = "selectedCountry";

function Map() {
  const { countries, posts, loading } = useCountries();
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

  useEffect(() => {
    // @ts-ignore
    map.spin(loading, {
      color: "var(--marker-icon-color)",
    });

    return () => {
      // @ts-ignore
      map.spin(false);
    };
  }, [map, loading]);

  const countriesByAlpha2 = useMemo(() => {
    const record: Record<string, Country> = {};
    countries?.forEach((country) => {
      record[country.alpha2] = country;
    });
    return record;
  }, [countries]);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>();

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
    [countriesByAlpha2, setSearchParams],
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
        const center = map.getCenter();
        const offset =
          Math.round((center.lng - selectedCountry.lng) / 360) * 360;
        const adjustedLng = selectedCountry.lng + offset;
        const popupRef =
          popupRefs.current[`${selectedCountry.alpha2}-${offset}`];
        if (popupRef) {
          popupRef.setLatLng([selectedCountry.lat, adjustedLng]);
          map.openPopup(popupRef);
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
    if (!posts || !countries) {
      return;
    }
    // Make some copies of the countries both to the east and west lng - this gives the impression
    // to the user that the map is infinite. When user gets to the edge of the map, worldCopyJump option
    // in leaflet will reset the user to the centre map, and these extra copies will ensure it still
    // appears infinite.
    const copies = [-360, 0, 360];
    return countries.map((country, idx) => {
      const postsForCountry = posts[country.alpha2];
      const hasPost = !!postsForCountry?.length && postsForCountry.length > 0;
      return copies.map((offset) => {
        return (
          <Marker
            key={`${country.alpha2}-${idx}=${offset}`}
            position={{ lat: country.lat, lng: country.lng + offset }}
            riseOnHover
            icon={createIcon(hasPost ? "cake" : "spinner")}
            zIndexOffset={hasPost ? 1000 : undefined}
            eventHandlers={{
              click: () => handleSetAlpha2Params(country.alpha2),
            }}
          >
            <CountryPopup
              country={country}
              offset={offset}
              postsForCountry={postsForCountry}
              hasPost={hasPost}
              popupRefs={popupRefs}
              handleClearAlpha2Params={handleClearAlpha2Params}
            />
          </Marker>
        );
      });
    });
  }, [posts, countries, handleSetAlpha2Params, handleClearAlpha2Params]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url={`https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png?key=${process.env.REACT_APP_CARTO_API_KEY}`}
      />
      <div
        style={{ pointerEvents: "all", top: "10px", right: "10px" }}
        className="country-autocomplete leaflet-top leaflet-right"
      >
        <Autocomplete
          options={countries ?? []}
          size="small"
          sx={{ width: 300 }}
          loading={loading}
          loadingText="Loading..."
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Find an island country..."
            />
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

      {countryMarkers}
    </>
  );
}

type CountryPopupProps = {
  country: Country;
  offset: number;
  postsForCountry?: CountryPost[];
  hasPost: boolean;
  popupRefs: React.MutableRefObject<Record<string, any>>;
  handleClearAlpha2Params: () => void;
};

const CountryPopup = ({
  country,
  offset,
  postsForCountry,
  hasPost,
  popupRefs,
  handleClearAlpha2Params,
}: CountryPopupProps) => {
  return (
    <Popup
      ref={(r) => {
        popupRefs.current[`${country.alpha2}-${offset}`] = r;
      }}
      closeButton={false}
      eventHandlers={{
        remove: handleClearAlpha2Params,
      }}
      autoPan
      autoPanPaddingTopLeft={[20, 75]}
      autoPanPaddingBottomRight={[20, 75]}
    >
      <div className="popup-content">
        <div className="popup-content-header">
          <img
            className="map-legend-item-img"
            src={hasPost ? cakeMarker : spinnerMarker}
            alt={hasPost ? "Baked marker" : "Coming soon marker"}
          />
          <div>
            <h6 className="popup-content-header-label">
              {hasPost ? "Baked and Documented" : "On the itenerary"}
            </h6>
            <h3>{country.name}</h3>
          </div>
        </div>

        <p>
          {hasPost && postsForCountry?.length === 1
            ? "Meet the dessert and see how it turned out!"
            : hasPost && postsForCountry && postsForCountry.length > 1
            ? `${postsForCountry.length} bakes from constituent countries - choose one to explore!`
            : "This islands adventure is still to come"}
        </p>

        {!hasPost && (
          <div className="map-popover-content">
            <Button
              href={IG_URL}
              aria-label="Link to the Instagram page (Opens in new tab)"
              variant="secondary"
              icon={faInstagram}
              size="md"
              fullWidth
            >
              Follow the journey!
            </Button>
          </div>
        )}

        {postsForCountry && postsForCountry?.length === 1 && (
          <div className="map-popover-content">
            <Button
              href={postsForCountry[0].url}
              aria-label="Link to the Instagram post (Opens in new tab)"
              variant="primary"
              icon={faInstagram}
              size="md"
              fullWidth
            >
              View on Instagram!
            </Button>
          </div>
        )}

        {postsForCountry && postsForCountry.length > 1 && (
          <div className="map-popover-content">
            <div className="map-popover-content-subcountries">
              {postsForCountry.map((post, idx) => (
                <Button
                  key={`${idx}-${post.url}`}
                  href={post.url}
                  aria-label="Link to the Instagram post (Opens in new tab)"
                  variant="primary"
                  icon={faInstagram}
                  size="sm"
                  fullWidth
                >
                  {post.subCountry}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Popup>
  );
};
