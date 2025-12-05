'use client';

import { motion } from 'framer-motion';

export default function Skills() {
    const skillCategories = [
        {
            title: "AI & Machine Learning",
            skills: ["Python", "PyTorch", "Computer Vision", "YOLO", "U-Net", "LSTM", "Deep Learning"]
        },
        {
            title: "Web Development",
            skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Full-stack Development"]
        },
        {
            title: "Infrastructure & DevOps",
            skills: ["Docker", "Kubernetes", "Linux", "Server Administration"]
        },
        {
            title: "Hardware & Robotics",
            skills: ["Arduino", "Raspberry Pi", "Autonomous Systems", "Robotics"]
        }
    ];

    return (
        <section id="skills" className="py-20 bg-slate-950 text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Technical Skills</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skillCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/30 transition-all hover:-translate-y-1"
                            >
                                <h3 className="text-xl font-semibold mb-6 text-blue-400">{category.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="px-3 py-1 rounded-full bg-slate-800 text-sm text-slate-300 border border-slate-700"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
