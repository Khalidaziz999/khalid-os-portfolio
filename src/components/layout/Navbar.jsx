import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Escape: close menu and restore focus
  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  // Focus the first menu link when opening
  useEffect(() => {
    if (!menuOpen) return;

    const frame = requestAnimationFrame(() => {
      firstLinkRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [menuOpen]);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"
      >
        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-extrabold tracking-wider text-white"
        >
          KHALID<span className="text-cyan-400">.OS</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition hover:text-cyan-400"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {/* System Status */}
          <div className="hidden items-center gap-2 text-xs text-green-400 sm:flex">
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full bg-green-400"
            />

            <span>
              SYSTEM ONLINE
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="rounded-lg border border-white/10 p-2 text-white transition hover:border-cyan-400 xl:hidden"
          >
            {menuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-[#050816] xl:hidden"
          >
            <div className="flex max-h-[75vh] flex-col gap-2 overflow-y-auto px-6 py-5">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-cyan-400"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}