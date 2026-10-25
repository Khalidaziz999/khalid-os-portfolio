import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    let rafId;

    const handleMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.opacity = "1";
      ring.style.opacity = "1";

      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;

      const target = event.target;

      const interactive =
        target instanceof Element &&
        target.closest(
          "a, button, input, textarea, select, [role='button']"
        );

      if (interactive) {
        ring.style.width = "60px";
        ring.style.height = "60px";
        ring.style.borderColor = "#EC4899";
        ring.style.backgroundColor = "rgba(236,72,153,0.08)";
      } else {
        ring.style.width = "40px";
        ring.style.height = "40px";
        ring.style.borderColor = "rgba(0,229,255,0.7)";
        ring.style.backgroundColor = "rgba(0,229,255,0.04)";
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      const width = parseFloat(ring.style.width) || 40;
      const height = parseFloat(ring.style.height) || 40;

      ring.style.transform = `translate3d(${ringX - width / 2}px, ${ringY - height / 2}px, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    document.body.classList.add("custom-cursor-active");

    window.addEventListener("mousemove", handleMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-cyan-400 opacity-0"
      />

      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-cyan-400/70 opacity-0 transition-[width,height,border-color,background-color] duration-200"
      />
    </>
  );
}