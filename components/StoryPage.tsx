import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Phone, ChevronDown } from 'lucide-react';

const StoryPage: React.FC = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);

    const scrollToContent = () => {
        document.getElementById('chapter-1')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-cream min-h-screen w-full overflow-hidden">

            {/* Hero Section - Full Bleed */}
            <section className="relative h-dvh flex items-center justify-center overflow-hidden">
                {/* Background Image with Parallax */}
                <motion.div
                    style={{ scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-forest/60 z-10" />
                    <img
                        src="/story/hero-background.png"
                        alt="Historic mill"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-20 text-center max-w-4xl mx-auto px-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mb-6"
                    >
                        <span className="inline-block bg-gold/20 backdrop-blur-sm border border-gold/30 text-gold px-4 py-2 rounded-full font-sans uppercase tracking-[0.2em] text-xs">
                            Est. 1760 • Long Valley, NJ
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="font-serif text-5xl md:text-8xl lg:text-9xl text-cream leading-[0.9] mb-8 text-balance"
                    >
                        A Mill<br />
                        <span className="text-gold">Reborn</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="font-sans text-xl md:text-2xl text-cream/80 max-w-2xl mx-auto leading-relaxed mb-12 text-pretty"
                    >
                        From the banks of the Musconetcong River to the heart of Texas.
                        A story of timber, stone, and the resilience of honest work.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        onClick={scrollToContent}
                        className="text-cream/60 hover:text-cream transition-colors flex flex-col items-center gap-2 mx-auto"
                    >
                        <span className="font-sans text-xs uppercase tracking-widest">Discover Our Story</span>
                        <motion.span
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                            whileInView={{ y: [0, 6, 0] }}
                            viewport={{ once: false, amount: 0.5 }}
                        >
                            <ChevronDown size={24} />
                        </motion.span>
                    </motion.button>
                </motion.div>
            </section>

            {/* Timeline Indicator */}
            <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-px h-16 bg-forest/20" />
                    <span className="font-serif text-sm text-forest/40 -rotate-90 whitespace-nowrap origin-center">1760 — 2001</span>
                    <div className="w-px h-16 bg-forest/20" />
                </div>
            </div>

            {/* Chapter 1: The Beginning */}
            <section id="chapter-1" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-gold font-serif text-6xl md:text-7xl lg:text-9xl opacity-30">1760</span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight">
                            The Foundation
                        </h2>
                        <div className="w-16 h-1 bg-gold" />
                        <p className="font-sans text-lg text-loam/80 leading-relaxed">
                            Built in the Long Valley of western New Jersey, this timber-frame watermill
                            began its life grinding grain for the local community. The rhythm of life
                            was dictated by the seasons and the flow of the river.
                        </p>
                        <p className="font-sans text-lg text-loam/80 leading-relaxed">
                            During the American Revolution (1780-1781), the Mott brothers supplied flour
                            to George Washington's soldiers encamped at Morristown. Every bag of flour
                            was a lifeline to the fight for independence.
                        </p>
                        <div className="pt-4">
                            <p className="font-sans text-sm text-forest/60 italic border-l-2 border-gold pl-4">
                                "A mill is more than machinery—it's a covenant between the land and its people."
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/story/chapter1-timber.png"
                                alt="Old timber frame structure"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold/30 rounded-2xl -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* Chapter 2: The Silence */}
            <section className="py-24 md:py-32 bg-forest text-cream relative overflow-hidden">
                {/* Subtle texture */}
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                    }} />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="relative aspect-square max-w-md mx-auto">
                                {/* Spinning rings - viewport controlled */}
                                <motion.div
                                    className="absolute inset-0 border border-gold/20 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                                    whileInView={{ rotate: 360 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                />
                                <motion.div
                                    className="absolute inset-8 border border-gold/30 rounded-full"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                                    whileInView={{ rotate: -360 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                />

                                <div className="absolute inset-16 rounded-full overflow-hidden shadow-2xl">
                                    <img
                                        src="/story/chapter2-machinery.png"
                                        alt="Abandoned machinery"
                                        className="w-full h-full object-cover grayscale"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6 order-1 lg:order-2"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-gold font-serif text-6xl md:text-7xl lg:text-9xl opacity-30">1918</span>
                            </div>
                            <h2 className="font-serif text-4xl md:text-5xl text-cream leading-tight">
                                The Long Silence
                            </h2>
                            <div className="w-16 h-1 bg-gold" />
                            <p className="font-sans text-lg text-cream/80 leading-relaxed">
                                After nearly 160 years of continuous operation, the wheel stopped turning.
                                The mill closed its doors in 1918, falling silent as the world rushed
                                towards industrialization.
                            </p>
                            <p className="font-sans text-lg text-cream/80 leading-relaxed">
                                For decades, it stood as a quiet sentinel of a bygone era—its timbers aging,
                                its stones still. A relic of when food was made with patience and purpose.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Chapter 3: The Resurrection */}
            <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-clay font-serif text-6xl md:text-7xl lg:text-9xl opacity-30">2001</span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight">
                            A New Home
                        </h2>
                        <div className="w-16 h-1 bg-clay" />
                        <p className="font-sans text-lg text-loam/80 leading-relaxed">
                            In 2000, we found the mill. Dilapidated but soulful. We knew it had to be saved.
                        </p>
                        <p className="font-sans text-lg text-loam/80 leading-relaxed">
                            Piece by piece, beam by beam, we dismantled the structure. We numbered every
                            timber and transported it 1,700 miles to Waco, Texas. A labor of love.
                            A resurrection of heritage.
                        </p>
                        <p className="font-sans text-lg text-loam/80 leading-relaxed">
                            Today, the water wheel turns again. The stones crush grain grown on our farm.
                            The smell of fresh flour fills the air once more.
                        </p>

                        <button
                            onClick={() => navigate('/products')}
                            className="group inline-flex items-center gap-3 bg-clay hover:bg-sage text-cream px-6 py-3 rounded-full font-sans uppercase tracking-widest text-sm transition-colors mt-4"
                        >
                            Taste the Revival
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="space-y-4">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="/story/chapter3-construction.png"
                                    alt="Mill reconstruction"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 pt-12">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="/story/chapter3-wheat.png"
                                    alt="Golden wheat field"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Today Section - What We Do */}
            <section className="py-24 md:py-32 bg-bone">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-clay font-sans uppercase tracking-[0.2em] text-xs mb-4 block">
                            Today
                        </span>
                        <h2 className="font-serif text-4xl md:text-6xl text-forest mb-6">
                            Slow by <span className="text-gold">Design</span>
                        </h2>
                        <p className="font-sans text-lg text-loam/70 max-w-2xl mx-auto">
                            We mill the way it was meant to be done—slowly, carefully,
                            with respect for the grain and the people who eat it.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                number: "01",
                                title: "Stone Ground",
                                desc: "Our granite millstones turn slowly, crushing the whole grain while preserving the germ, bran, and all the natural nutrition."
                            },
                            {
                                number: "02",
                                title: "Water Powered",
                                desc: "Harnessing natural energy from flowing water, just as millers have done for centuries. No rush, no shortcuts."
                            },
                            {
                                number: "03",
                                title: "Heritage Grains",
                                desc: "Non-GMO varieties grown by partner farms who share our commitment to quality and sustainability."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-cream p-8 rounded-2xl"
                            >
                                <span className="font-serif text-5xl text-gold/30 block mb-4">{item.number}</span>
                                <h3 className="font-serif text-2xl text-forest mb-3">{item.title}</h3>
                                <p className="font-sans text-loam/70 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visit Section */}
            <section className="py-24 md:py-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-clay font-sans uppercase tracking-[0.2em] text-xs mb-4 block">
                                Come See Us
                            </span>
                            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
                                Visit the Mill
                            </h2>
                            <p className="font-sans text-lg text-loam/80 leading-relaxed mb-8">
                                There's nothing quite like seeing the mill in person. Watch the water wheel turn,
                                smell the fresh flour, and take home a bag milled while you wait.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-4">
                                    <MapPin className="text-gold flex-shrink-0 mt-1" size={20} />
                                    <div>
                                        <p className="font-sans text-forest font-medium">800 Dry Creek Road, Suite B</p>
                                        <p className="font-sans text-loam/60">Waco, Texas 76705</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Clock className="text-gold flex-shrink-0 mt-1" size={20} />
                                    <div>
                                        <p className="font-sans text-forest font-medium">Monday – Saturday</p>
                                        <p className="font-sans text-loam/60">9:00 AM – 6:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/visit')}
                                className="group inline-flex items-center gap-3 bg-forest hover:bg-clay text-cream px-6 py-3 rounded-full font-sans uppercase tracking-widest text-sm transition-colors"
                            >
                                Plan Your Visit
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-bone">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.8876!2d-97.0891!3d31.5234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzI0LjIiTiA5N8KwMDUnMjAuOCJX!5e0!3m2!1sen!2sus!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Homestead Gristmill Location"
                                    className="grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 md:py-32 bg-forest relative overflow-hidden">
                {/* Texture */}
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                    }} />
                </div>

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream mb-6 leading-tight">
                            Taste the Difference<br />
                            <span className="text-gold">History Makes</span>
                        </h2>
                        <p className="font-sans text-lg md:text-xl text-cream/70 max-w-2xl mx-auto mb-10">
                            Every bag of our flour carries 260 years of milling tradition.
                            From our stones to your table.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/products')}
                            className="group bg-clay hover:bg-sage text-cream px-10 py-5 rounded-full font-sans uppercase tracking-widest text-sm flex items-center gap-3 transition-all duration-300"
                        >
                                Shop Our Flour
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => navigate('/visit')}
                                className="text-cream/70 hover:text-cream px-8 py-5 font-sans uppercase tracking-widest text-sm transition-colors duration-300"
                            >
                                Visit the Mill
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default StoryPage;
