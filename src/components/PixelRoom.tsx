'use client';

import { useState, useEffect, useRef } from 'react';

// A simple 16x16 pixel art boy with middle-part hair as SVG data URI
const characterSVG = `data:image/svg+xml;utf8,<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="6" height="1" fill="%232d1b15" /><rect x="4" y="3" width="8" height="2" fill="%232d1b15" /><rect x="5" y="5" width="6" height="5" fill="%23ffcca5" /><rect x="4" y="5" width="2" height="2" fill="%232d1b15" /><rect x="10" y="5" width="2" height="2" fill="%232d1b15" /><rect x="4" y="7" width="1" height="2" fill="%232d1b15" /><rect x="11" y="7" width="1" height="2" fill="%232d1b15" /><rect x="6" y="7" width="1" height="1" fill="%23000" /><rect x="9" y="7" width="1" height="1" fill="%23000" /><rect x="5" y="10" width="6" height="3" fill="%233b82f6" /><rect x="4" y="10" width="1" height="2" fill="%233b82f6" /><rect x="11" y="10" width="1" height="2" fill="%233b82f6" /><rect x="4" y="12" width="1" height="1" fill="%23ffcca5" /><rect x="11" y="12" width="1" height="1" fill="%23ffcca5" /><rect x="5" y="13" width="2" height="2" fill="%231e3a8a" /><rect x="9" y="13" width="2" height="2" fill="%231e3a8a" /><rect x="4" y="15" width="3" height="1" fill="%234b5563" /><rect x="9" y="15" width="3" height="1" fill="%234b5563" /></svg>`;

export default function PixelRoom() {
  const [pos, setPos] = useState({ x: 250, y: 250 });
  const [facing, setFacing] = useState(1);
  const [isMoving, setIsMoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject pixel font dynamically to avoid SSR hydration errors
    if (!document.getElementById('pixel-font-import')) {
      const style = document.createElement('style');
      style.id = 'pixel-font-import';
      style.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`;
      document.head.appendChild(style);
    }
    
    // If container is ready, put character in center
    if (containerRef.current) {
      setPos({ x: containerRef.current.offsetWidth / 2, y: containerRef.current.offsetHeight / 2 });
    }
  }, []);

  useEffect(() => {
    const keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) keys[key as keyof typeof keys] = true;
      if (keys.hasOwnProperty(e.key)) keys[e.key as keyof typeof keys] = true; // For Arrow keys
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) keys[key as keyof typeof keys] = false;
      if (keys.hasOwnProperty(e.key)) keys[e.key as keyof typeof keys] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId: number;
    const speed = 4;

    const update = () => {
      let dx = 0;
      let dy = 0;
      if (keys.w || keys.ArrowUp) dy -= speed;
      if (keys.s || keys.ArrowDown) dy += speed;
      if (keys.a || keys.ArrowLeft) dx -= speed;
      if (keys.d || keys.ArrowRight) dx += speed;

      if (dx !== 0 || dy !== 0) {
        setPos(prev => {
          let newX = prev.x + dx;
          let newY = prev.y + dy;
          
          if (containerRef.current) {
             const rect = containerRef.current.getBoundingClientRect();
             newX = Math.max(24, Math.min(newX, rect.width - 24));
             newY = Math.max(24, Math.min(newY, rect.height - 24));
          }
          if (prev.x === newX && prev.y === newY) return prev;
          return { x: newX, y: newY };
        });

        setIsMoving(prev => prev ? prev : true);
        
        if (dx !== 0) {
          const newFacing = dx > 0 ? 1 : -1;
          setFacing(prev => prev === newFacing ? prev : newFacing);
        }
      } else {
        setIsMoving(prev => prev ? false : prev);
      }

      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none" ref={containerRef}>
      {/* Character Group */}
      <div 
        className="absolute w-16 h-16 transition-transform duration-[50ms]"
        style={{ 
          transform: `translate(${pos.x - 32}px, ${pos.y - 32}px)`,
        }}
      >
        <img 
          src={characterSVG} 
          className={`w-full h-full drop-shadow-xl ${isMoving ? 'animate-bounce' : ''}`} 
          style={{ 
            imageRendering: 'pixelated',
            transform: `scaleX(${facing})`
          }}
          alt="Player"
        />
        {/* Shadow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-[2px] -z-10" />
        
        {/* Name Label */}
        <div 
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white whitespace-nowrap tracking-widest"
          style={{ 
            fontFamily: '"Press Start 2P", monospace',
            textTransform: 'uppercase',
            textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 0px 0 #000, 0px -1px 0 #000, -1px 0px 0 #000'
          }}
        >
          ANDY
        </div>
      </div>
    </div>
  );
}
