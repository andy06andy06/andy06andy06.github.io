'use client';

import { useState } from 'react';
import Taskbar from '@/components/Taskbar';
import DesktopIcon from '@/components/DesktopIcon';
import Window from '@/components/Window';
import { User, Code2, Wrench, Mail } from 'lucide-react';

import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const toggleWindow = (id: string) => {
    if (openWindows.includes(id)) {
      setOpenWindows(openWindows.filter((win) => win !== id));
      if (activeWindow === id) {
        setActiveWindow(openWindows.find((win) => win !== id) || null);
      }
    } else {
      setOpenWindows([...openWindows, id]);
      setActiveWindow(id);
    }
  };

  const bringToFront = (id: string) => {
    setActiveWindow(id);
  };

  const apps = [
    { id: 'about', name: 'About.txt', icon: User, color: '#f472b6' },   // primary-pink
    { id: 'projects', name: 'Projects.exe', icon: Code2, color: '#2dd4bf' }, // primary-cyan
    { id: 'skills', name: 'Skills.cfg', icon: Wrench, color: '#fde047' }, // primary-yellow
    { id: 'contact', name: 'Contact.mail', icon: Mail, color: '#c084fc' }, // primary-purple
  ];

  return (
    <main className="relative w-full h-full overflow-hidden p-6 select-none">
      {/* Desktop Workspace */}
      <div className="flex flex-col gap-6 items-start h-full pb-16">
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            name={app.name}
            icon={app.icon}
            color={app.color}
            onClick={toggleWindow}
          />
        ))}
      </div>

      {/* Render open windows here */}
      <Window
        id="about"
        title="About.txt - NotePad"
        isOpen={openWindows.includes('about')}
        isActive={activeWindow === 'about'}
        onClose={toggleWindow}
        onBringToFront={bringToFront}
        headerColor="#f472b6"
        defaultPosition={{ x: 100, y: 50 }}
        className="w-[600px] h-[500px]"
      >
        <div className="p-4 border-2 border-black h-full bg-[#fdf6e3] overflow-y-auto">
          <About />
        </div>
      </Window>

      <Window
        id="projects"
        title="Projects.exe - Portfolio"
        isOpen={openWindows.includes('projects')}
        isActive={activeWindow === 'projects'}
        onClose={toggleWindow}
        onBringToFront={bringToFront}
        headerColor="#2dd4bf"
        defaultPosition={{ x: 150, y: 100 }}
        className="w-[800px] h-[600px]"
      >
        <div className="p-4 border-2 border-black h-full bg-white overflow-y-auto">
          <Projects />
        </div>
      </Window>

      <Window
        id="skills"
        title="System_Skills.cfg"
        isOpen={openWindows.includes('skills')}
        isActive={activeWindow === 'skills'}
        onClose={toggleWindow}
        onBringToFront={bringToFront}
        headerColor="#fde047"
        defaultPosition={{ x: 200, y: 150 }}
        className="w-[500px] h-[400px]"
      >
        <div className="p-4 border-2 border-black h-full bg-white overflow-y-auto">
          <Skills />
        </div>
      </Window>

      <Window
        id="contact"
        title="Send_Mail - Outlook Express"
        isOpen={openWindows.includes('contact')}
        isActive={activeWindow === 'contact'}
        onClose={toggleWindow}
        onBringToFront={bringToFront}
        headerColor="#c084fc"
        defaultPosition={{ x: 250, y: 200 }}
        className="w-[450px] h-[450px]"
      >
        <div className="p-4 border-2 border-black h-full bg-white overflow-y-auto">
          <Contact />
        </div>
      </Window>

      <Taskbar />
    </main>
  );
}
