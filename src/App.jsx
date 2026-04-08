import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header/Header";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <main style={{ paddingTop: "72px" }}>
          <p style={{ padding: "4rem 10%" }}>Sections en construction...</p>
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;