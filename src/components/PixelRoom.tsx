'use client';

import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';

// A simple 16x16 pixel art boy with middle-part hair as SVG data URI
const characterSVG = `data:image/svg+xml;utf8,<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="6" height="1" fill="%232d1b15" /><rect x="4" y="3" width="8" height="2" fill="%232d1b15" /><rect x="5" y="5" width="6" height="5" fill="%23ffcca5" /><rect x="4" y="5" width="2" height="2" fill="%232d1b15" /><rect x="10" y="5" width="2" height="2" fill="%232d1b15" /><rect x="4" y="7" width="1" height="2" fill="%232d1b15" /><rect x="11" y="7" width="1" height="2" fill="%232d1b15" /><rect x="6" y="7" width="1" height="1" fill="%23000" /><rect x="9" y="7" width="1" height="1" fill="%23000" /><rect x="5" y="10" width="6" height="3" fill="%233b82f6" /><rect x="4" y="10" width="1" height="2" fill="%233b82f6" /><rect x="11" y="10" width="1" height="2" fill="%233b82f6" /><rect x="4" y="12" width="1" height="1" fill="%23ffcca5" /><rect x="11" y="12" width="1" height="1" fill="%23ffcca5" /><rect x="5" y="13" width="2" height="2" fill="%231e3a8a" /><rect x="9" y="13" width="2" height="2" fill="%231e3a8a" /><rect x="4" y="15" width="3" height="1" fill="%234b5563" /><rect x="9" y="15" width="3" height="1" fill="%234b5563" /></svg>`;

export interface PixelRoomHandle {
  walkTo: (pageX: number, pageY: number, iconId?: string) => void;
}

interface PixelRoomProps {
  onIconInteract?: (iconId: string) => void;
}

const PixelRoom = forwardRef<PixelRoomHandle, PixelRoomProps>(({ onIconInteract }, ref) => {
  const [pos, setPos] = useState({ x: 250, y: 250 });
  const [facing, setFacing] = useState(1);
  const [isMoving, setIsMoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<{ x: number; y: number; iconId?: string } | null>(null);
  const animFrameRef = useRef<number>(0);
  const onIconInteractRef = useRef(onIconInteract);
  onIconInteractRef.current = onIconInteract;

  // Expose walkTo method for parent to call (e.g. when icon is clicked)
  useImperativeHandle(ref, () => ({
    walkTo: (pageX: number, pageY: number, iconId?: string) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetRef.current = {
        x: pageX - rect.left,
        y: pageY - rect.top,
        iconId,
      };
    },
  }));

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

  // Animation loop for walking toward target
  useEffect(() => {
    const speed = 3.5;
    const arrivalThreshold = 10;

    const update = () => {
      const target = targetRef.current;
      if (!target) {
        animFrameRef.current = requestAnimationFrame(update);
        return;
      }

      setPos(prev => {
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < arrivalThreshold) {
          // Arrived at destination
          const arrivedIconId = target.iconId;
          targetRef.current = null;
          setIsMoving(false);

          // If there was an icon interaction queued, fire it after a brief pause
          if (arrivedIconId && onIconInteractRef.current) {
            setTimeout(() => onIconInteractRef.current?.(arrivedIconId), 250);
          }
          return prev;
        }

        // Move toward target
        const moveX = (dx / dist) * Math.min(speed, dist);
        const moveY = (dy / dist) * Math.min(speed, dist);

        // Update facing direction
        if (Math.abs(dx) > 1) {
          setFacing(dx > 0 ? 1 : -1);
        }
        setIsMoving(true);

        return { x: prev.x + moveX, y: prev.y + moveY };
      });

      animFrameRef.current = requestAnimationFrame(update);
    };

    animFrameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Handle click on the desktop background — walk to that point
  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Just walk to clicked spot (no icon interaction)
    targetRef.current = { x, y };
  }, []);

  return (
    <div
      className="absolute inset-0 z-[1]"
      ref={containerRef}
      onClick={handleDesktopClick}
      style={{ cursor: 'default' }}
    >
      {/* Character Group */}
      <div
        className="absolute w-16 h-16 pointer-events-none"
        style={{
          transform: `translate(${pos.x - 32}px, ${pos.y - 32}px)`,
          transition: 'none',
        }}
      >
        <img
          src={characterSVG}
          className={`w-full h-full drop-shadow-xl ${isMoving ? 'animate-bounce' : ''}`}
          style={{
            imageRendering: 'pixelated',
            transform: `scaleX(${facing})`,
          }}
          alt="Player"
        />
        {/* Shadow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-[2px] -z-10" />

        {/* Name Label */}
        <div
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[13px] text-white whitespace-nowrap tracking-widest"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            textTransform: 'uppercase',
            textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 0px 0 #000, 0px -1px 0 #000, -1px 0px 0 #000',
          }}
        >
          ANDY
        </div>
      </div>
    </div>
  );
});

PixelRoom.displayName = 'PixelRoom';
export default PixelRoom;
