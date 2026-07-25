import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  light?: boolean;
};

export function BrandMark({ light = false }: BrandMarkProps) {
  return (
    <Link
      aria-label="Macchina Milano, pagina iniziale"
      className="brand-mark"
      href="/"
    >
      <Image
        alt="Macchina Milano"
        className="brand-mark__image"
        height={52}
        priority
        src={
          light
            ? "/brand/logo-horizontal-white.png"
            : "/brand/logo-horizontal.png"
        }
        width={294}
      />
    </Link>
  );
}
