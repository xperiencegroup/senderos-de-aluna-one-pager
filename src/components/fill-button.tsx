import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
  CSSProperties,
  ReactNode,
  SVGProps,
} from "react";

const VARIANTS = {
  default: {
    container:
      "border-impulso bg-beige active:border-beige focus-visible:ring-impulso focus-visible:ring-offset-beige",
    fill: "bg-impulso",
    text: "text-impulso group-hover:text-beige group-active:text-beige",
    icon: "text-impulso group-active:text-beige",
  },
  // Cambia estos colores por los que necesites
  proposito: {
    container:
      "border-proposito bg-beige active:bg-beige active:border-beige focus-visible:ring-white focus-visible:ring-offset-impulso",
    fill: "bg-proposito",
    text: "text-proposito group-hover:text-beige group-active:text-beige",
    icon: "text-proposito group-active:text-beige",
  },
} as const;

type Variant = keyof typeof VARIANTS;

type BaseProps = {
  children: ReactNode;
  /** Componente de icono (SVGR con currentColor). Opcional. */
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /**
   * Distancia en px entre el texto y el icono de la derecha.
   * Se reparte mitad al texto y mitad al icono, y el área del relleno
   * se calcula sola. Default: 40.
   */
  gap?: number;
  /** Clases extra para el contenedor (ej. "self-start", "w-full") */
  className?: string;
  variant?: Variant;
};

/** Sin href → <button>, hereda todas las props de un botón */
type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

/** Con href → <a>, hereda todas las props de un link */
type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type FillButtonProps = ButtonProps | AnchorProps;

const ICON_SIZE = 20; // tamaño del icono
const EDGE = 20; // padding exterior (izquierda del texto, derecha del icono)

export default function FillButton(props: FillButtonProps) {
  const {
    children,
    Icon,
    gap = 40,
    variant = "default",
    className = "",
    style,
    ...rest
  } = props;
  const v = VARIANTS[variant];

  const half = gap / 2;
  // Ancho del bloque del icono = padding izq + icono + padding der.
  // El relleno de hover se detiene justo donde empieza ese bloque.
  const iconArea = Icon ? half + ICON_SIZE + EDGE - 2 : 0;

  const cssVars = {
    "--gap-half": `${half}px`,
    "--icon-area": `${iconArea}px`,
    ...style,
  } as CSSProperties;

  const classes = `group relative inline-flex items-center cursor-pointer overflow-hidden
  rounded-[30px] border-2 drop-shadow transition-colors duration-300
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  disabled:pointer-events-none disabled:opacity-50
  ${v.container} ${className}`;

  const content = (
    <>
      {/* Capa de relleno: crece de izquierda a derecha */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-0 rounded-full ${v.fill}
        transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        group-hover:w-[calc(100%-var(--icon-area))] group-active:w-full
        motion-reduce:transition-none`}
      />

      {/* Texto */}
      <span
        className={`button relative z-10 py-[10px] pl-[20px] font-medium ${v.text}
        transition-colors duration-300 ${Icon ? "pr-[var(--gap-half)]" : "pr-[20px]"}`}
      >
        {children}
      </span>

      {/* Icono (opcional) */}
      {Icon && (
        <span className="relative z-10 pl-[var(--gap-half)] pr-[20px]">
          <Icon
            aria-hidden="true"
            className={`size-[20px] ${v.icon} transition-colors duration-200
            group-active:delay-150`}
          />
        </span>
      )}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={classes}
        style={cssVars}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classes}
      style={cssVars}
    >
      {content}
    </button>
  );
}
