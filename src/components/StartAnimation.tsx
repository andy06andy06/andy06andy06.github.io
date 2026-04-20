'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface StartAnimationProps {
    isAnimating: boolean;
}

export default function StartAnimation({ isAnimating }: StartAnimationProps) {
    const colors = ['#f472b6', '#2dd4bf', '#fde047', '#c084fc', '#000000'];

    return (
        <AnimatePresence>
            {isAnimating && (
                <div className="fixed inset-0 z-[9999] pointer-events-none flex">
                    {colors.map((color, index) => (
                        <motion.div
                            key={index}
                            className="flex-1 h-full"
                            style={{ backgroundColor: color }}
                            initial={{ y: '-100%' }}
                            animate={{ y: '0%' }}
                            exit={{
                                y: '100%',
                                transition: {
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: index * 0.1
                                }
                            }}
                            transition={{
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1], // Custom bouncy ease
                                delay: index * 0.1
                            }}
                        />
                    ))}
                    {/* Retro Text Overlay */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5, transition: { delay: 0 } }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <div className="relative hover:-translate-y-2 transition-transform cursor-default">
                            {/* 3D blue block layers (back to front) */}
                            {Array.from({ length: 10 }, (_, i) => 10 - i).map((offset) => (
                                <h1
                                    key={offset}
                                    className="text-5xl md:text-8xl font-black uppercase text-center px-4 absolute inset-0"
                                    style={{
                                        color: offset <= 2 ? '#1e3a8a' : '#3b82f6',
                                        WebkitTextStroke: '2px #1e3a8a',
                                        paintOrder: 'stroke fill',
                                        transform: `translate(${offset}px, ${offset}px)`,
                                    }}
                                    aria-hidden="true"
                                >
                                    Cheng En Chiang
                                </h1>
                            ))}
                            {/* Front face */}
                            <h1
                                className="text-5xl md:text-8xl font-black uppercase text-center px-4 relative"
                                style={{
                                    color: '#ffffff',
                                    WebkitTextStroke: '6px #000',
                                    paintOrder: 'stroke fill',
                                }}
                            >
                                Cheng En Chiang
                            </h1>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
