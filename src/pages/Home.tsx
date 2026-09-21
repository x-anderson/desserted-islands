import About from "../components/About";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Map from "../components/Map";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Map />
      <Footer />
    </>
  );
}
