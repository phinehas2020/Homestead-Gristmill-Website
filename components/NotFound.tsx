import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Settings, Wheat } from 'lucide-react';

const NotFound: React.FC = () => {
    const gearRef = useRef<HTMLDivElement>(null);

    // Pause animation when off-screen per baseline-ui requirements
    useEffect(() => {
        const gear = gearRef.current;
        if (!gear) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    gear.style.animationPlayState = 'running';
                } else {
                    gear.style.animationPlayState = 'paused';
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(gear);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-cream min-h-dvh w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] transform -rotate-12">
                    <Wheat size={400} aria-hidden="true" />
                </div>
                <div className="absolute bottom-[-10%] right-[-10%] transform rotate-45">
                    <Wheat size={500} aria-hidden="true" />
                </div>
            </div>

            <div className="text-center space-y-8 relative z-[var(--z-above)]">
                <div className="relative inline-block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="font-serif text-[10rem] md:text-[16rem] leading-none text-forest opacity-10 select-none"
                    >
                        404
                    </motion.div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            ref={gearRef}
                            className="animate-[spin_8s_ease-in-out_infinite]"
                        >
                            <Settings size={100} className="text-clay opacity-80 md:w-[140px] md:h-[140px]" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <h2 className="font-serif text-3xl md:text-5xl text-forest text-balance">
                        The Mill is Jammed
                    </h2>
                    <p className="font-sans text-lg text-loam/80 max-w-md mx-auto text-pretty">
                        Looks like you've gone against the grain. We couldn't find the page you're looking for.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-clay text-cream px-8 py-3 rounded-full font-sans uppercase tracking-widest text-sm hover:bg-sage transition-colors duration-200 mt-4 shadow-lg"
                    >
                        Back to the Grind
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
