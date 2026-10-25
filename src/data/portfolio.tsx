import React from 'react';
import { User, Phone, Mail, Github } from 'lucide-react';

export const profile = {
    name: "Cheng-En Chiang",
    tagline: "AI Research Engineer · ML & CV",
};

export const aboutData = {
    description: "I am an AI research engineer with a deep passion for applying AI and computer vision to solve real-world problems. With experience spanning computer vision for precision livestock farming, GPU cluster and Kubernetes infrastructure, and full-stack development, I strive to bridge the gap between research algorithms and deployable solutions.",
    experiences: [
        {
            title: "AI Research Engineer",
            company: "Lab of Machine Learning and Machine Vision",
            date: "Jul. 2023 – Present",
            description: "Developed a pose estimation system using EfficientNet to track 16 keypoints with 3.75 pixels RMSE, and achieved 91% accuracy in classifying lameness across 32 pigs by integrating gait features with an SVM classifier.",
            color: "bg-cyan-300"
        },
        {
            title: "Server Administrator",
            company: "Lab of Machine Learning and Machine Vision",
            date: "Jul. 2023 – Apr. 2025",
            description: "Orchestrated 6 high-performance GPU clusters using Kubernetes, enabling scalable compute resources and secure remote access for 50+ researchers across Taiwan and Japan.",
            color: "bg-green-300"
        },
        {
            title: "AI Research Engineer",
            company: "Lab of Bioproduction and Machinery",
            date: "Apr. 2025 – Apr. 2026",
            description: "Developed a behavior monitoring system for piglets using YOLOv11 and EfficientNet-LSTM, achieving 83.1% MOTA in tracking and 93.0% accuracy in behavior classification. Conducted full-stack development workshops for lab members and a partner university in the Philippines.",
            color: "bg-pink-300"
        },
        {
            title: "Undergraduate Research Engineer",
            company: "National Science and Technology Council",
            date: "Jul. 2023 – Feb. 2024",
            description: "Developed ML & CV solutions for the pig farming industry, designing a CV-based lameness detection system that replaces a 40,000 USD pressure mat method, in collaboration with farm staff.",
            color: "bg-yellow-300"
        },
        {
            title: "Teaching Assistant",
            company: "National Taiwan University",
            date: "Jan. 2024 – Jun. 2024",
            description: "Assigned as a TA for the data science course and designed a programming assignment for 40+ students.",
            color: "bg-purple-300"
        }
    ],
    education: [
        {
            degree: "Dual Degree Program (Master) in Biomechatronics Engineering & Agro-Bioresources Sciences and Technology",
            school: "National Taiwan University & University of Tsukuba",
            date: "Sep. 2024 – Jun. 2027 (Expected)",
            color: "bg-purple-300"
        },
        {
            degree: "Bachelor of Science in Biomechatronics Engineering",
            school: "National Taiwan University",
            date: "Sep. 2020 – Jun. 2024",
            color: "bg-green-300"
        }
    ]
};

export const projectsData = [
    {
        title: "AI-Assisted Observability Stack",
        category: "DevOps",
        description: "Built a Kubernetes observability stack with Prometheus, Grafana, Alertmanager, and OpenSearch with Fluent Bit, routing alerts to Mattermost and exposing services through Traefik and Gateway API. Designed a read-only AI agent with scoped RBAC and output masking, validated by 35 automated security tests.",
        tags: ["Kubernetes", "Claude Code", "Prometheus", "Grafana", "OpenSearch"],
        link: "#",
        color: "bg-cyan-100"
    },
    {
        title: "Wordle Online Game",
        category: "Web Dev",
        description: "Built a Next.js and PostgreSQL platform using Drizzle ORM to manage game logic and player statistics. Integrated NextAuth.js for authentication and Zod for strict API schema validation to ensure system stability.",
        tags: ["Next.js", "Node.js", "PostgreSQL", "Socket.io"],
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
        skills: ["Pytorch", "Tensorflow", "CUDA", "Nsight", "HuggingFace", "TensorRT"],
        color: "bg-pink-400"
    },
    {
        title: "Development",
        skills: ["Python", "C++", "C", "Java", "Swift", "JavaScript", "HTML/CSS", "React", "Next.js", "Arduino", "Raspberry Pi"],
        color: "bg-yellow-400"
    },
    {
        title: "Infrastructure & Data",
        skills: ["Linux", "Docker", "Kubernetes", "Prometheus", "OpenSearch", "Grafana", "Git", "PostgreSQL", "MongoDB"],
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
