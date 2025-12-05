'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import selfImg from '@/assets/self_img.png';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 text-white pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-1/2 -right-1/2 w-[1000px] h-[1000px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Text Content */}
                    <div className="text-center md:text-left order-2 md:order-1">
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
                            className="flex justify-center md:justify-start gap-6 mb-12"
                        >
                            <Link
                                href="https://github.com/andy06andy06"
                                target="_blank"
                                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white border border-slate-700 hover:border-blue-500/50"
                            >
                                <Github size={24} />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/%E6%89%BF%E6%81%A9-%E6%B1%9F-a9642b324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                                target="_blank"
                                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white border border-slate-700 hover:border-blue-500/50"
                            >
                                <Linkedin size={24} />
                            </Link>
                            <Link
                                href="mailto:andy06andy06@gmail.com"
                                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white border border-slate-700 hover:border-blue-500/50"
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
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all text-white font-medium shadow-lg shadow-blue-500/25"
                            >
                                View My Work
                                <ArrowDown size={20} />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="order-1 md:order-2 flex justify-center"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                            {/* Decorative glow behind image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />

                            {/* Image Container */}
                            <div className="relative w-full h-full rounded-full border-4 border-slate-800 overflow-hidden shadow-2xl">
                                <Image
                                    src={selfImg}
                                    alt="Cheng-En Chiang"
                                    fill
                                    className="object-cover"
                                    priority
                                    placeholder="blur"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
