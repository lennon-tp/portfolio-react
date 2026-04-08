import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./Contact.module.css";

const WEB3FORMS_KEY = "REMPLACE_PAR_TA_CLE_WEB3FORMS";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const INITIAL_ERRORS = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm((prev) => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    // Efface l'erreur du champ en cours de saisie
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = { ...INITIAL_ERRORS };
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = "Ce champ est requis";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Ce champ est requis";
      valid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Email invalide";
      valid = false;
    }

    const digits = form.phone.replace(/\s/g, "");
    if (!digits) {
      newErrors.phone = "Ce champ est requis";
      valid = false;
    } else if (digits.length !== 8) {
      newErrors.phone = t.contact.phoneError;
      valid = false;
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Ce champ est requis";
      valid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Ce champ est requis";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");

    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_KEY);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("subject", form.subject);
      formData.append("message", form.message);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm(INITIAL_FORM);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <h2 className="heading">
        {t.contact.title} <span>{t.contact.titleSpan}</span>
      </h2>

      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Nom + Email */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                {t.contact.namePlaceholder}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`${styles.input} ${errors.name ? styles.error : ""}`}
                placeholder={t.contact.namePlaceholder}
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
              {errors.name && (
                <span className={styles.errorMsg}>{errors.name}</span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                {t.contact.emailPlaceholder}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.error : ""}`}
                placeholder={t.contact.emailPlaceholder}
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && (
                <span className={styles.errorMsg}>{errors.email}</span>
              )}
            </div>
          </div>

          {/* Telephone + Sujet */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="phone">
                {t.contact.phonePlaceholder}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                className={`${styles.input} ${errors.phone ? styles.error : ""}`}
                placeholder="XX XX XX XX"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
              <span className={styles.hint}>8 chiffres</span>
              {errors.phone && (
                <span className={styles.errorMsg}>{errors.phone}</span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="subject">
                {t.contact.subjectPlaceholder}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className={`${styles.input} ${errors.subject ? styles.error : ""}`}
                placeholder={t.contact.subjectPlaceholder}
                value={form.subject}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.subject && (
                <span className={styles.errorMsg}>{errors.subject}</span>
              )}
            </div>
          </div>

          {/* Message */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="message">
              {t.contact.messagePlaceholder}
            </label>
            <textarea
              id="message"
              name="message"
              className={`${styles.textarea} ${errors.message ? styles.error : ""}`}
              placeholder={t.contact.messagePlaceholder}
              value={form.message}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.message && (
              <span className={styles.errorMsg}>{errors.message}</span>
            )}
          </div>

          {/* Feedback */}
          {status === "success" && (
            <div className={`${styles.feedback} ${styles.success}`}>
              {t.contact.successMessage}
            </div>
          )}
          {status === "error" && (
            <div className={`${styles.feedback} ${styles.errorFeedback}`}>
              Une erreur est survenue. Veuillez reessayer.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === "loading"}
          >
            <BsSend />
            {status === "loading" ? "Envoi..." : t.contact.send}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;