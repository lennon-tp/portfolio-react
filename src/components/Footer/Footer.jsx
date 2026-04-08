import { BsLinkedin, BsGithub, BsInstagram, BsTwitterX } from "react-icons/bs";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./Footer.module.css";

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
    label: "X",
  },
];

const NAV_LINKS = [
  { key: "education", href: "#education" },
  { key: "certifications", href: "#certifications" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
];

function Footer() {
  const { t } = useLanguage();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#home" className={styles.logo} onClick={(e) => handleNavClick(e, "#home")}>
          Lennon <span className={styles.logoAccent}>TCHEN PAN</span>
        </a>

        {/* Nav */}
        <nav aria-label="Navigation footer">
          <ul className={styles.nav}>
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {t.nav[link.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
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

        {/* Copyright */}
        <p className={styles.copyright}>
          &copy; 2026 {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}

export default Footer;