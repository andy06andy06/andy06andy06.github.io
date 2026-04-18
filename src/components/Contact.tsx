'use client';

import { Mail, Phone, Github, User } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
    const contacts = [
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
    ];

    return (
        <div className="flex flex-col gap-6 text-black p-2 pb-6">
            <h2 className="text-3xl font-black mb-2 uppercase border-b-4 border-black pb-2 inline-block self-start">Contact Info</h2>
            
            <div className="text-sm font-bold mb-2 bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                I'm always open to discussing new projects, research collaborations, or opportunities in AI and robotics. Let's connect!
            </div>

            <div className="flex flex-col gap-4">
                {contacts.map((contact, index) => {
                    const ContentWrapper = contact.link ? Link : 'div';
                    const wrapperProps = contact.link ? { href: contact.link, target: "_blank", rel: "noopener noreferrer" } : {};
                    
                    return (
                        <ContentWrapper
                            key={index}
                            {...wrapperProps}
                            className={`p-3 border-2 border-black flex items-center gap-4 ${contact.color} shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all ${contact.link ? 'cursor-pointer' : ''}`}
                        >
                            <div className="p-2 bg-white border-2 border-black rounded-full shrink-0">
                                {contact.icon}
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-black text-black uppercase text-xs">{contact.label}</h3>
                                <p className="font-bold text-sm text-black/90 truncate">{contact.value}</p>
                            </div>
                        </ContentWrapper>
                    );
                })}
            </div>
        </div>
    );
}
