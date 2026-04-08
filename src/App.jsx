import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Education from "./components/Education/Education";
import Certifications from "./components/Certifications/Certifications";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <main>
          <Home />
          <Education />
          <Certifications />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;