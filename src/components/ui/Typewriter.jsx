import { useEffect, useState } from "react";

export default function Typewriter({
  texts = [],
  speed = 80,
  deleteSpeed = 40,
  pause = 1800,
  className = "",
}) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const current = texts[index % texts.length];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplay(current.slice(0, display.length + 1));
          if (display.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          setDisplay(current.slice(0, display.length - 1));
          if (display.length - 1 === 0) {
            setIsDeleting(false);
            setIndex((i) => i + 1);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [display, isDeleting, index, texts, speed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {display}
      <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-cyan-400 align-middle" />
    </span>
  );
}