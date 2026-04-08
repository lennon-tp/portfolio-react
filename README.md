# Portfolio — Lennon TCHEN PAN

Portfolio personnel développé avec React et Vite.

## Stack technique

- **React** (Vite)
- **CSS Modules**
- **react-icons**
- **Web3Forms** (formulaire de contact)

## Fonctionnalités

- Mode clair / sombre (sauvegardé en localStorage)
- Multilingue FR / EN (sauvegardé en localStorage)
- Navigation smooth scroll avec détection de section active
- Menu mobile avec overlay
- Animation typewriter sur la section Home
- Timeline animée au scroll (section Parcours)
- Filtres par catégorie sur la section Projets
- Formulaire de contact avec validation et envoi via Web3Forms
- Responsive mobile-first

## Structure du projet

```
src/
├── components/
│   ├── Header/
│   ├── Home/
│   ├── Education/
│   ├── Certifications/
│   ├── Projects/
│   ├── Contact/
│   └── Footer/
├── context/
│   ├── ThemeContext.jsx
│   └── LanguageContext.jsx
├── data/
│   ├── timeline.js
│   ├── certifications.js
│   └── projects.js
├── hooks/
│   └── useTypewriter.js
├── translations/
│   └── index.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

## Installation

```bash
git clone https://github.com/lennon-tp/portfolio-react.git
cd portfolio-react
npm install
npm run dev
```

## Configuration

### Formulaire de contact

Dans `src/components/Contact/Contact.jsx`, remplace la clé Web3Forms :

```js
const WEB3FORMS_KEY = "ta_cle_web3forms";
```

Obtenir une clé gratuite sur [web3forms.com](https://web3forms.com).

### Images et CV

- Images des projets : `public/images/`
- CV : `public/cv/`
- Drapeaux FR/EN : `public/flags/`

## Scripts

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualisation du build
```

## Déploiement

```bash
npm run build
```

Le dossier `dist/` généré peut être déployé sur Vercel, Netlify ou GitHub Pages.

---

© 2026 Lennon TCHEN PAN