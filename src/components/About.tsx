import "./About.css";
import Section from "./Section";

export default function About() {
  return (
    <Section about="about" background='light'>
      <h2>
        There are 99 island countries in the world. What do you think they eat
        for dessert?
      </h2>
      <div className="about-section">
        <div>
          <h3>Who am I?</h3>
          <p>
            My name is Xander, a (very) amateur baker from the UK. I've been
            baking (and cooking, steaming, frying....) my way through
            traditional dessert recipes from the world's island countries.
          </p>
        </div>
        <div>
          <h3>What is this page about?</h3>
          <p>
            I document most of my creations in my Instagram (link below!), but I
            really wanted to visualise all my desserts on a map - so I present,
            the "Desserted Islands Map" below
          </p>
          <br></br>
        </div>
      </div>
    </Section>
  );
}
