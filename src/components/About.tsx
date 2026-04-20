'use client';

import { Briefcase, GraduationCap } from 'lucide-react';

export default function About() {
    const experiences = [
        {
            title: "Researcher, Server Administrator",
            company: "Lab of Machine Learning and Machine Vision",
            date: "July 2023 -- Present",
            description: "Developed pose estimation systems and administered high-performance GPU clusters.",
            color: "bg-cyan-300"
        },
        {
            title: "Researcher",
            company: "Lab of Bioproduction and Machinery",
            date: "April 2025 -- April 2026",
            description: "Developed monitoring systems for piglets and conducted full-stack development workshops.",
            color: "bg-pink-300"
        },
        {
            title: "Undergraduate Researcher",
            company: "National Science and Technology Council",
            date: "July 2023 -- Feb. 2024",
            description: "Developed ML & CV solutions for lameness detection in the pig farming industry.",
            color: "bg-yellow-300"
        }
    ];

    const education = [
        {
            degree: "Dual Degree Program (Master) in Biomechatronics Engineering & Agro-Bioresources Sciences",
            school: "National Taiwan University & University of Tsukuba",
            date: "Sep. 2024 -- June 2027 (Expected)",
            color: "bg-purple-300"
        },
        {
            degree: "Bachelor of Science in Biomechatronics Engineering",
            school: "National Taiwan University",
            date: "Sept. 2020 -- June 2024",
            color: "bg-green-300"
        }
    ];

    return (
        <div className="flex flex-col gap-8 text-black p-2 pb-6">
            <div>
                <h2 className="text-3xl font-black mb-2 uppercase border-b-4 border-black pb-2 inline-block self-start">About Me</h2>
                <div className="text-lg font-bold leading-relaxed bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                    <p>
                        I am a researcher and engineer with a deep passion for applying AI and computer vision to solve real-world problems. With experience spanning full-stack development, server administration, and agricultural robotics, I strive to bridge the gap between research algorithms and deployable solutions.
                    </p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-black mb-4 uppercase flex items-center gap-2">
                    <Briefcase className="w-6 h-6" /> Work Experience
                </h2>
                <div className="flex flex-col gap-4">
                    {experiences.map((exp, index) => (
                        <div key={index} className={`p-4 border-2 border-black ${exp.color} shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all`}>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                                <h3 className="font-black text-xl uppercase">{exp.title}</h3>
                                <span className="font-bold text-sm bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#000] mt-2 md:mt-0">{exp.date}</span>
                            </div>
                            <p className="font-bold text-lg mb-1">{exp.company}</p>
                            <p className="font-bold text-sm text-black/80">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-black mb-4 uppercase flex items-center gap-2">
                    <GraduationCap className="w-6 h-6" /> Education
                </h2>
                <div className="flex flex-col gap-4">
                    {education.map((edu, index) => (
                        <div key={index} className={`p-4 border-2 border-black ${edu.color} shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all`}>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                <h3 className="font-black text-lg uppercase leading-tight md:max-w-[70%]">{edu.degree}</h3>
                                <span className="font-bold text-sm bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#000] mt-2 md:mt-0 whitespace-nowrap">{edu.date}</span>
                            </div>
                            <p className="font-bold">{edu.school}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
