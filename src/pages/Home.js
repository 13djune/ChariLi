import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
export default function Home() {
    return (
        <>
        <Hero />
        <section className="relative z-0">
          <Gallery />
        </section>
      </>
    );
  }
  