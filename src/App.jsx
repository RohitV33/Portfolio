import { CursorProvider } from "./context/CursorContext";
import CustomCursor from "./components/CustomCursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SectionTransition from "./components/SectionTransition";

export default function App() {
  return (
    <CursorProvider>
      <CustomCursor />
      <Nav />
      <main className="min-h-screen bg-dark-bg">
        <Hero />
        <SectionTransition>
          <Projects />
        </SectionTransition>
        <SectionTransition>
          <About />
        </SectionTransition>
        <SectionTransition>
          <Skills />
        </SectionTransition>
        <SectionTransition>
          <Contact />
        </SectionTransition>
        <Footer />
      </main>
    </CursorProvider>
  );
}
