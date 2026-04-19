'use client';

import { useEffect, useRef } from 'react';

export default function ClickSound() {
    const audioCtxRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        const playSound = () => {
            if (!audioCtxRef.current) {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                if (!AudioContext) return;
                audioCtxRef.current = new AudioContext();
            }

            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Modern soft UI tick sound
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1000, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.02);

            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.02);
        };

        window.addEventListener('pointerdown', playSound);

        return () => {
            window.removeEventListener('pointerdown', playSound);
            if (audioCtxRef.current) {
                audioCtxRef.current.close();
            }
        };
    }, []);

    return null;
}
