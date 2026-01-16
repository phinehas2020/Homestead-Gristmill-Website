import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { Product } from '../types';

interface MobileQuickAddProps {
  products: Product[];
  addToCart: (product: Product, quantity?: number) => void;
}

const MobileQuickAdd: React.FC<MobileQuickAddProps> = ({ products, addToCart }) => {
  const navigate = useNavigate();
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const featured = products.slice(0, 4);

  const handleQuickAdd = async (product: Product) => {
    setAddingId(product.id);
    await addToCart(product, 1);
    setAddingId(null);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  if (featured.length === 0) return null;

  return (
    <section className="md:hidden px-6 -mt-8 pb-8 relative z-30">
      <div className="soft-card bg-cream/95 rounded-[28px] p-4">
        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-sage block">
              Bestsellers
            </span>
            <h2 className="font-serif text-2xl text-forest">Quick Add</h2>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="font-sans text-[10px] uppercase tracking-[0.25em] text-forest/60 hover:text-forest transition-colors flex items-center gap-2"
          >
            View all
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          {featured.map((product) => {
            const isAdding = addingId === product.id;
            const isAdded = addedId === product.id;

            return (
              <div key={product.id} className="min-w-[82%] snap-start">
                <div className="flex items-center gap-3 rounded-2xl bg-cream/90 border border-forest/10 p-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-forest/10 bg-bone">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-lg text-forest leading-tight line-clamp-1">
                      {product.name}
                    </p>
                    <p className="font-sans text-xs text-loam/60">{product.weight}</p>
                    <p className="font-serif text-clay text-base">${product.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleQuickAdd(product)}
                    disabled={isAdding}
                    className={`shrink-0 rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.25em] font-sans flex items-center gap-1 border transition-colors ${
                      isAdded
                        ? 'bg-sage text-cream border-sage'
                        : 'bg-forest text-cream border-forest hover:bg-clay hover:border-clay'
                    } ${isAdding ? 'opacity-70' : ''}`}
                  >
                    {isAdded ? <Check size={12} /> : <Plus size={12} />}
                    {isAdded ? 'Added' : isAdding ? 'Adding' : 'Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
        <div className="snap-start flex items-center gap-2 bg-cream/80 border border-forest/10 px-4 py-2 rounded-full">
          <span className="font-sans text-[10px] uppercase tracking-widest text-forest/80">Milled Fresh Weekly</span>
        </div>
        <div className="snap-start flex items-center gap-2 bg-cream/80 border border-forest/10 px-4 py-2 rounded-full">
          <span className="font-sans text-[10px] uppercase tracking-widest text-forest/80">Non-GMO Heritage</span>
        </div>
        <div className="snap-start flex items-center gap-2 bg-cream/80 border border-forest/10 px-4 py-2 rounded-full">
          <span className="font-sans text-[10px] uppercase tracking-widest text-forest/80">Ships Nationwide</span>
        </div>
      </div>
    </section>
  );
};

export default MobileQuickAdd;
