'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 text-white">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-1/2 -right-1/2 w-[1000px] h-[1000px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl md:text-2xl font-medium text-blue-400 mb-4">
                            Hello, I&apos;m
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            Cheng-En Chiang
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                            Machine Learning Engineer & Researcher
                            <br />
                            <span className="text-base md:text-lg text-slate-400 mt-2 block">
                                Specializing in Computer Vision, Deep Learning, and Autonomous Systems
                            </span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center gap-6 mb-12"
                    >
                        <Link
                            href="https://github.com"
                            target="_blank"
                            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white"
                        >
                            <Github size={24} />
                        </Link>
                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white"
                        >
                            <Linkedin size={24} />
                        </Link>
                        <Link
                            href="mailto:example@email.com"
                            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white"
                        >
                            <Mail size={24} />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link
                            href="#about"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium"
                        >
                            View My Work
                            <ArrowDown size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
