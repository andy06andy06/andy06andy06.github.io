import React from 'react';
import { User, Phone, Mail, Github } from 'lucide-react';

export const aboutData = {
    description: "I am a researcher and engineer with a deep passion for applying AI and computer vision to solve real-world problems. With experience spanning full-stack development, server administration, and agricultural robotics, I strive to bridge the gap between research algorithms and deployable solutions.",
    experiences: [
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
    ],
    education: [
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
    ]
};

export const projectsData = [
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

export const skillsData = [
    {
        title: "AI & Computing",
        skills: ["Pytorch", "Tensorflow", "CUDA", "HuggingFace", "TensorRT"],
        color: "bg-pink-400"
    },
    {
        title: "Software Development",
        skills: ["Python", "C++", "Java", "Swift", "JavaScript", "HTML/CSS", "React", "Next.js"],
        color: "bg-yellow-400"
    },
    {
        title: "Infrastructure & Data",
        skills: ["Linux", "Docker", "Kubernetes", "Git", "MySQL", "PostgreSQL", "MongoDB", "Arduino", "Raspberry Pi"],
        color: "bg-cyan-400"
    },
    {
        title: "Language",
        skills: ["Mandarin(Native)", "English(Fluent, TOEIC L&R 860)", "Japanese(Fluent, N1)"],
        color: "bg-purple-400"
    }
];

export const contactData = {
    message: "I'm always open to discussing new projects, research collaborations, or opportunities in AI and robotics. Let's connect!",
    contacts: [
        {
            icon: <User className="w-6 h-6 text-black" />,
            label: "Name",
            value: "Cheng-En Chiang",
            color: "bg-pink-300",
            link: null
        },
        {
            icon: <Phone className="w-6 h-6 text-black" />,
            label: "Phone",
            value: "(+886) 908055301",
            color: "bg-cyan-300",
            link: "tel:+886908055301"
        },
        {
            icon: <Mail className="w-6 h-6 text-black" />,
            label: "Personal Email",
            value: "andy06andy06@gmail.com",
            color: "bg-yellow-300",
            link: "mailto:andy06andy06@gmail.com"
        },
        {
            icon: <Mail className="w-6 h-6 text-black" />,
            label: "Academic Email",
            value: "r13631012@ntu.edu.tw",
            color: "bg-purple-300",
            link: "mailto:r13631012@ntu.edu.tw"
        },
        {
            icon: <Github className="w-6 h-6 text-black" />,
            label: "GitHub",
            value: "github.com/andy06andy06",
            color: "bg-green-300",
            link: "https://github.com/andy06andy06"
        }
    ]
};
