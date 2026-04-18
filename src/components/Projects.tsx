'use client';

import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

export default function Projects() {
    const projects = [
        {
            title: "Livestock Monitoring Systems",
            category: "Research",
            description: "Developed vision-based lameness detection using U-Net and pose estimation, and piglet behavior analysis with YOLOv11 and EfficientNet-LSTM.",
            tags: ["PyTorch", "Computer Vision", "Deep Learning"],
            link: "#",
            color: "bg-cyan-100"
        },
        {
            title: "National Field Robot",
            category: "Robotics",
            description: "Directed a software team integrating CV into an autonomous field robot using YOLOv7 for fruit detection (98.3% mAP).",
            tags: ["Robotics", "Arduino", "Python"],
            link: "#",
            color: "bg-pink-100"
        },
        {
            title: "Wordle Online Game",
            category: "Web Dev",
            description: "Built full-stack multiplayer web app with dual-player mode using Next.js, Express, PostgreSQL, and WebSockets.",
            tags: ["Next.js", "Express", "WebSocket"],
            link: "#",
            color: "bg-yellow-100"
        },
        {
            title: "Remote Control Vacuum Car",
            category: "Robotics",
            description: "Developed an autonomous vacuum cleaning robot capable of navigating obstacles using Arduino and Raspberry Pi.",
            tags: ["Raspberry Pi", "Arduino", "OpenCV"],
            link: "#",
            color: "bg-purple-100"
        },
        {
            title: "Pineapple Stage Classifier",
            category: "Machine Learning",
            description: "Trained a ResNet-18 model to classify pineapple growth stages with an accuracy of 99.7%.",
            tags: ["ResNet", "PyTorch", "Python"],
            link: "#",
            color: "bg-green-100"
        }
    ];

    const publications = [
        {
            title: "Frontiers in Animal Science",
            role: "Co-author",
            description: "Monitoring the lactation-related behaviors of sows and their piglets in farrowing crates using deep learning."
        },
        {
            title: "XX CIGR World Congress 2026, Turin",
            role: "Oral Presentation",
            description: "Lameness detection of gilts based on posture analysis using deep learning."
        },
        {
            title: "11th ISMAB, Bali",
            role: "Oral Presentation",
            description: "A pig foot detection and tracking approach for gait evaluation."
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
