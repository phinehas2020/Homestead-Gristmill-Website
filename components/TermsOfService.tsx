
import React from 'react';
import { motion } from 'motion/react';

const TermsOfService: React.FC = () => {
    return (
        <div className="bg-cream min-h-screen w-full pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="font-serif text-5xl md:text-6xl text-forest mb-8">Terms of Service</h1>
                    <p className="font-sans text-loam/60 text-sm italic">Last Updated: December 17, 2024</p>
                </motion.div>

                <div className="space-y-8 font-sans text-loam/80 leading-relaxed">
                    <section>
                        <h2 className="font-serif text-2xl text-forest mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the Homestead Gristmill website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-forest mb-4">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software) on Homestead Gristmill's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-forest mb-4">3. Disclaimer</h2>
                        <p>
                            The materials on Homestead Gristmill's website are provided on an 'as is' basis. Homestead Gristmill makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-forest mb-4">4. Limitations</h2>
                        <p>
                            In no event shall Homestead Gristmill or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Homestead Gristmill's website.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-forest mb-4">5. Governing Law</h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of the State of Texas and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
