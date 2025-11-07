import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export default function App() {
  return (
    <div className="min-h-dvh text-white" style={{ background: "radial-gradient(1200px 600px at 20% -10%, rgba(106,131,255,0.08), transparent), radial-gradient(1000px 500px at 110% 10%, rgba(159,183,255,0.06), transparent)", backgroundColor: "#0b1220" }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-6">
        <Link to="/" className="inline-block text-2xl font-semibold mb-2">Kulachart's Resume</Link>
        <p className="text-gray-400 mb-8">Computer Engineering Student</p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
      <style>{`@media print { nav, footer { display: none !important } section { page-break-inside: avoid } body { background: white !important; color: black !important } }`}</style>
    </div>
  );
}