import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
  ReactNode,
  SVGProps,
} from "react";

type BaseProps = {
  children: ReactNode;
  /** Componente de icono (SVGR con currentColor). Opcional. */
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Posición del icono respecto al texto. Default: "start" */
  iconPosition?: "start" | "end";
  /**
   * Clases de color en reposo (borde, texto, anillo de foco).
   * Escríbelas completas para que Tailwind las detecte.
   */
  base?: string;
  /** Clases de color al presionar (usa el prefijo active:) */
  pressed?: string;
  /** Marca el botón como página/sección actual (aria-current) */
  current?: boolean;
  /** Clases de color cuando `current` es true */
  currentClass?: string;
  /** Clases de layout (ancho, self-start, etc.) */
  className?: string;
};

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type PillButtonProps = ButtonProps | AnchorProps;

// Valores por defecto (verde "proposito")
const DEFAULT_BASE =
  "border-proposito text-proposito focus-visible:ring-proposito";
const DEFAULT_PRESSED =
  "active:bg-proposito active:text-horizonte active:border-horizonte";
const DEFAULT_CURRENT = "bg-proposito text-horizonte border-horizonte";

export default function PillButton(props: PillButtonProps) {
  const {
    children,
    Icon,
    iconPosition = "start",
    base = DEFAULT_BASE,
    pressed = DEFAULT_PRESSED,
    current = false,
    currentClass = DEFAULT_CURRENT,
    className = "",
    ...rest
  } = props;

  const classes = `group inline-flex items-center justify-center gap-[10px] cursor-pointer
    rounded-[30px] border-2 px-[20px] py-[10px] button font-medium drop-shadow
    transition-colors duration-200
    hover:opacity-65 active:opacity-100
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    focus-visible:ring-offset-proposito-4
    disabled:pointer-events-none disabled:opacity-50
    ${current ? currentClass : `${base} ${pressed}`} ${className}`;

  // El icono usa currentColor, así que hereda el color del texto
  // en reposo, hover, active y current sin clases extra.
  const icon = Icon ? (
    <Icon aria-hidden="true" className="size-[20px] shrink-0" />
  ) : null;

  const content = (
    <>
      {iconPosition === "start" && icon}
      {children}
      {iconPosition === "end" && icon}
    </>
  );

  const ariaCurrent = current ? ("page" as const) : undefined;

  if (rest.href !== undefined) {
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        aria-current={ariaCurrent}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      aria-current={ariaCurrent}
      className={classes}
    >
      {content}
    </button>
  );
}
