import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WheatDivider from './WheatDivider';

const StoryPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div ref={containerRef} className="bg-cream min-h-screen w-full overflow-hidden pt-24 pb-24">

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden px-6">
                <motion.div
                    style={{ y: yParallax, opacity: opacityFade }}
                    className="absolute inset-0 z-0"
                >
                    {/* Placeholder for a historical map or mill image */}
                    <div className="w-full h-full bg-[url('/story/hero-background.png')] bg-cover bg-center opacity-20 grayscale" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-clay font-bold uppercase tracking-[0.2em] text-sm md:text-base block"
                    >
                        Est. 1760 • Long Valley, NJ
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-serif text-6xl md:text-8xl text-forest leading-[0.9]"
                    >
                        A Mill <br /><span className="italic text-gold">Reborn</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="font-sans text-xl md:text-2xl text-loam/80 max-w-2xl mx-auto leading-relaxed"
                    >
                        From the banks of the Musconetcong River to the heart of Texas. A story of timber, stone, and the resilience of honest work.
                    </motion.p>
                </div>
            </section>

            <WheatDivider />

            {/* Chapter 1: The Beginning */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <span className="text-gold font-bold text-6xl md:text-8xl font-serif opacity-40 block">1760</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-forest">The Foundation</h2>
                        <p className="font-sans text-lg text-loam/80 leading-relaxed">
                            Built in the Long Valley of western New Jersey, this timber-frame watermill began its life grinding grain for the local community. It was a time when the rhythm of life was dictated by the seasons and the flow of the river.
                        </p>
                        <p className="font-sans text-lg text-loam/80 leading-relaxed">
                            During the American Revolution (1780-1781), the Mott brothers, who owned the mill, supplied flour to George Washington's soldiers encamped at Morristown. Every bag of flour was a lifeline to the fight for independence.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] bg-bone rounded-t-[200px] overflow-hidden"
                    >
                        <img
                            src="/story/chapter1-timber.png"
                            alt="Old timber frame structure"
                            className="w-full h-full object-cover sepia-[0.5] hover:sepia-0 transition-all duration-1000"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Chapter 2: The Silence */}
            <section className="py-32 px-6 md:px-12 bg-forest text-cream relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] mix-blend-overlay pointer-events-none" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="order-2 md:order-1 relative h-[500px] w-full"
                    >
                        <div className="absolute inset-0 border-2 border-gold/30 rounded-full animate-[spin_60s_linear_infinite]" />
                        <div className="absolute inset-4 border border-gold/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                        <img
                            src="/story/chapter2-machinery.png"
                            alt="Abandoned machinery"
                            className="absolute inset-12 w-[calc(100%-6rem)] h-[calc(100%-6rem)] object-cover rounded-full grayscale contrast-125"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="space-y-8 order-1 md:order-2"
                    >
                        <span className="text-gold font-bold text-6xl md:text-8xl font-serif opacity-40 block">1918</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-cream">The Long Silence</h2>
                        <p className="font-sans text-lg text-cream/80 leading-relaxed">
                            After nearly 160 years of continuous operation, the wheel stopped turning. The mill closed its doors in 1918, falling silent as the world rushed towards industrialization.
                        </p>
                        <p className="font-sans text-lg text-cream/80 leading-relaxed">
                            For decades, it stood as a quiet sentinel of a bygone era, its timbers aging, its stones still. It became a relic, a memory of when food was made with patience.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Chapter 3: The Resurrection */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <span className="text-clay font-bold text-6xl md:text-8xl font-serif opacity-40 block">2001</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-forest">A New Home</h2>
                        <p className="font-sans text-lg text-loam/80 leading-relaxed">
                            In 2000, we found the mill. It was dilapidated but its soul was intact. We knew it had to be saved.
                        </p>
                        <p className="font-sans text-lg text-loam/80 leading-relaxed">
                            Piece by piece, beam by beam, we dismantled the structure. We numbered every timber and transported it 1,700 miles to Waco, Texas. It was a labor of love, a resurrection of heritage.
                        </p>
                        <p className="font-sans text-lg text-loam/80 leading-relaxed">
                            Today, the water wheel turns again. The stones crush grain grown right here on our farm. The smell of fresh flour fills the air once more.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <img
                            src="/story/chapter3-construction.png"
                            alt="Construction detail"
                            className="w-full h-64 object-cover rounded-tl-[80px]"
                        />
                        <img
                            src="/story/chapter3-wheat.png"
                            alt="Wheat field"
                            className="w-full h-64 object-cover rounded-br-[80px] mt-12"
                        />
                    </motion.div>
                </div>
            </section>

            <WheatDivider />

            {/* Philosophy / Process */}
            <section className="py-32 px-6 text-center max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="font-serif text-5xl md:text-7xl text-forest mb-12"
                >
                    Slow by <span className="italic text-clay">Design</span>
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { title: "Stone Ground", desc: "Granite stones crush the grain, keeping the germ and bran intact for maximum nutrition and flavor." },
                        { title: "Water Powered", desc: "Harnessing the natural energy of the water, just as it was done centuries ago." },
                        { title: "Non-GMO", desc: "We only mill grains that are non-GMO, chemical-free, and grown with respect for the land." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h3 className="font-serif text-2xl text-gold">{item.title}</h3>
                            <p className="font-sans text-loam/70">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="font-serif text-3xl text-forest mb-8">Taste the difference of history.</p>
                    <a
                        href="/products"
                        className="inline-block bg-clay text-cream px-12 py-4 rounded-full font-sans uppercase tracking-widest text-sm hover:bg-gold transition-colors duration-300"
                    >
                        Shop Our Grains
                    </a>
                </motion.div>
            </section>

        </div>
    );
};

export default StoryPage;
