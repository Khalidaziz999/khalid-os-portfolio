import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";

import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

// ========================================
// VALIDATION SCHEMA
// ========================================

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(100, "Name is too long."),

  email: z
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long."),

  message: z
    .string()
    .trim()
    .min(10, "Message must contain at least 10 characters.")
    .max(5000, "Message is too long."),
});

// ========================================
// EMAILJS CONFIGURATION
// ========================================

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ========================================
// COMPONENT
// ========================================

export default function ContactForm() {
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      name: "",
      email: "",
      message: "",
    },

    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  // ========================================
  // SEND MESSAGE
  // ========================================

  const onSubmit = async (data) => {
    setStatus({ type: "", message: "" });

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({
        type: "error",
        message:
          "Contact service is unavailable. Please contact me by email.",
      });

      return;
    }

    try {
      const now = new Date();

      const templateParams = {
        from_name: data.name.trim(),
        reply_to: data.email.trim(),
        subject: `Portfolio Contact from ${data.name.trim()}`,
        message: data.message.trim(),
        timestamp: now.toLocaleString("en-US"),
        year: String(now.getFullYear()),
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        {
          publicKey: PUBLIC_KEY,
        }
      );

      if (response.status !== 200) {
        throw new Error("Email service did not confirm delivery.");
      }

      setStatus({
        type: "success",
        message:
          "Message sent successfully! I'll get back to you soon.",
      });

      reset();
    } catch (error) {
      console.error("EmailJS sending failed:", {
        status: error?.status,
        details: error?.text || error?.message,
      });

      setStatus({
        type: "error",
        message:
          "Unable to send your message right now. Please try again or contact me directly by email.",
      });
    }
  };

  // ========================================
  // INPUT STYLES
  // ========================================

  const inputClasses = `
    w-full
    rounded-xl
    border border-white/10
    bg-[#0a1025]
    px-4 py-4
    text-white
    outline-none
    transition
    placeholder:text-gray-400
    focus:border-cyan-400
    focus-visible:ring-2
    focus-visible:ring-cyan-400/30
  `;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Portfolio contact form"
      className="
        space-y-6
        rounded-3xl
        border border-white/10
        bg-white/5
        p-7
        backdrop-blur-xl
        md:p-9
      "
    >
      {/* =====================================
          NAME
      ===================================== */}

      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block text-sm text-gray-200"
        >
          Your Name
        </label>

        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={
            errors.name ? "contact-name-error" : undefined
          }
          {...register("name")}
          className={inputClasses}
        />

        {errors.name && (
          <p
            id="contact-name-error"
            className="mt-2 text-sm text-red-400"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* =====================================
          EMAIL
      ===================================== */}

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block text-sm text-gray-200"
        >
          Email Address
        </label>

        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="john@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? "contact-email-error" : undefined
          }
          {...register("email")}
          className={inputClasses}
        />

        {errors.email && (
          <p
            id="contact-email-error"
            className="mt-2 text-sm text-red-400"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* =====================================
          MESSAGE
      ===================================== */}

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm text-gray-200"
        >
          Your Message
        </label>

        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell me about your project or opportunity..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          {...register("message")}
          className={`${inputClasses} resize-y`}
        />

        {errors.message && (
          <p
            id="contact-message-error"
            className="mt-2 text-sm text-red-400"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* =====================================
          SUBMIT BUTTON
      ===================================== */}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="
          flex w-full
          items-center justify-center gap-3
          rounded-xl
          bg-cyan-400
          px-6 py-4
          font-bold text-[#050816]
          transition
          hover:bg-cyan-300
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isSubmitting ? (
          <>
            <Loader2
              size={18}
              aria-hidden="true"
              className="animate-spin"
            />
            Sending Message...
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" />
            Send Message
          </>
        )}
      </button>

      {/* =====================================
          STATUS MESSAGE
      ===================================== */}

      {status.message && (
        <div
          role={status.type === "error" ? "alert" : "status"}
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${status.type === "success"
            ? "border-green-400/20 bg-green-400/10 text-green-400"
            : "border-red-400/20 bg-red-400/10 text-red-400"
            }`}
        >
          {status.type === "success" ? (
            <CheckCircle2
              size={18}
              aria-hidden="true"
              className="shrink-0"
            />
          ) : (
            <AlertCircle
              size={18}
              aria-hidden="true"
              className="shrink-0"
            />
          )}

          <span>{status.message}</span>
        </div>
      )}

      {/* DIRECT EMAIL FALLBACK */}
      <p className="text-center text-xs text-gray-400">
        Prefer email? Reach me directly at{" "}
        <a
          href="mailto:khalidaziz070071@gmail.com"
          className="break-all text-cyan-400 underline-offset-4 hover:underline"
        >
          khalidaziz070071@gmail.com
        </a>
      </p>
    </form>
  );
}