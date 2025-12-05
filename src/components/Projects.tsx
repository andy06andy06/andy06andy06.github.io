'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

export default function Projects() {
    const projects = [
        {
            title: "Livestock Monitoring Systems",
            category: "Research",
            description: "Developed vision-based detection systems including lameness detection using U-Net and behavior analysis of piglets with YOLO and LSTM.",
            tags: ["PyTorch", "Computer Vision", "Deep Learning"],
            link: "#"
        },
        {
            title: "Autonomous Field Robots",
            category: "Robotics",
            description: "Designed and built autonomous robots for agricultural applications, integrating hardware control with software logic.",
            tags: ["Robotics", "Arduino", "C++"],
            link: "#"
        },
        {
            title: "Multiplayer Web Applications",
            category: "Web Dev",
            description: "Built full-stack multiplayer web applications, handling both frontend user experience and backend logic.",
            tags: ["React", "Next.js", "Node.js"],
            link: "#"
        },
        {
            title: "Raspberry Pi Robotics",
            category: "Robotics",
            description: "Created various robotics projects using Raspberry Pi, focusing on real-time control and sensor integration.",
            tags: ["Raspberry Pi", "Python", "IoT"],
            link: "#"
        }
    ];

    const publications = [
        {
            title: "Frontiers in Animal Science",
            role: "Co-author",
            description: "Published research on animal welfare and monitoring technology."
        },
        {
            title: "International Conferences",
            role: "Presenter",
            description: "Presented research findings at conferences in Jeju and Bali."
        }
    ];

    return (
        <section id="projects" className="py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Projects & Research</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl bg-slate-800 border border-slate-700 hover:border-blue-500/50 transition-all"
                            >
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-blue-400 text-sm font-medium tracking-wider uppercase">{project.category}</span>
                                        <div className="flex gap-3">
                                            <Link href={project.link} className="text-slate-400 hover:text-white transition-colors">
                                                <Github size={20} />
                                            </Link>
                                            <Link href={project.link} className="text-slate-400 hover:text-white transition-colors">
                                                <ExternalLink size={20} />
                                            </Link>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                    <p className="text-slate-400 mb-6">{project.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span key={tagIndex} className="px-3 py-1 rounded-full bg-slate-900/50 text-xs text-slate-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-slate-800/50 rounded-3xl p-8 md:p-12">
                        <h3 className="text-2xl font-bold mb-8 text-center">Publications & Talks</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {publications.map((pub, index) => (
                                <div key={index} className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-1">{pub.title}</h4>
                                        <span className="text-blue-400 text-sm mb-2 block">{pub.role}</span>
                                        <p className="text-slate-400">{pub.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
