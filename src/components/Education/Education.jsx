import { useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import timeline from "../../data/timeline";
import styles from "./Education.module.css";

function Education() {
  const { lang, t } = useLanguage();
  const itemRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    itemRefs.current.forEach((el) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add(styles.visible);
            observer.unobserve(el);
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="education" className={styles.education}>
      <h2 className="heading">{t.education.title}</h2>

      <div className={styles.timeline}>
        {timeline.map((item, index) => (
          <div
            key={item.id}
            className={styles.item}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            <div className={styles.dot} />
            <div className={styles.card}>
              <p className={styles.date}>{item.date}</p>
              <h3 className={styles.cardTitle}>
                {lang === "fr" ? item.titleFr : item.titleEn}
              </h3>
              <p className={styles.cardDesc}>
                {lang === "fr" ? item.descFr : item.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;