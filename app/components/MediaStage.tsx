"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { MediaAsset } from "@/data/site-media";

type MediaStageProps = {
  asset: MediaAsset;
  className?: string;
  imageOnly?: boolean;
  priority?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

export function MediaStage({
  asset,
  className = "",
  imageOnly = false,
  priority = false,
}: MediaStageProps) {
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    const video = videoRef.current;
    if (!figure || !video || !asset.video || imageOnly) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = (navigator as NavigatorWithConnection).connection
      ?.saveData;
    if (reduceMotion || saveData) {
      figure.dataset.mediaMode = reduceMotion ? "reduced" : "save-data";
      return;
    }

    let loaded = false;
    const loadVideo = () => {
      if (loaded) return;
      loaded = true;
      video.src = asset.video ?? "";
      video.load();
    };
    const markReady = () => {
      figure.dataset.mediaReady = "true";
    };

    video.addEventListener("canplay", markReady);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadVideo();
          void video.play().catch(() => {
            figure.dataset.mediaMode = "poster";
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "28% 0px", threshold: 0.12 },
    );
    observer.observe(figure);

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", markReady);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [asset.video, imageOnly]);

  return (
    <figure
      className={`media-stage media-stage--${asset.variant} ${className}`.trim()}
      ref={figureRef}
    >
      <div className="media-stage__plane">
        <Image
          alt={asset.alt}
          className="media-stage__poster"
          fill
          priority={priority}
          sizes="(max-width: 760px) 100vw, (max-width: 1200px) 82vw, 58vw"
          src={asset.poster}
          unoptimized
        />
        {asset.video && !imageOnly ? (
          <video
            aria-hidden="true"
            className="media-stage__video"
            loop
            muted
            playsInline
            poster={asset.poster}
            preload="none"
            ref={videoRef}
          />
        ) : null}
        <div className="media-stage__grade" aria-hidden="true" />
        <div className="media-stage__scan" aria-hidden="true" />
        <div className="media-stage__mesh" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
        <div className="media-stage__reticle" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="media-stage__hud">
        <span>{asset.eyebrow}</span>
        <span>16:9 / OPTICAL LAYER</span>
      </div>
      <figcaption>
        <div>
          <strong>{asset.caption}</strong>
          <p>{asset.explanation}</p>
        </div>
        <small>{asset.credit}</small>
      </figcaption>
    </figure>
  );
}
