import React from 'react';
import { motion } from 'motion/react';
import WheatDivider from './WheatDivider';

const VisitPage: React.FC = () => {
    return (
        <div className="bg-cream min-h-dvh w-full overflow-hidden pt-24 pb-24">

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden px-6">
                <div className="absolute inset-0 z-[var(--z-base)]">
                    <div className="w-full h-full bg-forest/10" />
                    {/* Placeholder for a mill exterior shot */}
                </div>

                <div className="relative z-[var(--z-above)] text-center max-w-4xl mx-auto space-y-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                        className="text-clay font-bold uppercase tracking-[0.2em] text-sm md:text-base block"
                    >
                        Waco, Texas
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                        className="font-serif text-6xl md:text-8xl text-forest leading-[0.9] text-balance"
                    >
                        Visit The <br /><span className="italic text-gold">Homestead</span>
                    </motion.h1>
                </div>
            </section>

            <WheatDivider />

            {/* Location & Hours */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <h2 className="font-serif text-4xl text-forest text-balance">Location</h2>
                            <div className="font-sans text-lg text-loam/80 leading-relaxed space-y-2 text-pretty">
                                <p>800 Dry Creek Road, Suite B</p>
                                <p>Waco, Texas 76705</p>
                                <a
                                    href="https://maps.google.com/?q=800+Dry+Creek+Road+Suite+B+Waco+Texas+76705"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-clay hover:text-gold transition-colors duration-200 underline decoration-1 underline-offset-4 mt-2"
                                >
                                    Get Directions
                                </a>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="font-serif text-4xl text-forest text-balance">Hours</h2>
                            <div className="font-sans text-lg text-loam/80 leading-relaxed space-y-2">
                                <div className="flex justify-between max-w-xs border-b border-loam/10 pb-2">
                                    <span>Monday - Saturday</span>
                                    <span className="tabular-nums">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between max-w-xs border-b border-loam/10 pb-2">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-[500px] bg-cream/80 rounded-3xl overflow-hidden relative soft-card"
                    >
                        {/* Map Placeholder - In a real app, embed Google Maps iframe here */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.999999999999!2d-97.12345678901234!3d31.54321098765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMyJzM1LjYiTiA5N8KwMDcnMjQuNCJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Map to Homestead Gristmill"
                        ></iframe>
                        <div className="absolute inset-0 pointer-events-none border-4 border-cream/50 rounded-2xl"></div>
                    </motion.div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-24 bg-forest text-cream">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="font-serif text-5xl md:text-6xl text-balance"
                    >
                        Experience the <span className="italic text-gold">Process</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="font-sans text-xl max-w-3xl mx-auto text-cream/80 leading-relaxed text-pretty"
                    >
                        Watch the water wheel turn and feel the rumble of the stones.
                        We invite you to step back in time and see how real flour is made.
                        Tours are available upon request for groups.
                    </motion.p>
                </div>
            </section>

        </div>
    );
};

export default VisitPage;
