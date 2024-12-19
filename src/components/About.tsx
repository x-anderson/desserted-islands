import "./About.css";
import Section from "./Section";

export default function About() {
  return (
    <Section about="about" background="light">
      <h2>
        There are 99 island countries in the world. What do you think they eat
        for dessert?
      </h2>
      <div className="about-section">
        <div className="about-box about-box-dark">
          <h3>Who am I?</h3>
          <p>
            My name is <span className="about-word-highlight">Xander</span>, and
            I'm an amateur baker from the UK. For the last few years, I've been
            baking (and cooking, steaming, frying....) my way through
            traditional dessert recipes from the world's island countries.
          </p>
        </div>
        <div className="about-box">
          <h3>What is this page about?</h3>
          <p>
            I document most of my creations on Instagram, but I really wanted to
            visualise all my desserts on a map - so I present, the "Desserted
            Islands Map" below!
          </p>
        </div>
      </div>
    </Section>
  );
}
