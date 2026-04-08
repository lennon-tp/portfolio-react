import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Education from "./components/Education/Education";
import Certifications from "./components/Certifications/Certifications";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <main>
          <Home />
          <Education />
          <Certifications />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;