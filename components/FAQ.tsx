import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WheatDivider from './WheatDivider';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-loam/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
            >
                <span className="font-serif text-xl text-forest group-hover:text-clay transition-colors">{question}</span>
                <span className={`transform transition-transform duration-300 text-gold ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    +
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 font-sans text-loam/80 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ: React.FC = () => {
    const faqs = [
        {
            question: "How should I store my stone-ground flour?",
            answer: "Because our flour contains the natural germ and bran oils, it is best stored in the refrigerator or freezer to maintain freshness. It will keep for 6 months in the fridge or up to 12 months in the freezer."
        },
        {
            question: "Is your flour certified organic?",
            answer: "While we are not certified organic, we only mill grains that are grown without the use of chemical pesticides or fertilizers. We work closely with farmers who share our commitment to sustainable and natural farming practices."
        },
        {
            question: "Do you ship internationally?",
            answer: "Currently, we only ship within the United States. We are working on expanding our shipping capabilities in the future."
        },
        {
            question: "Can I visit the mill?",
            answer: "Yes! We are open to the public Monday through Saturday, 9:00 AM to 6:00 PM. You can watch the milling process, tour the historic building, and shop in our store."
        },
        {
            question: "Are your products gluten-free?",
            answer: "Our wheat, rye, and spelt products contain gluten. Our corn products are naturally gluten-free, but they are milled in the same facility, so we cannot guarantee they are 100% free from cross-contamination."
        }
    ];

    return (
        <div className="bg-cream min-h-screen w-full pt-24 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-6 mb-16"
                >
                    <span className="text-clay font-bold uppercase tracking-[0.2em] text-sm">Common Questions</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-forest">
                        Frequently Asked <br /> <span className="italic text-gold">Questions</span>
                    </h1>
                </motion.div>

                <WheatDivider />

                <div className="mt-16 space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
