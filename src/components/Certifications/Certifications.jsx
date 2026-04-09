import { useEffect, useRef } from "react";
import { BsShieldCheck, BsFileEarmarkText, BsLaptop } from "react-icons/bs";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import BorderGlow from "../UI/BorderGlow/BorderGlow";
import certifications from "../../data/certifications";
import styles from "./Certifications.module.css";

const CERT_META = [
  {
    icon: <BsShieldCheck />,
    image: "/images/secnum_cert.png",
    glowColor: "210 80 60",
    colors: ["#102e4a", "#1a4a73", "#2a6090"],
  },
  {
    icon: <BsFileEarmarkText />,
    image: "/images/voltaire_cert.png",
    glowColor: "220 70 55",
    colors: ["#1a3a5c", "#2a5080", "#102e4a"],
  },
  {
    icon: <BsLaptop />,
    image: "/images/pix_cert.png",
    glowColor: "215 75 60",
    colors: ["#102e4a", "#2a6090", "#1a4a73"],
  },
];

function Certifications() {
  const { lang, t } = useLanguage();
  const { theme } = useTheme();
  const wrapperRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    wrapperRefs.current.forEach((el) => {
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

  const getBgColor = () =>
    theme === "dark" ? "#1c2128" : "#0e1a2b";

  return (
    <section id="certifications" className={styles.certifications}>
      <h2 className="heading">{t.certifications.title}</h2>

      <div className={styles.grid}>
        {certifications.map((cert, index) => {
          const meta = CERT_META[index] ?? CERT_META[0];

          return (
            <div
              key={cert.id}
              className={styles.glowWrapper}
              ref={(el) => (wrapperRefs.current[index] = el)}
            >
              <BorderGlow
                borderRadius={16}
                glowRadius={36}
                glowIntensity={0.9}
                edgeSensitivity={28}
                coneSpread={22}
                backgroundColor={getBgColor()}
                glowColor={meta.glowColor}
                colors={meta.colors}
                fillOpacity={0.3}
              >
                <div className={styles.cardInner}>
                  {/* Image de fond avec blur */}
                  <img
                    src={meta.image}
                    alt=""
                    className={styles.cardBg}
                    aria-hidden="true"
                  />

                  {/* Overlay gradient */}
                  <div className={styles.cardOverlay} />

                  {/* Contenu */}
                  <div className={styles.cardContent}>
                    <div className={styles.iconWrapper}>
                      {meta.icon}
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
                </div>
              </BorderGlow>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Certifications;