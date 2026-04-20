'use client';

import Link from 'next/link';
import { contactData } from '@/data/portfolio';

export default function Contact() {
    const { message, contacts } = contactData;

    return (
        <div className="flex flex-col gap-6 text-black p-2 pb-6">
            <h2 className="text-3xl font-black mb-2 uppercase border-b-4 border-black pb-2 inline-block self-start">Contact Info</h2>
            
            <div className="text-sm font-bold mb-2 bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
                {message}
            </div>

            <div className="flex flex-col gap-4">
                {contacts.map((contact, index) => {
                    const className = `p-3 border-2 border-black flex items-center gap-4 ${contact.color} shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all ${contact.link ? 'cursor-pointer' : ''}`;
                    
                    const innerContent = (
                        <>
                            <div className="p-2 bg-white border-2 border-black rounded-full shrink-0">
                                {contact.icon}
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-black text-black uppercase text-xs">{contact.label}</h3>
                                <p className="font-bold text-sm text-black/90 truncate">{contact.value}</p>
                            </div>
                        </>
                    );

                    if (contact.link) {
                        return (
                            <Link
                                key={index}
                                href={contact.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={className}
                            >
                                {innerContent}
                            </Link>
                        );
                    }

                    return (
                        <div key={index} className={className}>
                            {innerContent}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
