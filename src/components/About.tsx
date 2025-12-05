'use client';

import { motion } from 'framer-motion';
import { Camera, GraduationCap, Globe, Cpu } from 'lucide-react';

export default function About() {
    const highlights = [
        {
            icon: <GraduationCap className="w-6 h-6 text-blue-400" />,
            title: "Education",
            description: "B.S. in Biomechatronics Engineering, National Taiwan University"
        },
        {
            icon: <Cpu className="w-6 h-6 text-purple-400" />,
            title: "Focus",
            description: "AI, Robotics, Smart Farming, Animal Welfare"
        },
        {
            icon: <Camera className="w-6 h-6 text-pink-400" />,
            title: "Passion",
            description: "Photography & Visual Storytelling"
        },
        {
            icon: <Globe className="w-6 h-6 text-green-400" />,
            title: "Languages",
            description: "Mandarin, English, Japanese"
        }
    ];

    return (
        <section id="about" className="py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div className="space-y-6 text-slate-300 leading-relaxed">
                            <p>
                                I am a machine learning engineer and researcher with a deep passion for applying technology to solve real-world problems in agriculture and autonomous systems.
                            </p>
                            <p>
                                My journey began at National Taiwan University, where I combined my interests in AI and robotics to create solutions for smart farming. I have experience developing vision-based detection systems for livestock, managing training server infrastructure, and building autonomous field robots.
                            </p>
                            <p>
                                Beyond engineering, I run a photography company, capturing visuals that tell compelling stories. I believe in the power of technology to create meaningful impact and am always looking for new challenges to tackle.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-4 hover:border-blue-500/50 transition-colors"
                                >
                                    <div className="p-2 rounded-lg bg-slate-700/50">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{item.title}</h3>
                                        <p className="text-sm text-slate-400">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
