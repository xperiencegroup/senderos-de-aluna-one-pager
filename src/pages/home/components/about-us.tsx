import nuestraHistoriaImage from "@/assets/images/nuestra-historia.jpg";
import conoceProyectoImage from "@/assets/images/conoce-proyecto.jpg";

export default function AboutUs() {
  return (
    <section>
      {/* historia */}
      <div className="flex gap-[40px] bg-impulso">
        <div className="relative shrink-0 w-full min-h-[50svh] max-xl:max-w-[712px] max-w-[55vw] rounded-br-[200px] overflow-hidden">
          <img
            src={nuestraHistoriaImage}
            alt="Familia jugando futbol"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-[24px] w-full min-h-[50svh] py-[34px] pr-[30px]">
          <h2 className="hero-2 font-bold italic text-beige">
            Nuestra Historia
          </h2>
          <p className="w-full max-w-[528px] text-beige">
            Un camino hacia la independencia, hacia la estabilidad, hacia un
            patrimonio propio y hacia una vida construida en comunidad.
            <br /> <br />
            <span className="font-semibold italic">Senderos de ALUNA </span>
            nace como el segundo proyecto de{" "}
            <span className="font-semibold italic">ALUNA</span>, una marca que
            continúa creciendo y desarrollando nuevos espacios para vivir,
            construir patrimonio y formar comunidad.
            <br />
            <br />
            Porque cada proyecto tiene su propio camino, y cada hogar, una nueva
            historia por contar.
          </p>
        </div>
      </div>

      {/* conoce el proyecto */}
      <div className="flex gap-[40px] bg-beige">
        <div className="flex flex-col justify-center items-end w-full min-h-[50svh] py-[34px] pl-[30px]">
          <div className="flex flex-col gap-[24px]">
            <h2 className="hero-2 text-left font-bold italic text-impulso">
              Conoce el proyecto
            </h2>
            <p className="w-full max-w-[528px] text-origen">
              <span className="font-semibold italic">Senderos de ALUNA </span>
              es un condominio cerrado en Villa Nueva, conformado por{" "}
              <span className="font-semibold italic">209 casas </span>
              y diseñado para ofrecer seguridad, comodidad y espacios para
              disfrutar en familia.
              <br />
              <br />
              Cuenta con garita de acceso, seguridad 24/7 y amenidades como
              salón social, cancha polideportiva, área de mascotas, juegos
              infantiles y churrasqueras.
              <br />
              <br />
              <span className="font-semibold italic">
                Descubre nuestros 4 modelos y encuentra el ideal para tu
                familia.
              </span>
            </p>
          </div>
        </div>

        {/* image */}
        <div className="relative shrink-0 w-full min-h-[50svh] max-xl:max-w-[712px] max-w-[55vw] rounded-tl-[200px] overflow-hidden">
          <img
            src={conoceProyectoImage}
            alt="Familia jugando futbol"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
