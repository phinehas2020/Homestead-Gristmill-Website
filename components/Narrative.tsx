
import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Flame, Droplets, Wheat, Heart, ArrowRight } from 'lucide-react';

const ValueProp: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="flex flex-col items-center text-center p-6 md:p-8 rounded-3xl bg-cream/80 soft-card"
  >
    <div className="w-16 h-16 rounded-full bg-sage/20 border border-sage/30 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="font-serif text-2xl text-forest mb-3">{title}</h3>
    <p className="font-sans text-loam/70 leading-relaxed">{description}</p>
  </motion.div>
);

const Narrative: React.FC = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Wheat className="w-7 h-7 text-gold" />,
      title: "Stone Ground",
      description: "Our granite millstones crush the whole grain slowly, preserving the germ, bran, and all the nutrition."
    },
    {
      icon: <Droplets className="w-7 h-7 text-gold" />,
      title: "Milled Fresh",
      description: "We mill in small batches weekly. Your flour is never more than days old—not years like grocery store flour."
    },
    {
      icon: <Flame className="w-7 h-7 text-gold" />,
      title: "Cool & Slow",
      description: "Heat destroys nutrients. Our stones turn slowly, keeping temperatures low to preserve natural oils and flavor."
    },
    {
      icon: <Heart className="w-7 h-7 text-gold" />,
      title: "Heritage Grains",
      description: "Non-GMO, heritage varieties grown by partner farms. Grains with character, flavor, and history."
    }
  ];

  return (
    <section id="story" className="bg-cream relative py-20 md:py-28 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#D8B676_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#C56B4E_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-clay font-sans uppercase tracking-[0.2em] text-xs mb-4 block"
          >
            Why Homestead
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl text-forest mb-6"
          >
            Not All Flour is Equal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-lg md:text-xl text-loam/70 max-w-2xl mx-auto"
          >
            Grocery store flour is stripped, bleached, and sits for years.
            Ours is whole, fresh, and alive with flavor.
          </motion.p>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2 mb-16">
          {values.map((value, index) => (
            <ValueProp key={value.title} {...value} index={index} />
          ))}
        </div>

        {/* Comparison Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-forest rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-serif text-3xl md:text-4xl text-cream mb-3">
              Taste the difference yourself.
            </h3>
            <p className="font-sans text-cream/70">
              Once you bake with fresh-milled flour, you'll never go back.
            </p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="group bg-clay hover:bg-sage text-cream px-8 py-4 rounded-full font-sans uppercase tracking-widest text-sm flex items-center gap-3 transition-all duration-300 whitespace-nowrap"
          >
            Shop Fresh Flour
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Narrative;
