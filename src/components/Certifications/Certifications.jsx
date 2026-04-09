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
    colorsDark: ["#102e4a", "#1a4a73", "#2a6090"],
    colorsLight: ["#1a4a73", "#2a6090", "#3a80b0"],
  },
  {
    icon: <BsFileEarmarkText />,
    image: "/images/voltaire_cert.png",
    glowColor: "220 70 55",
    colorsDark: ["#1a3a5c", "#2a5080", "#102e4a"],
    colorsLight: ["#2a5080", "#3a6090", "#1a4a73"],
  },
  {
    icon: <BsLaptop />,
    image: "/images/pix_cert.png",
    glowColor: "215 75 60",
    colorsDark: ["#102e4a", "#2a6090", "#1a4a73"],
    colorsLight: ["#1a4a73", "#3a80b0", "#2a6090"],
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

  const bgColor = theme === "dark" ? "#1c2128" : "#f5f5f0";

  return (
    <section id="certifications" className={styles.certifications}>
      <h2 className="heading">{t.certifications.title}</h2>

      <div className={styles.grid}>
        {certifications.map((cert, index) => {
          const meta = CERT_META[index] ?? CERT_META[0];
          const colors = theme === "dark" ? meta.colorsDark : meta.colorsLight;

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
                backgroundColor={bgColor}
                glowColor={meta.glowColor}
                colors={colors}
                fillOpacity={0.3}
              >
                <div className={styles.cardInner}>
                  <img
                    src={meta.image}
                    alt=""
                    className={styles.cardBg}
                    aria-hidden="true"
                  />
                  <div className={styles.cardOverlay} />
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