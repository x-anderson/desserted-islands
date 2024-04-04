import { useEffect, useMemo, useState } from "react";
import {
  MapContainer as ReactLeafletMapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { Country, CountryPost } from "../data/types";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import "./Map.css";
import Section from "./Section";

export default function MapContainer() {
  return (
    <Section about="map" placement="odd">
      <h1>
        <span>🌎</span>
      </h1>
      <h2>Desserted Islands Map</h2>
      <p>
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
  const [countryPosts, setCountryPosts] = useState<{
    [alpha2: string]: CountryPost[] | undefined;
  }>();

  useEffect(() => {
    const fetchPosts = async () => {
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
      setCountries(islandCountries);
    };

    fetchPosts();
  }, []);

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
    return countriesUpdatedLng.map((country, idx) => {
      const posts = countryPosts[country.alpha2];
      const hasPost = posts?.length && posts.length > 0;
      return (
        <Marker
          key={`${country.alpha2}-${idx}`}
          opacity={hasPost ? 1 : 0.5}
          position={{ lat: country.lat, lng: country.lng }}
          icon={createIcon(hasPost ? "cake" : "spinner")}
          zIndexOffset={hasPost ? 1000 : undefined}
        >
          <Popup closeButton={false}>
            <h3>{country.name}</h3>
            {posts?.map((post, idx) => {
              return (
                <div key={`${idx}-${post.url}`}>
                  {post.subCountry && <h4>{post.subCountry}</h4>}
                  <a
                    className="btn"
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click for deliciousness!
                    <br></br>
                    <FontAwesomeIcon
                      className="map-link-icon"
                      icon={faArrowUpRightFromSquare}
                    />
                  </a>
                </div>
              );
            })}
            {!hasPost && <p>Coming soon....</p>}
          </Popup>
        </Marker>
      );
    });
  }, [countryPosts, countries]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
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
