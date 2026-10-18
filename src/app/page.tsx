'use client';

import { useState, useEffect, useRef } from 'react';
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

import PixelRoom, { PixelRoomHandle } from '@/components/PixelRoom';
import Text3D from '@/components/Text3D';
import { profile } from '@/data/portfolio';

// Vertical gap between the bottom of an icon (or the icon row) and where the character stands
const CHARACTER_GAP = 48;

export default function Home() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  // Starts true so the character's entry walk waits for the intro to finish
  const [isStartAnimating, setIsStartAnimating] = useState(true);
  const pixelRoomRef = useRef<PixelRoomHandle>(null);
  const iconRowRef = useRef<HTMLDivElement>(null);
  const hasCharacterEnteredRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStartAnimating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Once the intro clears, the character walks in from the left and stops below the icon row
  useEffect(() => {
    if (isStartAnimating || hasCharacterEnteredRef.current || !iconRowRef.current) return;
    hasCharacterEnteredRef.current = true;
    const rect = iconRowRef.current.getBoundingClientRect();
    pixelRoomRef.current?.walkTo(rect.left + rect.width / 2, rect.bottom + CHARACTER_GAP);
  }, [isStartAnimating]);

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

  const openWindow = (id: string) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setMinimizedWindows((prev) => prev.filter((win) => win !== id));
    setActiveWindow(id);
  };

  // On large screens the character walks over first and opens the window on arrival;
  // when the pixel room is hidden (small screens) the window opens right away
  const handleDesktopIconClick = (id: string, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const walked = pixelRoomRef.current?.walkTo(rect.left + rect.width / 2, rect.bottom + CHARACTER_GAP, id);
    if (walked) hasCharacterEnteredRef.current = true; // an icon click during the intro counts as the entrance
    else openWindow(id);
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
    { id: 'about', name: 'About.txt', subtitle: 'Who I am', icon: User, color: 'var(--primary-pink)' },
    { id: 'projects', name: 'Projects.exe', subtitle: "Things I've built", icon: Code2, color: 'var(--primary-cyan)' },
    { id: 'skills', name: 'Skills.cfg', subtitle: 'Tech stack', icon: Wrench, color: 'var(--primary-yellow)' },
    { id: 'contact', name: 'Contact.mail', subtitle: 'Say hi', icon: Mail, color: 'var(--primary-purple)' },
  ];

  return (
    <main className="relative w-full h-full overflow-hidden p-6 select-none">
      <ClickSound />
      <StartAnimation isAnimating={isStartAnimating} />
      {/* Desktop Workspace */}
      <div className="relative h-full pb-16 overflow-y-auto">
        {/* Hero: name + icons, centered. Empty space passes clicks through to the pixel room below */}
        <div className="relative z-[2] min-h-full flex flex-col items-center justify-center gap-8 lg:gap-12 py-4 pointer-events-none">
          <div className="flex flex-col items-center gap-4 lg:gap-6">
            <Text3D text={profile.name} depth={6} strokeWidth={5} className="text-3xl sm:text-5xl lg:text-7xl" />
            <p className="border-2 border-black bg-white px-3 py-1 text-sm lg:text-lg font-bold shadow-[4px_4px_0_0_#000]">
              {profile.tagline}
            </p>
          </div>

          <div ref={iconRowRef} className="grid grid-cols-2 lg:flex gap-4 lg:gap-10">
            {apps.map((app) => (
              <DesktopIcon
                key={app.id}
                id={app.id}
                name={app.name}
                subtitle={app.subtitle}
                icon={app.icon}
                color={app.color}
                onClick={handleDesktopIconClick}
              />
            ))}
          </div>
        </div>

        {/* Pixel character overlay (covers entire desktop) */}
        <div className="hidden lg:block">
          <PixelRoom ref={pixelRoomRef} onIconInteract={openWindow} />
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
        headerColor="var(--primary-pink)"
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
        headerColor="var(--primary-cyan)"
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
        headerColor="var(--primary-yellow)"
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
        headerColor="var(--primary-purple)"
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
