'use client';

import { useState, useEffect } from 'react';
import Taskbar from '@/components/Taskbar';
import DesktopIcon from '@/components/DesktopIcon';
import Window from '@/components/Window';
import StartAnimation from '@/components/StartAnimation';
import ClickSound from '@/components/ClickSound';
import { User, Code2, Wrench, Mail } from 'lucide-react';

import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

import PixelRoom from '@/components/PixelRoom';

export default function Home() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [isStartAnimating, setIsStartAnimating] = useState(false);

  useEffect(() => {
    setIsStartAnimating(true);
    const timer = setTimeout(() => {
      setIsStartAnimating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartClick = () => {
    if (isStartAnimating) return;
    setIsStartAnimating(true);
    setTimeout(() => {
      setIsStartAnimating(false);
    }, 3000);
  };

  const closeWindow = (id: string) => {
    if (openWindows.includes(id)) {
      setOpenWindows(openWindows.filter((win) => win !== id));
      setMinimizedWindows(minimizedWindows.filter((win) => win !== id));
      if (activeWindow === id) {
        const remaining = openWindows.filter((win) => win !== id && !minimizedWindows.includes(win));
        setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
      }
    }
  };

  const handleDesktopIconClick = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
      setMinimizedWindows(minimizedWindows.filter((win) => win !== id));
      setActiveWindow(id);
    } else {
      bringToFront(id);
    }
  };

  const bringToFront = (id: string) => {
    setActiveWindow(id);
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows(minimizedWindows.filter((win) => win !== id));
    }
  };

  const minimizeWindow = (id: string) => {
    if (!minimizedWindows.includes(id)) {
      setMinimizedWindows([...minimizedWindows, id]);
    }
    if (activeWindow === id) {
      const remaining = openWindows.filter(win => win !== id && !minimizedWindows.includes(win));
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const handleTaskbarClick = (id: string) => {
    if (minimizedWindows.includes(id)) {
      bringToFront(id);
    } else if (activeWindow === id) {
      minimizeWindow(id);
    } else {
      bringToFront(id);
    }
  };

  const apps = [
    { id: 'about', name: 'About.txt', icon: User, color: '#f472b6' },   // primary-pink
    { id: 'projects', name: 'Projects.exe', icon: Code2, color: '#2dd4bf' }, // primary-cyan
    { id: 'skills', name: 'Skills.cfg', icon: Wrench, color: '#fde047' }, // primary-yellow
    { id: 'contact', name: 'Contact.mail', icon: Mail, color: '#c084fc' }, // primary-purple
  ];

  return (
    <main className="relative w-full h-full overflow-hidden p-6 select-none">
      <ClickSound />
      <StartAnimation isAnimating={isStartAnimating} />
      {/* Desktop Workspace */}
      <div className="flex flex-row h-full pb-16 gap-6">
        {/* Left side: Icons */}
        <div className="flex flex-col gap-6 items-start w-[120px] shrink-0">
          {apps.map((app) => (
            <DesktopIcon
              key={app.id}
              id={app.id}
              name={app.name}
              icon={app.icon}
              color={app.color}
              onClick={handleDesktopIconClick}
            />
          ))}
        </div>
        
        {/* Right side: Retro Area (Directly on Desktop) */}
        <div className="flex-1 h-full hidden lg:block relative -m-6 ml-0">
          <PixelRoom />
        </div>
      </div>

      {/* Render open windows here */}
      <Window
        id="about"
        title="About.txt - NotePad"
        isOpen={openWindows.includes('about')}
        isActive={activeWindow === 'about'}
        isMinimized={minimizedWindows.includes('about')}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onBringToFront={bringToFront}
        headerColor="#f472b6"
        defaultPosition={{ x: 100, y: 50 }}
        className="w-[90vw] md:w-[750px] h-[75vh] md:h-[500px]"
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
        isMinimized={minimizedWindows.includes('projects')}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onBringToFront={bringToFront}
        headerColor="#2dd4bf"
        defaultPosition={{ x: 150, y: 100 }}
        className="w-[90vw] md:w-[800px] h-[75vh] md:h-[600px]"
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
        isMinimized={minimizedWindows.includes('skills')}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onBringToFront={bringToFront}
        headerColor="#fde047"
        defaultPosition={{ x: 200, y: 150 }}
        className="w-[90vw] md:w-[700px] h-[75vh] md:h-[450px]"
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
        isMinimized={minimizedWindows.includes('contact')}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onBringToFront={bringToFront}
        headerColor="#c084fc"
        defaultPosition={{ x: 250, y: 200 }}
        className="w-[90vw] md:w-[450px] h-[75vh] md:h-[450px]"
      >
        <div className="p-4 border-2 border-black h-full bg-white overflow-y-auto">
          <Contact />
        </div>
      </Window>

      <Taskbar
        apps={apps}
        openWindows={openWindows}
        activeWindow={activeWindow}
        minimizedWindows={minimizedWindows}
        onWindowClick={handleTaskbarClick}
        onStartClick={handleStartClick}
      />
    </main>
  );
}
