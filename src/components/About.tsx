import "./About.css";
import Badge from "./Badge";
import Button from "./Button";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "./Skeleton";
import { useCountryCounts } from "../data/utils";

const IG_URL = "https://www.instagram.com/desserted_islands/";

export default function About() {
  const { totalCountries, countriesCompleted, loading } = useCountryCounts();
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-content">
          <Badge title="The Project" />
          <h2>
            Baking my way around{" "}
            <span className="about-title-highlight">every island on Earth</span>
          </h2>

          <p>
            My name is <strong>Xander</strong>, and I'm an amateur baker from
            the UK. For the last few years, I've been baking (and cooking,
            steaming, frying…) my way through traditional dessert recipes from
            the world's island countries.
          </p>

          <p>
            I document most of my creations on Instagram, but I really wanted to
            visualise all my desserts on a map - so I present, the{" "}
            <strong>Desserted Islands Map</strong> below!
          </p>

          <p>
            Each bake helps me learn and share about the history, culture, and
            ingredients of each country. What does a traditional dessert tell
            you about a place? Turns out - <em>a lot!</em>.
          </p>

          <div className="about-buttons">
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
              Follow on Instagram
            </Button>
            <Button
              variant="secondary"
              href="mailto:dessertedislands22@gmail.com"
              icon={faEnvelope}
            >
              Get in touch
            </Button>
          </div>
        </div>

        <div className="about-stat-grid">
          <div className="about-stat-card about-stat-baked">
            <span className="about-stat-number">
              {loading ? <Skeleton /> : countriesCompleted}
            </span>
            <span className="about-stat-label">Islands baked</span>
          </div>
          <div className="about-stat-card about-stat-remaining">
            <span className="about-stat-number">
              {loading ? <Skeleton /> : totalCountries - countriesCompleted}
            </span>
            <span className="about-stat-label">Still to go</span>
          </div>
          <div className="about-stat-card about-stat-continents">
            <span className="about-stat-number">6</span>
            <span className="about-stat-label">Continents covered</span>
          </div>
          <div className="about-stat-card about-stat-calories">
            <span className="about-stat-number">∞</span>
            <span className="about-stat-label">Calories consumed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
