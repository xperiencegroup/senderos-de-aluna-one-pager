import AboutUs from "./components/about-us";
import Amenidades from "./components/amenidades";
import Hero from "./components/hero";
import PlanoConjunto from "./components/plano-conjunto";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <PlanoConjunto />
      <Amenidades />
    </>
  );
}
