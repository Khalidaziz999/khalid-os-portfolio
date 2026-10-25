import { ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#030712] px-6 py-10">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

        {/* Brand */}
        <div className="text-center md:text-left">

          <a
            href="#home"
            className="text-2xl font-extrabold tracking-wider text-white"
          >
            KHALID<span className="text-cyan-400">.OS</span>
          </a>

          <p className="mt-2 text-sm text-gray-500">
            Beyond The Network.
          </p>

        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-500">
          © {year} Khalid Aziz. Built with React{" "}
          <Heart size={14} className="inline text-cyan-400" />
        </p>

        {/* Back to Top */}
        <a
          href="#home"
          className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:border-cyan-400 hover:text-cyan-400"
        >
          Back to Top
          <ArrowUp size={17} />
        </a>

      </div>

    </footer>
  );
}