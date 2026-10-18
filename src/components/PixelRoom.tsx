'use client';

import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';

// A simple 16x16 pixel art boy with middle-part hair as SVG data URI
const characterSVG = `data:image/svg+xml;utf8,<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="6" height="1" fill="%232d1b15" /><rect x="4" y="3" width="8" height="2" fill="%232d1b15" /><rect x="5" y="5" width="6" height="5" fill="%23ffcca5" /><rect x="4" y="5" width="2" height="2" fill="%232d1b15" /><rect x="10" y="5" width="2" height="2" fill="%232d1b15" /><rect x="4" y="7" width="1" height="2" fill="%232d1b15" /><rect x="11" y="7" width="1" height="2" fill="%232d1b15" /><rect x="6" y="7" width="1" height="1" fill="%23000" /><rect x="9" y="7" width="1" height="1" fill="%23000" /><rect x="5" y="10" width="6" height="3" fill="%233b82f6" /><rect x="4" y="10" width="1" height="2" fill="%233b82f6" /><rect x="11" y="10" width="1" height="2" fill="%233b82f6" /><rect x="4" y="12" width="1" height="1" fill="%23ffcca5" /><rect x="11" y="12" width="1" height="1" fill="%23ffcca5" /><rect x="5" y="13" width="2" height="2" fill="%231e3a8a" /><rect x="9" y="13" width="2" height="2" fill="%231e3a8a" /><rect x="4" y="15" width="3" height="1" fill="%234b5563" /><rect x="9" y="15" width="3" height="1" fill="%234b5563" /></svg>`;

const WALK_SPEED = 210; // px per second
const MAX_ICON_WALK_SECONDS = 0.45; // walking to an icon speeds up so the window opens within ~0.6s
const ICON_OPEN_DELAY_MS = 150;
const ENTRY_X = -40; // off-screen left, where the character walks in from

type Point = { x: number; y: number };
type Target = Point & { speed: number; iconId?: string };

export interface PixelRoomHandle {
  // Returns false when the room is not displayed (e.g. hidden on small screens)
  walkTo: (pageX: number, pageY: number, iconId?: string) => boolean;
}

interface PixelRoomProps {
  onIconInteract?: (iconId: string) => void;
}

const PixelRoom = forwardRef<PixelRoomHandle, PixelRoomProps>(({ onIconInteract }, ref) => {
  // null until the first walk: the character then enters from the left edge
  const [pos, setPos] = useState<Point | null>(null);
  const [facing, setFacing] = useState(1);
  const [isMoving, setIsMoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<Point | null>(null);
  const targetRef = useRef<Target | null>(null);
  const animFrameRef = useRef<number>(0);
  const onIconInteractRef = useRef(onIconInteract);
  onIconInteractRef.current = onIconInteract;

  const setTarget = useCallback((x: number, y: number, iconId?: string) => {
    // Never drop an icon click: if the character was heading to another icon, open it now
    const pendingIconId = targetRef.current?.iconId;
    if (pendingIconId && pendingIconId !== iconId) onIconInteractRef.current?.(pendingIconId);

    if (!posRef.current) posRef.current = { x: ENTRY_X, y };
    const dist = Math.hypot(x - posRef.current.x, y - posRef.current.y);
    const speed = iconId ? Math.max(WALK_SPEED, dist / MAX_ICON_WALK_SECONDS) : WALK_SPEED;
    targetRef.current = { x, y, speed, iconId };
  }, []);

  // Expose walkTo method for parent to call (e.g. when icon is clicked)
  useImperativeHandle(ref, () => ({
    walkTo: (pageX: number, pageY: number, iconId?: string) => {
      if (!containerRef.current) return false;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width === 0) return false;
      setTarget(pageX - rect.left, pageY - rect.top, iconId);
      return true;
    },
  }), [setTarget]);

  useEffect(() => {
    // Inject pixel font dynamically to avoid SSR hydration errors
    if (!document.getElementById('pixel-font-import')) {
      const style = document.createElement('style');
      style.id = 'pixel-font-import';
      style.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`;
      document.head.appendChild(style);
    }
  }, []);

  // Animation loop for walking toward target
  useEffect(() => {
    let lastTime: number | null = null;

    const update = (time: number) => {
      // Clamp the frame delta so a backgrounded tab doesn't teleport the character
      const dt = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const target = targetRef.current;
      const prev = posRef.current;
      if (target && prev) {
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const dist = Math.hypot(dx, dy);
        const step = target.speed * dt;

        let next: Point;
        if (dist <= step) {
          // Arrived at destination
          next = { x: target.x, y: target.y };
          targetRef.current = null;
          setIsMoving(false);

          // If there was an icon interaction queued, fire it after a brief pause
          const arrivedIconId = target.iconId;
          if (arrivedIconId) {
            setTimeout(() => onIconInteractRef.current?.(arrivedIconId), ICON_OPEN_DELAY_MS);
          }
        } else {
          next = { x: prev.x + (dx / dist) * step, y: prev.y + (dy / dist) * step };
          if (Math.abs(dx) > 1) setFacing(dx > 0 ? 1 : -1);
          setIsMoving(true);
        }

        posRef.current = next;
        setPos(next);
      }

      animFrameRef.current = requestAnimationFrame(update);
    };

    animFrameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Handle click on the desktop background — walk to that point
  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTarget(e.clientX - rect.left, e.clientY - rect.top);
  }, [setTarget]);

  return (
    <div
      className="absolute inset-0 z-[1] overflow-hidden"
      ref={containerRef}
      onClick={handleDesktopClick}
      style={{ cursor: 'default' }}
    >
      {/* Character Group */}
      {pos && (
        <div
          className="absolute w-16 h-16 pointer-events-none"
          style={{
            transform: `translate(${pos.x - 32}px, ${pos.y - 32}px)`,
            transition: 'none',
          }}
        >
          {/* Inline data-URI sprite: next/image would add nothing here */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
      )}
    </div>
  );
});

PixelRoom.displayName = 'PixelRoom';
export default PixelRoom;
