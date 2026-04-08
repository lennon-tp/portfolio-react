import { useState, useEffect, useRef } from "react";
import { BsGithub, BsArrowRight } from "react-icons/bs";
import { useLanguage } from "../../context/LanguageContext";
import projects from "../../data/projects";
import styles from "./Projects.module.css";

function Projects() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const cardRefs = useRef([]);

  const FILTERS = [
    { key: "all", label: t.projects.filterAll },
    { key: "personnel", label: t.projects.filterPersonal },
    { key: "academique", label: t.projects.filterAcademic },
    { key: "professionnel", label: t.projects.filterPro },
  ];

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;

  // Reset animation refs quand le filtre change
  useEffect(() => {
    cardRefs.current.forEach((el) => {
      if (el) el.classList.remove(styles.visible);
    });

    const timeout = setTimeout(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        setTimeout(() => {
          el.classList.add(styles.visible);
        }, i * 100);
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [activeFilter]);

  // Intersection Observer pour l'entrée initiale
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
        { threshold: 0.1 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [filtered]);

  const getCategoryLabel = (category) => {
    const map = {
      personnel: t.projects.filterPersonal,
      academique: t.projects.filterAcademic,
      professionnel: t.projects.filterPro,
    };
    return map[category] ?? category;
  };

  return (
    <section id="projects" className={styles.projects}>
      {/* Intro */}
      <div className={styles.intro}>
        <div className={styles.introLeft}>
          <h2 className={`heading ${styles.heading}`}>
            {t.projects.title} <span>{t.projects.titleSpan}</span>
          </h2>
        </div>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{totalProjects}+</span>
            <span className={styles.statLabel}>{t.projects.statsProjects}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{completedProjects}</span>
            <span className={styles.statLabel}>{t.projects.statsCompleted}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`${styles.filterBtn} ${activeFilter === f.key ? styles.active : ""}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((project, index) => (
          <div
            key={project.id}
            className={styles.card}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            {/* Image */}
            <div className={styles.imageWrapper}>
              <img
                src={project.image}
                alt={lang === "fr" ? project.titleFr : project.titleEn}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <div className={styles.techStack}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  {lang === "fr" ? project.titleFr : project.titleEn}
                </h3>
                <div className={styles.badges}>
                  <span
                    className={`${styles.statusBadge} ${
                      project.status === "completed"
                        ? styles.completed
                        : styles.inProgress
                    }`}
                  >
                    {project.status === "completed"
                      ? t.projects.completed
                      : t.projects.inProgress}
                  </span>
                  <span className={styles.categoryBadge}>
                    {getCategoryLabel(project.category)}
                  </span>
                </div>
              </div>

              <p className={styles.desc}>
                {lang === "fr" ? project.descFr : project.descEn}
              </p>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubBtn}
              >
                <BsGithub />
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p className={styles.footerText}>{t.projects.footerText}</p>
        <a
          href="https://github.com/lennon-tp"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewAllBtn}
        >
          <BsGithub />
          {t.projects.viewAll}
          <BsArrowRight />
        </a>
      </div>
    </section>
  );
}

export default Projects;