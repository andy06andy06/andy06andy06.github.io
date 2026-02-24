'use client';

import { Camera, GraduationCap, Globe, Cpu } from 'lucide-react';

export default function About() {
    const highlights = [
        {
            icon: <GraduationCap className="w-6 h-6 text-black" />,
            title: "Education",
            description: "B.S. in Biomechatronics Engineering, NTU",
            color: "bg-pink-300"
        },
        {
            icon: <Cpu className="w-6 h-6 text-black" />,
            title: "Focus",
            description: "AI, Robotics, Smart Farming",
            color: "bg-cyan-300"
        },
        {
            icon: <Camera className="w-6 h-6 text-black" />,
            title: "Passion",
            description: "Photography & Visual Storytelling",
            color: "bg-yellow-300"
        },
        {
            icon: <Globe className="w-6 h-6 text-black" />,
            title: "Languages",
            description: "Mandarin, English, Japanese",
            color: "bg-purple-300"
        }
    ];

    return (
        <div className="flex flex-col gap-6 text-black">
            <h2 className="text-3xl font-black mb-4 uppercase border-b-4 border-black pb-2 inline-block self-start">About Me</h2>

            <div className="text-lg font-bold leading-relaxed bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                <p className="mb-4">
                    I am a machine learning engineer and researcher with a deep passion for applying technology to solve real-world problems in agriculture and autonomous systems.
                </p>
                <p className="mb-4">
                    My journey began at National Taiwan University, where I combined my interests in AI and robotics to create solutions for smart farming. I have experience developing vision-based detection systems for livestock, managing training server infrastructure, and building autonomous field robots.
                </p>
                <p>
                    Beyond engineering, I run a photography company, capturing visuals that tell compelling stories. I believe in the power of technology to create meaningful impact.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {highlights.map((item, index) => (
                    <div
                        key={index}
                        className={`p-3 border-2 border-black flex items-center gap-4 ${item.color} shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all`}
                    >
                        <div className="p-2 bg-white border-2 border-black rounded-full shrink-0">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="font-black text-black uppercase">{item.title}</h3>
                            <p className="font-bold text-sm text-black/80">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
