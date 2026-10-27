import type { SVGProps } from "react";

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.31543 8.98846H16.6616M8.98851 16.6615L16.6616 8.98846L8.98851 1.31538"
      strokeWidth={2.63077}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
    />
  </svg>
);
export default ArrowIcon;
