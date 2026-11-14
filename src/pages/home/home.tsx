import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { track } from "@/lib/track";
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
import { FICHAS_ACTIVAS, FORMULARIOS_ACTIVOS } from "@/lib/leads";
import FolletoForm from "@/components/popup/folleto-form";
import XperienceForm from "@/components/popup/xperience-form/xperience-form";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const modeloId = params.get("modelo");
  const modelo = modelos.find((m) => m.id === modeloId);

  const activeForm = params.get("form");

  const cerrarTodo = () => setParams({}, { replace: true });
  const cerrarForm = () =>
    setParams(
      (p) => {
        const n = new URLSearchParams(p);
        n.delete("form");
        return n;
      },
      { replace: true },
    );

  // Evento al abrir el popup de un modelo
  useEffect(() => {
    if (modelo) track("ver_modelo", { modelo: modelo.numero });
  }, [modelo]);

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
          onClose={cerrarTodo}
        />
      )}
      {FORMULARIOS_ACTIVOS && activeForm === "xperience" && (
        <XperienceForm onClose={cerrarTodo} />
      )}
      {FORMULARIOS_ACTIVOS && activeForm === "folleto" && (
        <FolletoForm modo="folleto" onClose={cerrarTodo} />
      )}
      {/* Ficha: se abre sobre el popup del modelo; al cerrar vuelve al modelo */}
      {FICHAS_ACTIVAS && activeForm === "ficha" && modelo && (
        <FolletoForm modo="ficha" modelo={modelo} onClose={cerrarForm} />
      )}
    </>
  );
}