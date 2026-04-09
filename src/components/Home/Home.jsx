import { useMemo } from "react";
import { BsLinkedin, BsGithub, BsInstagram, BsTwitterX } from "react-icons/bs";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import useTypewriter from "../../hooks/useTypewriter";
import Threads from "../UI/Threads/Threads";
import styles from "./Home.module.css";

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/lennon-tchen-pan/",
    icon: <BsLinkedin />,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/lennon-tp",
    icon: <BsGithub />,
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/lennon_tp",
    icon: <BsInstagram />,
    label: "Instagram",
  },
  {
    href: "https://x.com/lennon_tp",
    icon: <BsTwitterX />,
    label: "X (Twitter)",
  },
];

function Home() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const displayedRole = useTypewriter(t.home.roles);

  // useMemo : la reference du tableau ne change que si theme change
  // sans ca, chaque frappe du typewriter recreait un nouveau tableau
  // et declenchait un re-mount du canvas WebGL -> clignotement
  const threadsColor = useMemo(
    () =>
      theme === "dark"
        ? [88 / 255, 166 / 255, 255 / 255]
        : [16 / 255, 46 / 255, 74 / 255],
    [theme]
  );

  return (
    <section id="home" className={styles.home}>
      {/* Arriere-plan anime */}
      <div className={styles.threadsWrapper}>
        <Threads
          color={threadsColor}
          amplitude={1.2}
          distance={0.3}
          enableMouseInteraction
        />
      </div>

      {/* Contenu */}
      <div className={styles.content}>
        <p className={styles.greeting}>{t.home.greeting}</p>

        <h1 className={styles.title}>
          <span className={styles.titleAccent}>{t.home.name}</span>
        </h1>

        <div className={styles.roleWrapper}>
          <span className={styles.rolePrefix}>{t.home.iAm}</span>
          <span className={styles.roleText}>{displayedRole}</span>
        </div>

        <p className={styles.description}>{t.home.description}</p>

        <div className={styles.socials}>
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className={styles.btnGroup}>
          <a
            href="/cv/TCHEN-PAN-Lennon-CV-Decembre-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {t.home.downloadCV}
          </a>
          <a
            href="#contact"
            className="btn btn-outline"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t.home.contact}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;