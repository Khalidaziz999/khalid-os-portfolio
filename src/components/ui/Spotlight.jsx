import { useEffect, useRef } from "react";

export default function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(0,229,255,0.10), transparent 60%)",
      }}
    />
  );
}