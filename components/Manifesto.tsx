
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Star } from 'lucide-react';

const Manifesto: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would integrate with your email service
    setIsSubmitted(true);
    setEmail('');
  };

  const testimonials = [
    {
      quote: "The best flour I've ever baked with. You can actually smell the wheat.",
      author: "Sarah M.",
      location: "Austin, TX"
    },
    {
      quote: "My sourdough has never been better. The difference is night and day.",
      author: "Michael R.",
      location: "Denver, CO"
    },
    {
      quote: "Once you go fresh-milled, grocery store flour tastes like cardboard.",
      author: "Jennifer L.",
      location: "Portland, OR"
    }
  ];

  return (
    <section className="relative bg-forest overflow-hidden">
      {/* Subtle Texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-10 w-72 h-72 bg-sage/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-clay/20 rounded-full blur-[160px]" />
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 py-16 md:py-24 border-b border-cream/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="font-sans text-cream/60 text-sm uppercase tracking-widest">
              Trusted by Bakers Nationwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-serif text-xl md:text-2xl text-cream/90 mb-4 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <p className="font-sans text-cream/50 text-sm">
                  {testimonial.author} — {testimonial.location}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Signup Section */}
      <div className="relative z-10 py-16 md:py-24 border-b border-cream/10">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-3xl md:text-5xl text-cream mb-4">
              Get 10% Off Your First Order
            </h3>
            <p className="font-sans text-cream/60 text-lg mb-8">
              Join our mailing list for recipes, milling updates, and exclusive offers.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gold/20 border border-gold/30 rounded-full py-4 px-8 inline-flex items-center gap-3"
              >
                <Mail size={20} className="text-gold" />
                <span className="font-sans text-cream">Check your inbox for your discount code!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-cream/10 border border-cream/20 rounded-full px-6 py-4 font-sans text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                  aria-label="Email address for newsletter signup"
                />
                <button
                  type="submit"
                  className="bg-clay hover:bg-sage text-cream px-8 py-4 rounded-full font-sans uppercase tracking-widest text-sm transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="font-sans text-cream/30 text-xs mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream mb-6 leading-[0.9]">
              <span className="text-gold">Eat</span> Different.
            </h2>
            <p className="font-sans text-cream/60 text-lg md:text-xl max-w-xl mx-auto mb-10">
              Refuse the industrial standard. Taste what flour was meant to be.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/products')}
                className="group bg-clay hover:bg-sage text-cream px-10 py-5 rounded-full font-sans uppercase tracking-widest text-sm flex items-center gap-3 transition-all duration-300"
              >
                Shop All Flour
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/story')}
                className="text-cream/70 hover:text-cream px-8 py-5 font-sans uppercase tracking-widest text-sm transition-colors duration-300"
              >
                Read Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
