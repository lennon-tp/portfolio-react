import { useEffect, useRef } from "react";
import { BsShieldCheck, BsFileEarmarkText, BsLaptop } from "react-icons/bs";
import { useLanguage } from "../../context/LanguageContext";
import certifications from "../../data/certifications";
import styles from "./Certifications.module.css";

const ICONS = [
  <BsShieldCheck />,
  <BsFileEarmarkText />,
  <BsLaptop />,
];

function Certifications() {
  const { lang, t } = useLanguage();
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    cardRefs.current.forEach((el) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add(styles.visible);
            observer.unobserve(el);
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="certifications" className={styles.certifications}>
      <h2 className="heading">{t.certifications.title}</h2>

      <div className={styles.grid}>
        {certifications.map((cert, index) => (
          <div
            key={cert.id}
            className={styles.card}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div className={styles.iconWrapper}>
              {ICONS[index] ?? <BsShieldCheck />}
            </div>
            <h3 className={styles.title}>
              {lang === "fr" ? cert.titleFr : cert.titleEn}
            </h3>
            <p className={styles.org}>
              {lang === "fr" ? cert.orgFr : cert.orgEn}
            </p>
            <p className={styles.desc}>
              {lang === "fr" ? cert.descFr : cert.descEn}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;