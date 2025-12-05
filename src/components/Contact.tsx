'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
    return (
        <section id="contact" className="py-20 bg-slate-950 text-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Let&apos;s Connect</h2>
                    <p className="text-slate-400 text-lg mb-10">
                        I&apos;m always open to discussing new projects, research collaborations, or opportunities in AI and robotics.
                    </p>

                    <Link
                        href="mailto:andy06andy06@gmail.com"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 transition-all hover:scale-105 font-medium text-lg"
                    >
                        <Mail size={24} />
                        Send me an email
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
