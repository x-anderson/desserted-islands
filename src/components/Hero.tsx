import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Hero.css";
import LogoCropped from "./LogoCropped";
import Section from "./Section";
import WorldMapImage from "./WorldMapImage";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const onClickScrollToMap = () => {
    navigate("#map");
  };

  return (
    <Section about="hero" background="gradient" className="hero-section">
      <div className="hero-main">
        <h1>Discover the Best Desserts from Around the Globe</h1>
        <button className="hero-button" onClick={() => onClickScrollToMap()}>
          <span className="hero-button-text">View the Map!</span>
          <div className="hero-button-icon-wrapper">
            <FontAwesomeIcon
              icon={faArrowDown}
              title="Button arrow"
              size="xl"
            />
          </div>
        </button>
      </div>
      <div className="hero-img-overlay-wrap">
        <WorldMapImage className="hero-img-map" />
        <img
          src="/top-view-pineapple-upside-down-cake.png"
          alt="pineapple upside down cake"
        />
        <LogoCropped className="hero-img-logo" />
      </div>
    </Section>
  );
}
