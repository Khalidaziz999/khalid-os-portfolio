import { motion } from "motion/react";
import AuroraBackground from "../../ui/AuroraBackground";

import {
  Mail,
  MapPin,
  Link,
  Code2,
  Phone,
} from "lucide-react";

import ContactForm from "./ContactForm";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "khalidaziz070071@gmail.com",
    href: "mailto:khalidaziz070071@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+212 700716931",
    href: "tel:+212700716931",
  },
  {
    icon: Link,
    label: "LinkedIn",
    value: "Khalid Aziz",
    href: "https://www.linkedin.com/in/khalid-aziz-a10762353",
  },
  {
    icon: Code2,
    label: "GitHub",
    value: "Khalidaziz999",
    href: "https://github.com/Khalidaziz999",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#050816] px-6 py-28"
    >
      <AuroraBackground intensity="low" />

      {/* Glow */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm tracking-[0.3em] text-cyan-400">
            07 / ESTABLISH CONNECTION
          </p>

          <h2 className="text-4xl font-extrabold text-white md:text-6xl">
            LET'S{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              CONNECT
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            Interested in collaborating on cybersecurity,
            cloud infrastructure or networking projects?
            Let's build something secure together.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid items-start gap-10 lg:grid-cols-2">

          {/* Left */}
          <div>
            <h3 className="mb-8 text-2xl font-bold text-white">
              Contact Information
            </h3>

            <div className="space-y-4">

              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-xs text-gray-500">
                        {item.label}
                      </p>

                      <p className="break-all font-medium text-white transition group-hover:text-cyan-400">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}

            </div>

            {/* Location */}
            <div className="mt-6 flex items-center gap-3 text-gray-400">
              <MapPin size={20} className="text-cyan-400" />
              El Kelaâ des Sraghna, Marrakech-Safi, Morocco
            </div>

          </div>

          {/* Right */}
          <div>
            <h3 className="mb-8 text-2xl font-bold text-white">
              Send a Message
            </h3>

            <ContactForm />
          </div>

        </div>

      </div>
    </section>
  );
}