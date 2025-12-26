
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: string;
}

const Categories: React.FC = () => {
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      name: "Heritage Wheat",
      slug: "wheat",
      description: "Whole grain wheat flour, stone-ground for bread, pastry, and all-purpose baking.",
      image: "/hero-wheat.png",
      productCount: "8+ varieties"
    },
    {
      name: "Stone-Ground Corn",
      slug: "corn",
      description: "Fresh cornmeal and grits milled from heirloom varieties for authentic Southern flavor.",
      image: "/hero-holiday.png",
      productCount: "5+ varieties"
    },
    {
      name: "Heritage Rye",
      slug: "rye",
      description: "Dark and light rye flours for traditional European breads and unique flavor profiles.",
      image: "/rustic-kneading.png",
      productCount: "3+ varieties"
    },
    {
      name: "Dry Goods",
      slug: "goods",
      description: "Baking mixes, porridge blends, and specialty items to complete your pantry.",
      image: "/hero-bag.png",
      productCount: "6+ items"
    }
  ];

  const handleCategoryClick = (slug: string) => {
    navigate(`/products?category=${slug}`);
  };

  return (
    <section className="bg-cream py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-clay font-sans uppercase tracking-[0.2em] text-xs mb-4 block"
            >
              Browse by Type
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-6xl text-forest"
            >
              Shop by Category
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => navigate('/products')}
            className="group flex items-center gap-2 text-forest hover:text-clay transition-colors font-sans uppercase tracking-widest text-sm"
          >
            View All
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category.slug)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="font-sans text-gold text-xs uppercase tracking-widest mb-2">
                  {category.productCount}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-cream mb-2 group-hover:text-gold transition-colors">
                  {category.name}
                </h3>
                <p className="font-sans text-cream/70 text-sm leading-relaxed line-clamp-2 mb-4">
                  {category.description}
                </p>

                {/* Arrow indicator */}
                <div className="flex items-center gap-2 text-cream/60 group-hover:text-gold transition-colors">
                  <span className="font-sans text-xs uppercase tracking-widest">Shop Now</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
