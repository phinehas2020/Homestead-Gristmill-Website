import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Settings, Wheat } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <div className="bg-cream min-h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] transform -rotate-12">
                    <Wheat size={400} />
                </div>
                <div className="absolute bottom-[-10%] right-[-10%] transform rotate-45">
                    <Wheat size={500} />
                </div>
            </div>

            <div className="text-center space-y-8 relative z-10">
                <div className="relative inline-block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="font-serif text-[10rem] md:text-[16rem] leading-none text-forest opacity-10 select-none"
                    >
                        404
                    </motion.div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: [0, 45, 45, 180, 180, 220, 220, 360] }}
                            transition={{
                                duration: 8,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.3, 0.5, 0.6, 0.7, 0.8, 1],
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        >
                            <Settings size={100} className="text-clay opacity-80 md:w-[140px] md:h-[140px]" />
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6"
                >
                    <h2 className="font-serif text-3xl md:text-5xl text-forest">
                        The Mill is Jammed
                    </h2>
                    <p className="font-sans text-lg text-loam/80 max-w-md mx-auto">
                        Looks like you've gone against the grain. We couldn't find the page you're looking for.
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/"
                            className="inline-block bg-clay text-cream px-8 py-3 rounded-full font-sans uppercase tracking-widest text-sm hover:bg-sage transition-colors duration-300 mt-4 shadow-lg"
                        >
                            Back to the Grind
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
