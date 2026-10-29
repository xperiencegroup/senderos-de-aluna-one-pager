import { useSearchParams } from "react-router";
import AboutUs from "./components/about-us";
import Amenidades from "./components/amenidades";
import CotizaTuCasa from "./components/cotiza-tu-casa";
import ExploraCX from "./components/explora-cx";
import FHA from "./components/fha";
import Hero from "./components/hero";
import Modelos from "./components/modelos";
import PlanoConjunto from "./components/plano-conjunto";
import Ubicacion from "./components/ubicacion";
import { modelos } from "@/data/modelos";
import ModelPopup from "@/components/popup/model-popup";
import XperienceForm from "@/components/popup/xperience-form/xperience-form";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const modeloId = params.get("modelo");
  const modelo = modelos.find((m) => m.id === modeloId);

  const formXperience = params.get("form");

  return (
    <>
      <Hero />
      <AboutUs />
      <PlanoConjunto />
      <Amenidades />
      <Modelos />
      <ExploraCX />
      <CotizaTuCasa />
      <Ubicacion />
      <FHA />

      {modelo && (
        <ModelPopup
          modelo={modelo}
          onClose={() => setParams({}, { replace: true })}
        />
      )}

      {formXperience && (
        <XperienceForm onClose={() => setParams({}, { replace: true })} />
      )}
    </>
  );
}
