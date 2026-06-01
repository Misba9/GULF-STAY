import { useRef, useEffect, useState, useCallback } from 'react';

const HERO_VIDEOS = [
  'https://assets.mixkit.co/videos/preview/mixkit-dubai-cityscape-at-night-4444-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4',
];

const POSTER =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1920';

export function HeroVideoBackground() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const playVideo = useCallback(async (el: HTMLVideoElement | null) => {
    if (!el) return;
    try {
      await el.play();
    } catch {
      /* autoplay blocked */
    }
  }, []);

  useEffect(() => {
    const el = activeIndex === 0 ? videoARef.current : videoBRef.current;
    playVideo(el);
  }, [activeIndex, playVideo]);

  useEffect(() => {
    playVideo(videoARef.current);
  }, [playVideo]);

  const handleEnded = useCallback(() => {
    const next = activeIndex === 0 ? 1 : 0;
    const nextEl = next === 0 ? videoARef.current : videoBRef.current;
    if (nextEl) {
      nextEl.currentTime = 0;
      playVideo(nextEl);
    }
    setActiveIndex(next);
  }, [activeIndex, playVideo]);

  const videoClass = (index: number) =>
    `hero-video-layer hero-video-ken-burns ${index === 1 ? 'hero-video-ken-burns-alt' : ''} ${
      activeIndex === index ? 'hero-video-active' : 'hero-video-idle'
    }`;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER})` }}
      />

      <video
        ref={videoARef}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={POSTER}
        onCanPlay={() => setIsReady(true)}
        onEnded={activeIndex === 0 ? handleEnded : undefined}
        className={videoClass(0)}
      >
        <source src={HERO_VIDEOS[0]} type="video/mp4" />
      </video>

      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        poster={POSTER}
        onEnded={activeIndex === 1 ? handleEnded : undefined}
        className={videoClass(1)}
      >
        <source src={HERO_VIDEOS[1]} type="video/mp4" />
      </video>

      <div
        className={`absolute inset-0 bg-black/45 z-[3] transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-70'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-luxury-black z-[3]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-[3]" />
      <div className="hero-video-vignette absolute inset-0 z-[3] pointer-events-none" />
      <div className="hero-video-shimmer absolute inset-0 z-[3] pointer-events-none" />
    </div>
  );
}
