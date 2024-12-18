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
    <Section about="carousel" background="dark" className={`carousel-section`}>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop
        centerMode={isLargeWidth}
        centerSlidePercentage={isLargeWidth ? 50 : undefined}
      >
        <div className="carousel-div">
          <img
            src="/ar-pineapple-1600.jpeg"
            alt="Bolo di Anasa (pineapple upside-down-cake) from Aruba"
            srcSet="
            /ar-pineapple-300.jpeg 300w,
            /ar-pineapple-800.jpeg 800w,
            /ar-pineapple-1600.jpeg 1600w,
           "
            fetchpriority="high"
          />
          <p className="legend">🇦🇼 Bolo di Anasa from Aruba</p>
        </div>
        <div>
          <img
            src="/in-kue-mangkok-1600.jpeg"
            alt="Kue Mangkok (colorful steamed cakes) from Indonesia"
            srcSet="
            /in-kue-mangkok-300.jpeg 300w,
            /in-kue-mangkok-800.jpeg 800w,
            /in-kue-mangkok-1600.jpeg 1600w,
           "
            fetchpriority="low"
          />
          <p className="legend">🇮🇩 Kue Mangkok from Indonesia</p>
        </div>
        <div>
          <img
            src="/tv-coconut-1600.jpeg"
            alt="Coconut Pudding from Tuvalu"
            srcSet="
            /tv-coconut-300.jpeg 300w,
            /tv-coconut-800.jpeg 800w,
            /tv-coconut-1600.jpeg 1600w,
           "
            fetchpriority="low"
          />
          <p className="legend">🇹🇻 Coconut Pudding from Tuvalu</p>
        </div>
        <div className="carousel-div">
          <img
            src="/sv-blotkake-1600.jpeg"
            alt="Blotkake (strawberry and cream sponge cake) from Svalbard"
            srcSet="
            /sv-blotkake-300.jpeg 300w,
            /sv-blotkake-800.jpeg 800w,
            /sv-blotkake-1600.jpeg 1600w,
           "
            fetchpriority="low"
          />
          <p className="legend">🇦🇸 Bløtkake from Svalbard</p>
        </div>
        <div>
          <img
            src="/mg-kobo-akondo-1600.jpeg"
            alt="Koba Akondro (banana and peanut pudding) from Madagascar"
            srcSet="
            /mg-kobo-akondo-300.jpeg 300w,
            /mg-kobo-akondo-800.jpeg 800w,
            /mg-kobo-akondo-1600.jpeg 1600w,
           "
            fetchpriority="low"
          />
          <p className="legend">🇲🇬Koba Akondro from Madagascar</p>
        </div>
        <div>
          <img
            src="/mt-kwarezimal-1600.jpeg"
            alt="Kwarezimal (orange blossom biscuits) from Malta"
            srcSet="
            /mt-kwarezimal-300.jpeg 300w,
            /mt-kwarezimal-800.jpeg 800w,
            /mt-kwarezimal-1600.jpeg 1600w,
           "
            fetchpriority="low"
          />
          <p className="legend">🇲🇹 Kwareżimal from Malta</p>
        </div>
      </Carousel>
    </Section>
  );
}
