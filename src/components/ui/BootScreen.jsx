import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const BOOT_LINES = [
  "INITIALIZING CYBER UNIVERSE...",
  "LOADING NETWORK MODULES...",
  "ESTABLISHING SECURE CONNECTION...",
  "SYSTEM READY",
];

const SESSION_KEY = "khalid-os-boot-seen";

function hasSeenBoot() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markBootSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "true");
  } catch {
    // Storage may be unavailable.
  }
}

export default function BootScreen() {
  const reduceMotion = useReducedMotion();

  const skipButtonRef = useRef(null);
  const dialogRef = useRef(null);

  const [visible, setVisible] = useState(
    () => !hasSeenBoot()
  );

  const [lineCount, setLineCount] = useState(0);

  // =====================================
  // BOOT ANIMATION
  // =====================================

  useEffect(() => {
    if (!visible) return;

    if (reduceMotion) {
      markBootSeen();
      return;
    }

    const timers = BOOT_LINES.map((_, index) =>
      setTimeout(() => {
        setLineCount(index + 1);
      }, 350 + index * 450)
    );

    const finishTimer = setTimeout(() => {
      markBootSeen();
      setVisible(false);
    }, 2800);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [visible, reduceMotion]);

  // =====================================
  // KEYBOARD ACCESSIBILITY
  // =====================================

  useEffect(() => {
    if (!visible || reduceMotion) return;

    const frame = requestAnimationFrame(() => {
      skipButtonRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      // Escape skips the intro
      if (event.key === "Escape") {
        event.preventDefault();
        markBootSeen();
        setVisible(false);
        return;
      }

      // Keep Tab focus inside BootScreen
      if (event.key === "Tab") {
        const button = skipButtonRef.current;

        if (button) {
          event.preventDefault();
          button.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, reduceMotion]);

  // =====================================
  // FOCUS AFTER BOOT
  // =====================================

  useEffect(() => {
    if (visible && !reduceMotion) return;

    const timer = setTimeout(() => {
      const main = document.getElementById("main-content");

      if (main) {
        main.focus({ preventScroll: true });
      }
    }, 650);

    return () => clearTimeout(timer);
  }, [visible, reduceMotion]);

  // =====================================
  // SKIP HANDLER
  // =====================================

  const skipBoot = () => {
    markBootSeen();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && !reduceMotion && (
        <motion.div
          ref={dialogRef}
          key="boot-screen"
          role="dialog"
          aria-modal="true"
          aria-label="KHALID.OS introduction"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
          }}
          className="
            fixed inset-0 z-[10000]
            flex flex-col items-center justify-center
            overflow-hidden
            bg-[#030712]
            px-6
          "
        >
          {/* Background cosmic glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute h-[450px] w-[450px]
              rounded-full bg-cyan-500/10
              blur-[120px]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute right-1/4 top-1/4
              h-[300px] w-[300px]
              rounded-full bg-purple-500/10
              blur-[100px]
            "
          />

          {/* Main content */}

          <div className="relative z-10 w-full max-w-xl">

            {/* Brand */}

            <motion.div
              initial={{
                opacity: reduceMotion ? 1 : 0,
                y: reduceMotion ? 0 : 20,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
              }}
              className="mb-12 text-center"
            >
              <h1
                className="
                  text-5xl font-black
                  tracking-[0.15em]
                  text-white
                  sm:text-7xl
                "
              >
                KHALID
                <span className="text-cyan-400">.OS</span>
              </h1>

              <p
                className="
                  mt-4 text-xs
                  uppercase tracking-[0.4em]
                  text-purple-400
                "
              >
                Beyond The Network
              </p>
            </motion.div>

            {/* Terminal */}

            <div
              className="
                overflow-hidden rounded-2xl
                border border-cyan-500/20
                bg-[#050816]/90
                shadow-[0_0_60px_rgba(0,229,255,0.08)]
                backdrop-blur-xl
              "
            >
              {/* Terminal header */}

              <div
                className="
                  flex items-center gap-2
                  border-b border-white/10
                  bg-white/[0.03]
                  px-5 py-4
                "
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-red-400"
                />

                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-yellow-400"
                />

                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-green-400"
                />

                <span className="ml-3 font-mono text-xs text-gray-400">
                  system_boot.sh
                </span>
              </div>

              {/* Terminal content */}

              <div
                aria-live="off"
                className="
                  min-h-[190px]
                  space-y-4
                  px-5 py-6
                  font-mono text-xs
                  sm:text-sm
                "
              >
                {BOOT_LINES.slice(0, lineCount).map((line, index) => (
                  <motion.div
                    key={line}
                    initial={{
                      opacity: reduceMotion ? 1 : 0,
                      x: reduceMotion ? 0 : -10,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.3,
                    }}
                    className={
                      index === BOOT_LINES.length - 1
                        ? "text-green-400"
                        : "text-cyan-400"
                    }
                  >
                    <span
                      aria-hidden="true"
                      className="mr-3 text-purple-400"
                    >
                      {">"}
                    </span>

                    {line}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress bar */}

            <div
              role="progressbar"
              aria-label="Initializing KHALID.OS"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(
                (lineCount / BOOT_LINES.length) * 100
              )}
              className="mt-8 h-1 overflow-hidden rounded-full bg-white/10"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: reduceMotion ? 0 : 2.7,
                  ease: "linear",
                }}
                className="
                  h-full rounded-full
                  bg-gradient-to-r
                  from-cyan-400
                  via-purple-500
                  to-pink-500
                  shadow-[0_0_15px_rgba(0,229,255,0.6)]
                "
              />
            </div>

            {/* Access status */}

            <p
              className="
                mt-5 text-center
                font-mono text-xs
                uppercase tracking-[0.3em]
                text-green-400
              "
            >
              {lineCount === BOOT_LINES.length
                ? "ACCESS GRANTED"
                : "CONNECTING TO THE UNIVERSE..."}
            </p>

            {/* Skip button */}

            <div className="mt-10 text-center">
              <button
                ref={skipButtonRef}
                type="button"
                onClick={skipBoot}
                className="
                  rounded-lg px-5 py-2
                  text-sm text-gray-300
                  transition-colors
                  hover:text-cyan-400
                  focus-visible:outline-2
                  focus-visible:outline-cyan-400
                "
              >
                Skip Intro →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}