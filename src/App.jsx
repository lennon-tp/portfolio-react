import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          {/* Les sections viendront ici */}
          <p>Portfolio en construction</p>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;