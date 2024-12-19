import About from "../components/About";
import CarouselSection from "../components/Carousel";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Map from "../components/Map";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CarouselSection />
      <About />
      <Map />
      <Footer />
    </>
  );
}
