import React from 'react';
import { motion } from 'motion/react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-cream min-h-screen w-full pt-24 pb-24">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">Privacy Policy</h1>
                    <p className="font-sans text-sm text-loam/60">Last Updated: December 2024</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-stone prose-lg font-sans text-loam/80"
                >
                    <p>
                        At Homestead Gristmill, we respect your privacy and are committed to protecting your personal information.
                        This policy outlines how we collect, use, and safeguard your data.
                    </p>

                    <h3 className="font-serif text-forest mt-8 mb-4 text-2xl">Information We Collect</h3>
                    <p>
                        We collect information you provide directly to us, such as when you make a purchase, sign up for our newsletter,
                        or contact us. This may include your name, email address, shipping address, and payment information.
                    </p>

                    <h3 className="font-serif text-forest mt-8 mb-4 text-2xl">How We Use Your Information</h3>
                    <p>
                        We use your information to process your orders, communicate with you about your account or transactions,
                        and send you marketing communications if you have opted in.
                    </p>

                    <h3 className="font-serif text-forest mt-8 mb-4 text-2xl">Information Sharing</h3>
                    <p>
                        We do not sell your personal information. We may share your information with third-party service providers
                        who help us operate our website and business (e.g., payment processors, shipping carriers).
                    </p>

                    <h3 className="font-serif text-forest mt-8 mb-4 text-2xl">Contact Us</h3>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at infopush@homesteadgristmill.com.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
