import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { BsSun, BsMoon } from "react-icons/bs";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { key: "home", href: "#home" },
  { key: "education", href: "#education" },
  { key: "certifications", href: "#certifications" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
];

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Ferme le menu mobile sur Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Bloque le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Détecte la section active au scroll
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <a href="#home" className={styles.logo} onClick={() => handleNavClick("#home")}>
        Lennon <span className={styles.logoAccent}>TCHEN PAN</span>
      </a>

      {/* Nav desktop */}
      <nav className={styles.navbar} aria-label="Navigation principale">
        {NAV_LINKS.map((link) => (
          
            key={link.key}
            href={link.href}
            className={`${styles.navLink} ${activeSection === link.href.replace("#", "") ? styles.active : ""}`}
            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
          >
            {t.nav[link.key]}
          </a>
        ))}
      </nav>

      {/* Controls */}
      <div className={styles.controls}>
        {/* Toggle langue */}
        <button
          className={styles.langToggle}
          onClick={toggleLanguage}
          aria-label={`Changer la langue (actuellement ${lang.toUpperCase()})`}
        >
          <img
            src={`/flags/${lang === "fr" ? "en" : "fr"}.png`}
            alt={lang === "fr" ? "Switch to English" : "Passer en Français"}
            className={styles.flagIcon}
          />
          <span className={styles.langLabel}>
            {lang === "fr" ? "EN" : "FR"}
          </span>
        </button>

        {/* Toggle thème */}
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Passer en mode ${theme === "light" ? "sombre" : "clair"}`}
        >
          <BsSun className={`${styles.themeIcon} ${styles.sunIcon}`} />
          <BsMoon className={`${styles.themeIcon} ${styles.moonIcon}`} />
        </button>

        {/* Hamburger mobile */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
        >
          <span className={styles.line} />
          <span className={styles.line} />
          <span className={styles.line} />
        </button>
      </div>

      {/* Overlay mobile */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        {NAV_LINKS.map((link) => (
          
            key={link.key}
            href={link.href}
            className={`${styles.mobileLink} ${activeSection === link.href.replace("#", "") ? styles.active : ""}`}
            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
          >
            {t.nav[link.key]}
          </a>
        ))}
        <p className={styles.overlayFooter}>© 2026 Lennon TCHEN PAN</p>
      </div>
    </header>
  );
}

export default Header;