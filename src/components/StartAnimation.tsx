'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Text3D from '@/components/Text3D';
import { profile } from '@/data/portfolio';

interface StartAnimationProps {
    isAnimating: boolean;
}

export default function StartAnimation({ isAnimating }: StartAnimationProps) {
    const colors = ['var(--primary-pink)', 'var(--primary-cyan)', 'var(--primary-yellow)', 'var(--primary-purple)', '#000000'];

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
                            <Text3D as="p" text={profile.name} className="text-5xl md:text-8xl px-4" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
