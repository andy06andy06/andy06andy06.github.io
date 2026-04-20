'use client';

import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

export default function Projects() {
    const projects = [
        {
            title: "Wordle Online Game",
            category: "Web Dev",
            description: "Developed a full-stack web application using Express serving as RESTful API with Next.js as the framework. Implemented a dual-player mode using WebSocket, where players guess each other's question within limited time.",
            tags: ["Next.js", "Express.js", "PostgresSQL", "Tailwind CSS", "WebSocket"],
            link: "#",
            color: "bg-yellow-100"
        },
        {
            title: "National Field Robot",
            category: "Robotics",
            description: "Applied YOLOv7 for fruit detection (98.3% mAP, 99.1% IOU), enabling robust performance in outdoor field. Managed a 4-person team to deploy computer vision for an autonomous robot.",
            tags: ["YOLOv7", "OpenCV", "Python", "PySerial", "Arduino"],
            link: "#",
            color: "bg-pink-100"
        },
        {
            title: "Pineapple Stage Classifier",
            category: "Machine Learning",
            description: "Trained a ResNet-18 model to classify different growth stages of pineapples which achieved an accuracy of 99.7%. Analyzed the result of the classifier and organized the findings using matplotlib and confusion matrix.",
            tags: ["Python", "Pytorch", "ResNet", "OpenCV"],
            link: "#",
            color: "bg-green-100"
        },
        {
            title: "Remote Control Vacuum Car",
            category: "Robotics",
            description: "Developed an autonomous vacuum cleaning robot capable of navigating obstacles and completing cleaning tasks. Designed and implemented an Arduino/Raspberry Pi-based control architecture for vacuum robot navigation.",
            tags: ["Python", "OpenCV", "Arduino", "Raspberry Pi"],
            link: "#",
            color: "bg-purple-100"
        }
    ];

    return (
        <div className="flex flex-col gap-8 text-black pb-4">
            <div>
                <h2 className="text-3xl font-black mb-6 uppercase border-b-4 border-black pb-2 inline-block">Projects & Competition</h2>

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
        </div>
    );
}
