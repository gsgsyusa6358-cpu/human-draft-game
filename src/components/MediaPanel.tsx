"use client";

import { useEffect, useMemo, useState } from "react";

type MediaKind = "webm" | "mp4" | "gif";

type Props = {
  webmPath?: string;
  mp4Path?: string;
  gifPath?: string;
  title?: string;
  fallbackIcon: string;
  fallbackLabel: string;
  className?: string;
};

export function MediaPanel({ webmPath, mp4Path, gifPath, title, fallbackIcon, fallbackLabel, className = "" }: Props) {
  const mediaQueue = useMemo(
    () =>
      [
        webmPath ? ({ kind: "webm", path: webmPath, type: "video/webm" } as const) : null,
        mp4Path ? ({ kind: "mp4", path: mp4Path, type: "video/mp4" } as const) : null,
        gifPath ? ({ kind: "gif", path: gifPath, type: "image/gif" } as const) : null
      ].filter(Boolean) as { kind: MediaKind; path: string; type: string }[],
    [gifPath, mp4Path, webmPath]
  );
  const [mediaIndex, setMediaIndex] = useState(0);

  useEffect(() => {
    setMediaIndex(0);
  }, [gifPath, mp4Path, webmPath]);

  const currentMedia = mediaQueue[mediaIndex];
  const showFallback = !currentMedia;
  const handleMediaError = () => setMediaIndex((index) => index + 1);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white bg-slate-950 shadow-card ${className}`}
      aria-label={title ?? fallbackLabel}
    >
      {currentMedia?.kind === "gif" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={currentMedia.path} alt={title ?? fallbackLabel} onError={handleMediaError} className="h-full w-full object-cover" />
      )}
      {currentMedia && currentMedia.kind !== "gif" && (
        <video
          key={currentMedia.path}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={handleMediaError}
          aria-label={title ?? fallbackLabel}
        >
          <source src={currentMedia.path} type={currentMedia.type} />
        </video>
      )}
      {showFallback && (
        <div className="flex h-full min-h-full w-full items-center justify-center bg-gradient-to-br from-slate-950 via-blue-900 to-violet-800 p-5 text-white">
          <div className="absolute inset-0 opacity-35">
            <div className="absolute left-5 top-5 h-16 w-16 rounded-full border border-white/30" />
            <div className="absolute bottom-6 right-8 h-24 w-24 rounded-full border border-white/20" />
            <div className="absolute left-1/3 top-1/2 h-12 w-32 -rotate-12 rounded-full bg-white/10" />
          </div>
          <div className="relative text-center">
            <div className="text-5xl drop-shadow-sm">{fallbackIcon}</div>
            <p className="mt-3 text-sm font-black tracking-normal text-white/90">{fallbackLabel}</p>
          </div>
        </div>
      )}
      {title && <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black text-slate-900 shadow-sm">{title}</div>}
    </div>
  );
}
