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
    // Re-validate the changed field if it was already touched
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

    // Placeholder: log to console; replace with actual API later
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("[ContactForm] Submission:", form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched(new Set());
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  const fieldStyle = (fieldName: string): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9rem",
    color: "var(--color-text-primary)",
    background: "var(--color-bg-secondary)",
    border: `1px solid ${
      errors[fieldName as keyof FormErrors]
        ? "var(--color-error)"
        : "var(--color-border)"
    }`,
    borderRadius: 10,
    outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    boxSizing: "border-box" as const,
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <style>{`
        .cf-field input:focus,
        .cf-field textarea:focus,
        .cf-field select:focus {
          border-color: var(--color-accent-primary) !important;
          box-shadow: 0 0 0 3px rgba(45,87,65,0.15);
        }

        .cf-label {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          margin-bottom: 6px;
          letter-spacing: 0.03em;
        }
        .cf-error {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--color-error);
          margin-top: 4px;
          letter-spacing: 0.02em;
        }
        .cf-field {
          margin-bottom: 20px;
        }

        .cf-submit {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 36px;
          background: var(--color-accent-primary);
          color: #F0E6D3;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.3s ease, background 0.2s ease, opacity 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          width: 100%;
          justify-content: center;
        }
        .cf-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          background: var(--color-accent-hover);
          box-shadow: 0 0 24px rgba(45,87,65,0.3), 0 8px 24px rgba(0,0,0,0.3);
        }
        .cf-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @keyframes cf-spin {
          to { transform: rotate(360deg); }
        }
        .cf-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(240,230,211,0.3);
          border-top-color: #F0E6D3;
          border-radius: 50%;
          animation: cf-spin 0.6s linear infinite;
        }

        @keyframes cf-status-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cf-status {
          animation: cf-status-in 0.4s ease-out;
          padding: 16px 20px;
          border-radius: 10px;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          margin-top: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cf-status--success {
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          color: var(--color-success);
        }
        .cf-status--error {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          color: var(--color-error);
        }

        .cf-field select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23a3a3a3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }

        .cf-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 640px) {
          .cf-row {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
        }
      `}</style>

      <div className="cf-row">
        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-name">
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
            style={fieldStyle("name")}
          />
          {errors.name && <p className="cf-error">{errors.name}</p>}
        </div>

        <div className="cf-field">
          <label className="cf-label" htmlFor="cf-email">
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
            style={fieldStyle("email")}
          />
          {errors.email && <p className="cf-error">{errors.email}</p>}
        </div>
      </div>

      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-subject">
          Subject
        </label>
        <select
          id="cf-subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          style={fieldStyle("subject")}
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
        {errors.subject && <p className="cf-error">{errors.subject}</p>}
      </div>

      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-message">
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
          style={{
            ...fieldStyle("message"),
            resize: "vertical",
            minHeight: 120,
          }}
        />
        {errors.message && <p className="cf-error">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="cf-submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <span className="cf-spinner" />
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
        <div className="cf-status cf-status--success">
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
        <div className="cf-status cf-status--error">
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
