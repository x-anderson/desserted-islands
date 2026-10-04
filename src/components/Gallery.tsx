import "./Gallery.css";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Button from "./Button";
import Badge from "./Badge";
import { useCountryCounts } from "../data/utils";
import Skeleton from "./Skeleton";

const IG_URL = "https://www.instagram.com/desserted_islands/";

interface GalleryItem {
  url: string;
  alt: string;
  country: string;
  dessert: string;
  instagramUrl: string;
}

const GALLERY_MAIN: GalleryItem[] = [
  {
    url: "/madeleines.jpg",
    alt: "Madeleines from Mayotte",
    country: "Mayotte 🇫🇷",
    dessert: "Madeleines",
    instagramUrl: "https://www.instagram.com/desserted_islands/p/DJyjFhrilqD/",
  },
  {
    url: "/gulab_jamun.jpg",
    alt: "Gulab jamun from Lakshadweep",
    country: "Lakshadweep 🇮🇳",
    dessert: "Gulab Jamun",
    instagramUrl: "https://www.instagram.com/desserted_islands/p/DI7D1dMCUXf/",
  },
  {
    url: "/sv-blotkake-800.jpeg",
    alt: "Blotkake strawberry cream sponge from Svalbard",
    country: "Svalbard 🇸🇯",
    dessert: "Blotkake",
    instagramUrl: "https://www.instagram.com/p/Cf_kehhoPrX/",
  },
  {
    url: "/pavlova.jpg",
    alt: "Pavlova meringue and fruit from Christmas Island",
    country: "Christmas Island 🇮🇨",
    dessert: "Pavlova",
    instagramUrl: "https://www.instagram.com/desserted_islands/p/Cv9TYIAohiC/",
  },
  {
    url: "/hanami_dango.jpg",
    alt: "Hanami Dango from Japan",
    country: "Japan 🇯🇵",
    dessert: "Hanami Dango",
    instagramUrl: "https://www.instagram.com/desserted_islands/p/CipUXCxDrtW/",
  },
  {
    url: "/pineapple_cake.jpg",
    alt: "Pineapple upside-down cake from Aruba",
    country: "Aruba 🇦🇼",
    dessert: "Pineapple Upside-Down Cake",
    instagramUrl: "https://www.instagram.com/p/CjF3Y8lj1gT/",
  },
];

export default function Gallery() {
  const { loading, countriesCompleted } = useCountryCounts();
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <Badge title="The Bakes" />
          <h2>A taste of the collection</h2>
          <p>
            Every photo links to the full story on Instagram - ingredients,
            process, and all the things that went into the bake!
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY_MAIN.map((item, i) => (
            <a
              key={i}
              href={item.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-item"
            >
              <img
                src={item.url}
                alt={item.alt}
                className="gallery-item-image"
              />
              <div className="gallery-item-overlay">
                <span className="gallery-item-country">{item.country}</span>
                <span className="gallery-item-dessert">{item.dessert}</span>
              </div>
            </a>
          ))}
        </div>

        <Button
          variant="primary"
          href={IG_URL}
          onClick={(e) => {
            if (typeof window !== "undefined") {
              window.open(IG_URL, "_blank", "noopener,noreferrer");
              e.preventDefault();
            }
          }}
          icon={faInstagram}
        >
          See all {loading ? <Skeleton width="1rem" /> : countriesCompleted}{" "}
          bakes on Instagram
        </Button>
      </div>
    </section>
  );
}
