import { useState, type FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const SUBJECT_OPTIONS = [
  { value: "", label: "Select a subject..." },
  { value: "project", label: "Project Inquiry" },
  { value: "collaboration", label: "Collaboration" },
  { value: "freelance", label: "Freelance Work" },
  { value: "other", label: "Other" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClasses =
  "w-full px-4 py-3 font-sans text-[0.9rem] text-text-primary bg-bg-secondary border border-border rounded-[10px] outline-none transition-[border-color,box-shadow] duration-250 ease-in-out focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(45,87,65,0.15)] data-[error]:border-error";

const selectClasses =
  "appearance-none bg-[right_16px_center] bg-no-repeat pr-10";

const selectChevronUrl =
  "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23a3a3a3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [touched, setTouched] = useState<Set<string>>(new Set());

  function validate(data: FormData): FormErrors {
    const errs: FormErrors = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.email.trim()) {
      errs.email = "Email is required";
    } else if (!EMAIL_REGEX.test(data.email)) {
      errs.email = "Enter a valid email";
    }
    if (!data.subject) errs.subject = "Pick a subject";
    if (!data.message.trim()) {
      errs.message = "Message is required";
    } else if (data.message.trim().length < 10) {
      errs.message = "Message is too short";
    }
    return errs;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    if (touched.has(name)) {
      const v = validate(next);
      setErrors((prev) => ({ ...prev, [name]: v[name as keyof FormErrors] }));
    }
  }

  function handleBlur(e: React.FocusEvent) {
    const name = (e.target as HTMLInputElement).name;
    setTouched((prev) => new Set(prev).add(name));
    const v = validate(form);
    setErrors((prev) => ({ ...prev, [name]: v[name as keyof FormErrors] }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    setTouched(new Set(["name", "email", "subject", "message"]));
    if (Object.keys(v).length > 0) return;

    setStatus("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched(new Set());
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <style>{`
        @keyframes cf-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes cf-status-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
        <div className="mb-5">
          <label className="block font-heading text-[0.8rem] font-medium text-text-secondary mb-1.5 tracking-[0.03em]" htmlFor="cf-name">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClasses}
            data-error={errors.name ? "" : undefined}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p id="cf-name-error" role="alert" className="font-mono text-[0.72rem] text-error mt-1 tracking-[0.02em]">{errors.name}</p>}
        </div>

        <div className="mb-5">
          <label className="block font-heading text-[0.8rem] font-medium text-text-secondary mb-1.5 tracking-[0.03em]" htmlFor="cf-email">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClasses}
            data-error={errors.email ? "" : undefined}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p id="cf-email-error" role="alert" className="font-mono text-[0.72rem] text-error mt-1 tracking-[0.02em]">{errors.email}</p>}
        </div>
      </div>

      <div className="mb-5">
        <label className="block font-heading text-[0.8rem] font-medium text-text-secondary mb-1.5 tracking-[0.03em]" htmlFor="cf-subject">
          Subject
        </label>
        <select
          id="cf-subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${fieldClasses} ${selectClasses}`}
          style={{ backgroundImage: selectChevronUrl }}
          data-error={errors.subject ? "" : undefined}
          aria-describedby={errors.subject ? "cf-subject-error" : undefined}
          aria-invalid={!!errors.subject}
        >
          {SUBJECT_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.value === ""}
            >
              {opt.label}
            </option>
          ))}
        </select>
        {errors.subject && <p id="cf-subject-error" role="alert" className="font-mono text-[0.72rem] text-error mt-1 tracking-[0.02em]">{errors.subject}</p>}
      </div>

      <div className="mb-5">
        <label className="block font-heading text-[0.8rem] font-medium text-text-secondary mb-1.5 tracking-[0.03em]" htmlFor="cf-message">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          placeholder="Tell me about your project or idea..."
          rows={5}
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${fieldClasses} resize-y min-h-[120px]`}
          data-error={errors.message ? "" : undefined}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p id="cf-message-error" role="alert" className="font-mono text-[0.72rem] text-error mt-1 tracking-[0.02em]">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 w-full px-9 py-3.5 bg-accent-primary text-[#F0E6D3] font-heading font-semibold text-[0.95rem] border-none rounded-[10px] cursor-pointer transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:enabled:-translate-y-0.5 hover:enabled:bg-accent-hover hover:enabled:shadow-[0_0_24px_rgba(45,87,65,0.3),0_8px_24px_rgba(0,0,0,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <span className="w-[18px] h-[18px] border-2 border-[rgba(240,230,211,0.3)] border-t-[#F0E6D3] rounded-full animate-[cf-spin_0.6s_linear_infinite]" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </>
        )}
      </button>

      {status === "success" && (
        <div className="animate-[cf-status-in_0.4s_ease-out] mt-4 px-5 py-4 rounded-[10px] font-sans text-[0.9rem] flex items-center gap-2.5 bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)] text-success" aria-live="polite" role="status">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Message sent successfully. I'll get back to you soon.
        </div>
      )}

      {status === "error" && (
        <div className="animate-[cf-status-in_0.4s_ease-out] mt-4 px-5 py-4 rounded-[10px] font-sans text-[0.9rem] flex items-center gap-2.5 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] text-error" aria-live="assertive" role="alert">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
}
