// íconos en componentes
import ClickIcon from "@/assets/icons/components/click-icon";
import WarehouseIcon from "@/assets/icons/components/warehouse-icon";
import MathIcon from "@/assets/icons/components/math-icon";
import PinIcon from "@/assets/icons/components/pin-icon";
import PeopleIcon from "@/assets/icons/components/people-icon";
import CallIcon from "@/assets/icons/components/call-icon";

// footer icons
import phoneIcon from "@/assets/icons/footer/phone-button.svg";
import mailIcon from "@/assets/icons/footer/mail-button.svg";
import pinIcon from "@/assets/icons/footer/logo-button.svg";
import instagramIcon from "@/assets/icons/footer/instagram-button.svg";
import whatsappIcon from "@/assets/icons/footer/whatsapp-button.svg";
import facebookIcon from "@/assets/icons/footer/facebook-button.svg";

// proyecto dropdown icons
import AmenidadesIcon from "@/assets/icons/components/amenidades-icon";
import ModelosIcon from "@/assets/icons/components/modelos-icon";
import PlanoIcon from "@/assets/icons/components/plano-icon";

export const NAV_LINKS = [
  { id: "nosotros", label: "Nosotros", href: "#nosotros", icon: PeopleIcon },
  {
    id: "xperiencia",
    label: "Xperiencia",
    href: "#xperiencia",
    icon: ClickIcon,
  },
  { id: "proyecto", label: "Proyecto", href: "#proyecto", icon: WarehouseIcon },
  {
    id: "cotizador",
    label: "Cotizador",
    href: "#cotizador",
    icon: MathIcon,
  },
  {
    id: "ubicacion",
    label: "Ubicación",
    href: "#ubicacion",
    icon: PinIcon,
  },
];

export const proyectoLinks = [
  { id: "plano", label: "Plano de Conjunto", href: "#plano", icon: PlanoIcon },  
  { id: "amenidades", label: "Amenidades", href: "#amenidades", icon: AmenidadesIcon },
  { id: "modelos", label: "Modelos", href: "#modelos", icon: ModelosIcon },  
];

export const CONTACTO_DATA = {
  id: "contacto",
  label: "Contacto",
  href: "#contacto",
  icon: CallIcon,
};

export const CONTACTO_INFO = [
  {
    title: "Llámanos",
    description: "+502 3025 6073",
    icon: phoneIcon,
    href: "tel:+50230256073",
  },
  {
    title: "Escríbenos",
    description: "alunamr2@gmail.com",
    icon: mailIcon,
    href: "mailto:alunamr2@gmail.com",
  },
  {
    title: "Dirección",
    description: "Aluna Residencial",
    icon: pinIcon,
    href: "https://maps.app.goo.gl/vop6Jp3xs2ucKQAv9",
  },
];

export const SOCIAL_LINKS = [
  {
    title: "Instagram",
    icon: instagramIcon,
    href: "https://www.instagram.com/viveenaluna/",
  },
  {
    title: "WhatsApp",
    icon: whatsappIcon,
    href: "https://wa.me/50230256073",
  },
  {
    title: "Facebook",
    icon: facebookIcon,
    href: "https://www.facebook.com/viveenaluna",
  },
];
