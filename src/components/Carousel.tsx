import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Section from "./Section";
import "./Carousel.css";
import { useMediaQuery } from "react-responsive";

export default function CarouselSection() {
  const isLargeWidth = useMediaQuery({
    query: "(min-width: 800px)",
  });

  return (
    <Section about="carousel" placement="odd" className={`carousel-section`}>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop
        centerMode={isLargeWidth}
        centerSlidePercentage={50}
      >
        <div className="carousel-div">
          <img
            src="/ar-pineapple.jpg"
            alt="Bolo di Anasa (pineapple upside-down-cake) from Aruba"
          />
          <p className="legend">🇦🇼 Bolo di Anasa from Aruba</p>
        </div>
        <div>
          <img
            src="/in-kue-mangkok.jpg"
            alt="Kue Mangkok (colorful steamed cakes) from Indonesia"
          />
          <p className="legend">🇮🇩 Kue Mangkok from Indonesia</p>
        </div>
        <div>
          <img src="/tv-coconut.jpg" alt="Coconut Pudding from Tuvalu" />
          <p className="legend">🇹🇻 Coconut Pudding from Tuvalu</p>
        </div>
        <div className="carousel-div">
          <img
            src="/sv-blotkake.jpg"
            alt="Blotkake (strawberry and cream sponge cake) from Svalbard"
          />
          <p className="legend">🇦🇸 Bløtkake from Svalbard</p>
        </div>
        <div>
          <img
            src="/mg-kobo-akondo.jpg"
            alt="Koba Akondro (banana and peanut pudding) from Madagascar"
          />
          <p className="legend">🇲🇬Koba Akondro from Madagascar</p>
        </div>
        <div>
          <img
            src="/mt-kwarezimal.jpg"
            alt="Kwarezimal (orange blossom biscuits) from Malta"
          />
          <p className="legend">🇲🇹 Kwareżimal from Malta</p>
        </div>
      </Carousel>
    </Section>
  );
}
