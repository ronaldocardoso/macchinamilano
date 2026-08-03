"use client";

import { useEffect, useRef, useState } from "react";

import { HeartIcon } from "@/components/icons";
import { VehicleVisual } from "@/components/vehicle-visual";
import type { Vehicle } from "@/lib/vehicles";

type VehicleGalleryProps = {
  vehicle: Vehicle;
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={direction === "left" ? "m15 18-6-6 6-6" : "m9 6 6 6-6 6"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function VehicleGallery({ vehicle }: VehicleGalleryProps) {
  const images = vehicle.imageUrls ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const imageCount = images.length;

  const selectPrevious = () => {
    setActiveIndex((current) =>
      imageCount === 0 ? 0 : (current - 1 + imageCount) % imageCount,
    );
  };

  const selectNext = () => {
    setActiveIndex((current) =>
      imageCount === 0 ? 0 : (current + 1) % imageCount,
    );
  };

  useEffect(() => {
    const strip = stripRef.current;
    const thumbnail = thumbnailRefs.current[activeIndex];

    if (!strip || !thumbnail) {
      return;
    }

    strip.scrollTo({
      behavior: "smooth",
      left:
        thumbnail.offsetLeft -
        strip.clientWidth / 2 +
        thumbnail.clientWidth / 2,
    });
  }, [activeIndex]);

  useEffect(() => {
    if (!zoomOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setZoomOpen(false);
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + imageCount) % imageCount);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % imageCount);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageCount, zoomOpen]);

  if (imageCount === 0) {
    return (
      <div className="detail-gallery">
        <VehicleVisual vehicle={vehicle} />
        <button
          aria-label="Salva nei preferiti"
          className="detail-save"
          type="button"
        >
          <HeartIcon />
        </button>
      </div>
    );
  }

  const activeImage = images[activeIndex];
  const vehicleName = `${vehicle.brand} ${vehicle.model}`;

  return (
    <div className="detail-gallery">
      <button
        aria-label={`Ingrandisci la foto ${activeIndex + 1} di ${imageCount} di ${vehicleName}`}
        className="gallery-main"
        onClick={() => setZoomOpen(true)}
        type="button"
      >
        <VehicleVisual imageUrl={activeImage} priority vehicle={vehicle} />
        <span className="gallery-zoom-hint">
          <ExpandIcon />
          Ingrandisci
        </span>
      </button>

      <button
        aria-label="Salva nei preferiti"
        className="detail-save"
        type="button"
      >
        <HeartIcon />
      </button>

      {imageCount > 1 && (
        <>
          <button
            aria-label="Foto precedente"
            className="gallery-control gallery-control--previous"
            onClick={selectPrevious}
            type="button"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            aria-label="Foto successiva"
            className="gallery-control gallery-control--next"
            onClick={selectNext}
            type="button"
          >
            <ChevronIcon direction="right" />
          </button>
        </>
      )}

      <div
        aria-label={`Galleria fotografica di ${vehicleName}`}
        className="gallery-thumbs"
        ref={stripRef}
        role="group"
      >
        {images.map((imageUrl, index) => (
          <button
            aria-current={index === activeIndex ? "true" : undefined}
            aria-label={`Mostra foto ${index + 1} di ${imageCount}`}
            className={index === activeIndex ? "is-active" : ""}
            key={`${imageUrl}-${index}`}
            onClick={() => setActiveIndex(index)}
            ref={(element) => {
              thumbnailRefs.current[index] = element;
            }}
            type="button"
          >
            <VehicleVisual compact imageUrl={imageUrl} vehicle={vehicle} />
          </button>
        ))}
      </div>

      {zoomOpen && (
        <div
          aria-label={`Foto ingrandita di ${vehicleName}`}
          aria-modal="true"
          className="gallery-lightbox"
          onClick={() => setZoomOpen(false)}
          role="dialog"
        >
          <button
            aria-label="Chiudi la galleria"
            className="gallery-lightbox__close"
            onClick={() => setZoomOpen(false)}
            type="button"
          >
            <CloseIcon />
          </button>

          <span className="gallery-lightbox__count">
            {activeIndex + 1} / {imageCount}
          </span>

          {imageCount > 1 && (
            <>
              <button
                aria-label="Foto precedente"
                className="gallery-lightbox__control gallery-lightbox__control--previous"
                onClick={(event) => {
                  event.stopPropagation();
                  selectPrevious();
                }}
                type="button"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                aria-label="Foto successiva"
                className="gallery-lightbox__control gallery-lightbox__control--next"
                onClick={(event) => {
                  event.stopPropagation();
                  selectNext();
                }}
                type="button"
              >
                <ChevronIcon direction="right" />
              </button>
            </>
          )}

          {/* The source images come from the imported vehicle listing. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={`${vehicleName}, foto ${activeIndex + 1} di ${imageCount}`}
            decoding="async"
            onClick={(event) => event.stopPropagation()}
            src={activeImage}
          />
        </div>
      )}
    </div>
  );
}
