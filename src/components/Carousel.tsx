import Section from "./Section";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CarouselSection() {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 800,
      },
      items: 3,
    },
    tablet: {
      breakpoint: {
        max: 800,
        min: 600,
      },
      items: 2,
    },
    mobile: {
      breakpoint: {
        max: 600,
        min: 0,
      },
      items: 1,
    },
  };

  return (
    <Section about="carousel" background="light" className="carousel-section">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        draggable
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        responsive={responsive}
        shouldResetAutoplay
        showDots={false}
        slidesToSlide={1}
        swipeable
      >
        <div className="carousel-image">
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
        <div className="carousel-image">
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
        <div className="carousel-image">
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
        <div className="carousel-image">
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
          <p className="legend">🇲🇬 Koba Akondro from Madagascar</p>
        </div>
        <div className="carousel-image">
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
