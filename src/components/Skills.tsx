'use client';

export default function Skills() {
    const skillCategories = [
        {
            title: "AI & Machine Learning",
            skills: ["Python", "PyTorch", "Computer Vision", "YOLO", "U-Net", "LSTM", "Deep Learning"],
            color: "bg-pink-400"
        },
        {
            title: "Web Development",
            skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Full-stack"],
            color: "bg-yellow-400"
        },
        {
            title: "Infrastructure & DevOps",
            skills: ["Docker", "Kubernetes", "Linux", "Server Admin"],
            color: "bg-cyan-400"
        },
        {
            title: "Hardware & Robotics",
            skills: ["Arduino", "Raspberry Pi", "Autonomous Systems", "Robotics"],
            color: "bg-purple-400"
        }
    ];

    return (
        <div className="flex flex-col gap-6 text-black pb-4">
            <h2 className="text-3xl font-black mb-2 uppercase border-b-4 border-black pb-2 inline-block self-start">Technical Skills</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillCategories.map((category, index) => (
                    <div
                        key={index}
                        className="bg-white border-4 border-black p-4 shadow-[4px_4px_0_0_#000]"
                    >
                        <h3 className={`text-xl font-black uppercase mb-4 inline-block ${category.color} px-2 py-1 border-2 border-black`}>
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, skillIndex) => (
                                <span
                                    key={skillIndex}
                                    className="px-2 py-1 bg-white border-2 border-black text-sm font-bold shadow-[2px_2px_0_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#000] cursor-default transition-all"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
