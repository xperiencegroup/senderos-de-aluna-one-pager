// images
// aluna 75
import frontal75 from "@/assets/images/modelos/75/frontal.jpg";
import aluna75_n1 from "@/assets/images/modelos/75/nivel1.png";
import aluna75_n2 from "@/assets/images/modelos/75/nivel2.png";
import aluna75_01 from "@/assets/images/modelos/75/renders/01.jpg";
import aluna75_02 from "@/assets/images/modelos/75/renders/02.jpg";
import aluna75_03 from "@/assets/images/modelos/75/renders/03.jpg";
import aluna75_04 from "@/assets/images/modelos/75/renders/04.jpg";
import aluna75_05 from "@/assets/images/modelos/75/renders/05.jpg";

// aluna 88
import frontal88 from "@/assets/images/modelos/88/frontal.jpg";
import aluna88_n1 from "@/assets/images/modelos/88/nivel1.png";
import aluna88_n2 from "@/assets/images/modelos/88/nivel2.png";
import aluna88_01 from "@/assets/images/modelos/88/renders/01.jpg";
import aluna88_02 from "@/assets/images/modelos/88/renders/02.jpg";
import aluna88_03 from "@/assets/images/modelos/88/renders/03.jpg";
import aluna88_04 from "@/assets/images/modelos/88/renders/04.jpg";
import aluna88_05 from "@/assets/images/modelos/88/renders/05.jpg";

// aluna 96
import frontal96 from "@/assets/images/modelos/96/frontal.jpg";
import aluna96_n1 from "@/assets/images/modelos/96/nivel1.png";
import aluna96_n2 from "@/assets/images/modelos/96/nivel2.png";
import aluna96_01 from "@/assets/images/modelos/96/renders/01.jpg";
import aluna96_02 from "@/assets/images/modelos/96/renders/02.jpg";
import aluna96_03 from "@/assets/images/modelos/96/renders/03.jpg";
import aluna96_04 from "@/assets/images/modelos/96/renders/04.jpg";
import aluna96_05 from "@/assets/images/modelos/96/renders/05.jpg";

// aluna 105
import frontal105 from "@/assets/images/modelos/105/frontal.jpg";
import aluna105_n1 from "@/assets/images/modelos/105/nivel1.png";
import aluna105_n2 from "@/assets/images/modelos/105/nivel2.png";
import aluna105_01 from "@/assets/images/modelos/105/renders/01.jpg";
import aluna105_02 from "@/assets/images/modelos/105/renders/02.jpg";
import aluna105_03 from "@/assets/images/modelos/105/renders/03.jpg";
import aluna105_04 from "@/assets/images/modelos/105/renders/04.jpg";
import aluna105_05 from "@/assets/images/modelos/105/renders/05.jpg";
import aluna105_06 from "@/assets/images/modelos/105/renders/06.jpg";

// icons
import banoIcon from "@/assets/icons/modelo/bano.svg";
import camaIcon from "@/assets/icons/modelo/cama.svg";
import cocheraIcon from "@/assets/icons/modelo/cochera.svg";
import estudioIcon from "@/assets/icons/modelo/estudio.svg";
import jardinIcon from "@/assets/icons/modelo/jardin.svg";
import lavadoraIcon from "@/assets/icons/modelo/lavadora.svg";
import salaIcon from "@/assets/icons/modelo/sala.svg";

type Variant = "green" | "beige";

export type ModeloImage = {
  src: string;
  alt: string;
};

export type Modelo = {
  id: string;
  nombre: string;
  numero: string;
  href: string;
  image: string; // foto frontal (tarjeta)
  variant: Variant;
  description: string;
  images: ModeloImage[]; // renders del carrusel
  planos: {
    nivel1: ModeloImage;
    nivel2: ModeloImage;
  };

  caracteristicas: {
    nivel1: {
      icon: string;
      label: string;
    }[];
    nivel2: {
      icon: string;
      label: string;
    }[];
  };
};

/** Convierte una lista de src en objetos { src, alt } con alt numerado */
const toImages = (numero: string, srcs: string[]): ModeloImage[] =>
  srcs.map((src, i) => ({
    src,
    alt: `Render ${i + 1} del modelo Aluna ${numero}`,
  }));

/** Crea los planos de nivel 1 y 2 con su alt */
const toPlanos = (numero: string, n1: string, n2: string) => ({
  nivel1: { src: n1, alt: `Plano nivel 1 del modelo Aluna ${numero}` },
  nivel2: { src: n2, alt: `Plano nivel 2 del modelo Aluna ${numero}` },
});

export const modelos: Modelo[] = [
  {
    id: "aluna-75",
    nombre: "Aluna",
    numero: "75",
    href: "#modelo-75",
    image: frontal75,
    variant: "green",
    description:
      "El modelo ideal para familias jóvenes o como primera inversión. Maximiza la eficiencia del espacio.",
    images: toImages("75", [
      aluna75_01,
      aluna75_02,
      aluna75_03,
      aluna75_04,
      aluna75_05,
    ]),
    planos: toPlanos("75", aluna75_n1, aluna75_n2),
    caracteristicas: {
      nivel1: [
        { icon: cocheraIcon, label: "2 Parqueos" },
        { icon: salaIcon, label: "Sala - Comedor - Cocina" },
        { icon: banoIcon, label: "Baño Completo" },
        { icon: estudioIcon, label: "Estudio" },
        { icon: lavadoraIcon, label: "Lavandería" },
        { icon: jardinIcon, label: "Pasillo Lateral" },
        { icon: jardinIcon, label: "Jardín" },
      ],
      nivel2: [
        { icon: camaIcon, label: "Dormitorio Principal" },
        { icon: camaIcon, label: "Dormitorio Secundario" },
        { icon: banoIcon, label: "Baño Completo" },
      ],
    },
  },
  {
    id: "aluna-88",
    nombre: "Aluna",
    numero: "88",
    href: "#modelo-88",
    image: frontal88,
    variant: "beige",
    description:
      "Un modelo funcional y versátil, diseñado para aprovechar cada espacio y brindar comodidad en el día a día. Su dormitorio principal cuenta con walk-in clóset y baño privado, ideal para comenzar tu patrimonio o invertir con visión a futuro.",
    images: toImages("88", [
      aluna88_01,
      aluna88_02,
      aluna88_03,
      aluna88_04,
      aluna88_05,
    ]),
    planos: toPlanos("88", aluna88_n1, aluna88_n2),
    caracteristicas: {
      nivel1: [
        { icon: cocheraIcon, label: "2 Parqueos" },
        { icon: salaIcon, label: "Sala - Comedor - Cocina" },
        { icon: banoIcon, label: "Baño Completo" },
        { icon: camaIcon, label: "Dormitorio Secundario" },
        { icon: lavadoraIcon, label: "Lavandería" },
        { icon: jardinIcon, label: "Pasillo Lateral - Jardín" },
      ],
      nivel2: [
        { icon: camaIcon, label: "Dormitorio Principal \ncon Walk-in Closet" },
        { icon: camaIcon, label: "Dormitorio Secundario" },
        { icon: banoIcon, label: "2 Baño Completo" },
      ],
    },
  },
  {
    id: "aluna-96",
    nombre: "Aluna",
    numero: "96",
    href: "#modelo-96",
    image: frontal96,
    variant: "green",
    description:
      "Diseñado para ofrecer comodidad y funcionalidad en cada rincón, con una distribución inteligente que se adapta a tu estilo de vida y a tus planes de inversión.",
    images: toImages("96", [
      aluna96_01,
      aluna96_02,
      aluna96_03,
      aluna96_04,
      aluna96_05,
    ]),
    planos: toPlanos("96", aluna96_n1, aluna96_n2),
    caracteristicas: {
      nivel1: [
        { icon: cocheraIcon, label: "2 Parqueos" },
        { icon: salaIcon, label: "Sala - Comedor - Cocina con Península" },
        { icon: banoIcon, label: "Baño Completo" },
        { icon: estudioIcon, label: "Estudio" },
        { icon: lavadoraIcon, label: "Lavandería" },
        { icon: jardinIcon, label: "Jardín" },
      ],
      nivel2: [
        { icon: camaIcon, label: "Dormitorio Principal" },
        { icon: camaIcon, label: "2 Dormitorios Secundarios" },
        { icon: banoIcon, label: "Baño Completo" },
      ],
    },
  },
  {
    id: "aluna-105",
    nombre: "Aluna",
    numero: "105",
    href: "#modelo-105",
    image: frontal105,
    variant: "beige",
    description:
      "El modelo premium, diseñado para ofrecer el máximo confort y espacio, con un dormitorio o estudio en el primer nivel y tres baños en total.",
    images: toImages("105", [
      aluna105_01,
      aluna105_02,
      aluna105_03,
      aluna105_04,
      aluna105_05,
      aluna105_06,
    ]),
    planos: toPlanos("105", aluna105_n1, aluna105_n2),
    caracteristicas: {
      nivel1: [
        { icon: cocheraIcon, label: "2 Parqueos" },
        { icon: salaIcon, label: "Sala - Comedor - Cocina con Península" },
        { icon: banoIcon, label: "Baño Completo" },
        { icon: camaIcon, label: "Dormitorio Secundario" },
        { icon: lavadoraIcon, label: "Lavandería" },
        { icon: jardinIcon, label: "Jardín" },
      ],
      nivel2: [
        { icon: camaIcon, label: "Dormitorio Principal" },
        { icon: camaIcon, label: "2 Dormitorio Secundarios" },
        { icon: banoIcon, label: "2 Baño Completo" },
      ],
    },
  },
];
