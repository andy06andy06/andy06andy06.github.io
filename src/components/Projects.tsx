'use client';

import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

export default function Projects() {
    const projects = [
        {
            title: "Livestock Monitoring Systems",
            category: "Research",
            description: "Developed vision-based detection systems including lameness detection using U-Net and behavior analysis of piglets with YOLO and LSTM.",
            tags: ["PyTorch", "Computer Vision", "Deep Learning"],
            link: "#",
            color: "bg-cyan-100"
        },
        {
            title: "Autonomous Field Robots",
            category: "Robotics",
            description: "Designed and built autonomous robots for agricultural applications, integrating hardware control with software logic.",
            tags: ["Robotics", "Arduino", "C++"],
            link: "#",
            color: "bg-pink-100"
        },
        {
            title: "Multiplayer Web Applications",
            category: "Web Dev",
            description: "Built full-stack multiplayer web applications, handling both frontend user experience and backend logic.",
            tags: ["React", "Next.js", "Node.js"],
            link: "#",
            color: "bg-yellow-100"
        },
        {
            title: "Raspberry Pi Robotics",
            category: "Robotics",
            description: "Created various robotics projects using Raspberry Pi, focusing on real-time control and sensor integration.",
            tags: ["Raspberry Pi", "Python", "IoT"],
            link: "#",
            color: "bg-purple-100"
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
        <div className="flex flex-col gap-8 text-black pb-4">
            <div>
                <h2 className="text-3xl font-black mb-6 uppercase border-b-4 border-black pb-2 inline-block">Projects & Research</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`border-4 border-black p-5 flex flex-col ${project.color} shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] transition-all`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase border-2 border-black">
                                    {project.category}
                                </span>
                                <div className="flex gap-2">
                                    <Link href={project.link} className="p-1 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors">
                                        <Github size={18} />
                                    </Link>
                                    <Link href={project.link} className="p-1 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors">
                                        <ExternalLink size={18} />
                                    </Link>
                                </div>
                            </div>

                            <h3 className="text-xl font-black mb-2 uppercase leading-tight">{project.title}</h3>
                            <p className="font-bold text-sm mb-4 flex-1">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="px-2 py-1 bg-white border-2 border-black text-xs font-bold shadow-[2px_2px_0_0_#000]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_#000]">
                <h3 className="text-2xl font-black mb-6 uppercase">Publications & Talks</h3>
                <div className="space-y-6">
                    {publications.map((pub, index) => (
                        <div key={index} className="flex gap-4 items-start border-l-4 border-[var(--primary-cyan)] pl-4">
                            <div>
                                <h4 className="text-lg font-black uppercase">{pub.title}</h4>
                                <span className="inline-block bg-[#fde047] border-2 border-black px-2 py-0.5 text-xs font-bold uppercase my-1">
                                    {pub.role}
                                </span>
                                <p className="font-bold text-sm">{pub.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
