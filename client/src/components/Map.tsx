import { useMemo } from "react";
import {
  MapContainer as ReactLeafletMapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import "./Map.css";
import Section from "./Section";
import { useFetch } from "../data/useFetch";

type Country = {
  name: string;
  alpha2: string;
  alpha3: string;
  lat: number;
  lng: number;
};

export type Post = {
  countryAlpha2: string;
  url: string;
  subCountry?: string;
};

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

  const { data: posts, loading: postsLoading } = useFetch("/posts");
  const { data: countries, loading: countriesLoading } = useFetch("/countries");

  const map = useMap();
  map.scrollWheelZoom.disable();

  const countryMarkers = useMemo(() => {
    if (postsLoading || countriesLoading) {
      return [];
    }
    const newcountryPosts: { [name: string]: Post[] } = {};
    (posts as unknown as Post[]).forEach((post) => {
      if (!newcountryPosts[post.countryAlpha2]) {
        newcountryPosts[post.countryAlpha2] = [];
      }
      newcountryPosts[post.countryAlpha2].push(post);
    });

    return (countries as unknown as Country[]).map((country) => {
      const posts = newcountryPosts[country.alpha2];
      console.log(posts);
      const hasPost = posts?.length > 0;
      return (
        <Marker
          key={country.alpha3}
          opacity={hasPost ? 1 : 0.5}
          position={{ lat: country.lat, lng: country.lng }}
          icon={createIcon(hasPost ? "cake" : "spinner")}
          zIndexOffset={hasPost ? 1000 : undefined}
        >
          <Popup closeButton={false}>
            <h3>{country.name}</h3>
            {(posts as unknown as Post[])?.map((post, idx) => {
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
  }, [postsLoading, countriesLoading, countries, posts]);

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
