import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
};

export function ArrowIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <path d="M20.5 9.4c0 5-8.5 9.6-8.5 9.6S3.5 14.4 3.5 9.4A4.4 4.4 0 0 1 12 7.9a4.4 4.4 0 0 1 8.5 1.5Z" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <path d="M8 4 5.7 5.2c-1.5.8.7 6.1 3.7 9.1s8.3 5.2 9.1 3.7l1.2-2.3-4.2-2-1.2 1.5c-.8.9-2.4-.1-3.8-1.5S8.1 10.7 9 9.9l1.3-1.3L8 4Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <path d="m5 12 4.2 4L19 6.5" />
    </svg>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <path d="m4.5 10 1.8-4h11.4l1.8 4M3 11.5c0-1 .8-1.5 1.8-1.5h14.4c1 0 1.8.5 1.8 1.5V17H3v-5.5Z" />
      <path d="M6 17v2M18 17v2M6.5 13h.01M17.5 13h.01" />
    </svg>
  );
}
