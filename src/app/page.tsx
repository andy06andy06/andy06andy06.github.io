import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />

      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Cheng-En Chiang. All rights reserved.</p>
      </footer>
    </main>
  );
}
