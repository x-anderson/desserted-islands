import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Section from "./Section";
import "./Carousel.css";

export default function CarouselSection() {
  return (
    <Section about="carousel" placement="odd" className="carousel-section">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop
      >
        <div className="carousel-div">
          <img src="/ar-pineapple.jpg" alt="bolo di anasa" />
          <p className="legend">🇦🇼 Bolo di Anasa from Aruba</p>
        </div>
        <div>
          <img src="/in-kue-mangkok.jpg" alt="kue mangkok" />
          <p className="legend">🇮🇩 Kue Mangkok from Indonesia</p>
        </div>
        <div>
          <img src="/tv-coconut.jpg" alt="coconut pudding" />
          <p className="legend">🇹🇻 Coconut Pudding from Tuvalu</p>
        </div>
        <div className="carousel-div">
          <img src="/sv-blotkake.jpg" alt="blotkake" />
          <p className="legend">🇦🇸 Bløtkake from Svalbard</p>
        </div>
        <div>
          <img src="/mg-kobo-akondo.jpg" alt="koba akondro" />
          <p className="legend">🇲🇬Koba Akondro from Madagascar</p>
        </div>
        <div>
          <img src="/mt-kwarezimal.jpg" alt="kwarezimal" />
          <p className="legend">🇲🇹 Kwareżimal from Malta</p>
        </div>
      </Carousel>
    </Section>
  );
}
