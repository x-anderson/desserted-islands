import { useMemo } from "react";
import {
  MapContainer as ReactLeafletMapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { islandCountries } from "../data/islandCountries";
import { countryPosts } from "../data/countryPosts";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import "./Map.css";
import Section from "./Section";

export default function MapContainer() {
  return (
    <Section about="map" placement="odd">
      <h2>Desserted Islands Map</h2>
      <h1>🌎</h1>
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

  const countryMarkers = useMemo(() => {
    const countries = Object.values(islandCountries);
    return countries.map((country) => {
      const post = countryPosts[country.alpha2];
      return (
        <Marker
          key={country.alpha3}
          opacity={post ? 1 : 0.5}
          position={{ lat: country.lat, lng: country.lng }}
          icon={createIcon(post ? "cake" : "spinner")}
          zIndexOffset={post ? 1000 : undefined}
        >
          <Popup closeButton={false}>
            <h3>{country.name}</h3>
            {post && (
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
            )}
            {!post && <p>Coming soon....</p>}
          </Popup>
        </Marker>
      );
    });
  }, []);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" noWrap
      />
      {countryMarkers}
    </>
  );
}
