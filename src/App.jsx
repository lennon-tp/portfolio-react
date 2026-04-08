import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <main>
          <Home />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;