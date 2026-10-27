import AboutUs from "./components/about-us";
import Amenidades from "./components/amenidades";
import Hero from "./components/hero";
import Modelos from "./components/modelos";
import PlanoConjunto from "./components/plano-conjunto";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <PlanoConjunto />
      <Amenidades />
      <Modelos />
    </>
  );
}
