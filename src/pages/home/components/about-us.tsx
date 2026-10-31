import nuestraHistoriaImage from "@/assets/images/nuestra-historia.jpg";
import conoceProyectoImage from "@/assets/images/conoce-proyecto.jpg";

// Bloque de texto: centrado en su columna, texto alineado a la izquierda
const textBlock =
  "flex flex-col gap-[24px] w-full max-w-[528px] min-[1440px]:max-w-[620px] min-[1920px]:max-w-[700px] text-left";

export default function AboutUs() {
  return (
    <section id="nosotros">
      {/* historia */}
      <div className="flex gap-[40px] bg-impulso max-lg:flex-col max-lg:gap-0">
        <div className="relative shrink-0 w-full min-h-[50svh] max-xl:max-w-[712px] max-w-[55vw] rounded-br-[200px] overflow-hidden max-lg:max-w-none max-lg:min-h-0 max-lg:h-[300px] md:max-lg:h-[420px] max-lg:rounded-br-[120px]">
          <img
            src={nuestraHistoriaImage}
            alt="Familia jugando futbol"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full min-h-[50svh] py-[34px] px-[30px] max-lg:min-h-0 max-lg:px-[20px] max-lg:py-[48px] md:max-lg:px-[48px]">
          <div className={textBlock}>
            <h2 className="hero-2 max-md:text-[30px] text-beige">
              <span className="font-semibold">Nuestra</span>{" "}
              <span className="font-bold italic">Historia</span>
            </h2>
            <p className="regular text-beige">
              Un camino hacia la independencia, hacia la estabilidad, hacia un
              patrimonio propio y hacia una vida construida en comunidad.
              <br />
              <br />
              <span className="font-semibold italic">Senderos de ALUNA </span>
              nace como el segundo proyecto de{" "}
              <span className="font-semibold italic">ALUNA</span>, una marca
              que continúa creciendo y desarrollando nuevos espacios para
              vivir, construir patrimonio y formar comunidad.
              <br />
              <br />
              Porque cada proyecto tiene su propio camino, y cada hogar, una
              nueva historia por contar.
            </p>
          </div>
        </div>
      </div>

      {/* conoce el proyecto */}
      <div className="flex gap-[40px] bg-beige max-lg:flex-col-reverse max-lg:gap-0">
        <div className="flex flex-col justify-center items-center w-full min-h-[50svh] py-[34px] px-[30px] max-lg:min-h-0 max-lg:px-[20px] max-lg:py-[48px] md:max-lg:px-[48px]">
          <div className={textBlock}>
            <h2 className="hero-2 max-md:text-[30px] text-impulso">
              <span className="font-semibold">Conoce</span>{" "}
              <span className="font-bold italic">el Proyecto</span>
            </h2>
            <p className="regular text-origen">
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
        <div className="relative shrink-0 w-full min-h-[50svh] max-xl:max-w-[712px] max-w-[55vw] rounded-tl-[200px] overflow-hidden max-lg:max-w-none max-lg:min-h-0 max-lg:h-[300px] md:max-lg:h-[420px] max-lg:rounded-tl-[120px]">
          <img
            src={conoceProyectoImage}
            alt="Sala de una casa en Senderos de Aluna"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}