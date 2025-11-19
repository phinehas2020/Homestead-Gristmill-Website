
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Product, CartItem, CursorVariant } from './types';

// Components
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Narrative from './components/Narrative';
import Manifesto from './components/Manifesto';
import Shop from './components/Shop'; // Renaming concept: "Featured Shop"
import ProductsPage from './components/ProductsPage';
import KitchenLab from './components/KitchenLab';

// Expanded Data
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Heritage Red Wheat",
    description: "Nutty, robust, and perfect for sourdough. 13% protein content.",
    price: 14.00,
    image: "https://picsum.photos/seed/flour_sack_paper/600/800",
    weight: "2kg Sack",
    category: 'wheat'
  },
  {
    id: 2,
    name: "Ancient Rye",
    description: "Deep earthy tones for pumpernickel and cookies. Low gluten.",
    price: 12.50,
    image: "https://picsum.photos/seed/rye_grain/600/800",
    weight: "1.5kg Sack",
    category: 'rye'
  },
  {
    id: 3,
    name: "Soft White Pastry",
    description: "Delicate and silky for cakes and biscuits. Milled extra fine.",
    price: 15.00,
    image: "https://picsum.photos/seed/pastry_dough/600/800",
    weight: "2kg Sack",
    category: 'wheat'
  },
  {
    id: 4,
    name: "Bloody Butcher Cornmeal",
    description: "Vibrant red cornmeal with a sweet, rich flavor profile.",
    price: 11.00,
    image: "https://picsum.photos/seed/red_corn/600/800",
    weight: "1kg Sack",
    category: 'corn'
  },
  {
    id: 5,
    name: "Blue Hopi Grits",
    description: "Coarse ground blue corn. Creamy, sweet, and historically accurate.",
    price: 13.00,
    image: "https://picsum.photos/seed/blue_corn/600/800",
    weight: "1kg Sack",
    category: 'corn'
  },
  {
    id: 6,
    name: "Miller's Tote",
    description: "Heavyweight canvas tote for hauling your weekly loaves.",
    price: 28.00,
    image: "https://picsum.photos/seed/canvas_tote/600/800",
    weight: "One Size",
    category: 'goods'
  }
];

const NAV_ITEMS = [
  { name: 'Our Story', id: 'story', action: 'scroll' },
  { name: 'Shop Flour', id: 'products', action: 'route' },
  { name: 'The Test Kitchen', id: 'kitchen', action: 'scroll' },
  { name: 'The Mill', id: 'mill', action: 'scroll' }
];

type ViewState = 'home' | 'products';

export default function App() {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  
  // Reset scroll when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    setIsMenuOpen(false);
    
    if (item.action === 'route') {
      if (item.id === 'products') {
        setCurrentView('products');
      }
    } else {
      // If we are on products page and click a scroll link, go home first
      if (currentView !== 'home') {
        setCurrentView('home');
        // Wait for state update/render then scroll
        setTimeout(() => {
          const element = document.getElementById(item.id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(item.id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const goHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Handlers for custom cursor
  const textEnter = () => setCursorVariant('text');
  const hoverEnter = () => setCursorVariant('hover');
  const mouseLeave = () => setCursorVariant('default');

  return (
    <main className="bg-cream min-h-screen w-full overflow-hidden relative">
      <CustomCursor variant={cursorVariant} isMenuOpen={isMenuOpen} />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center transition-colors duration-500 ${currentView === 'products' ? 'text-forest' : 'text-cream mix-blend-difference'}`}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif font-bold text-xl tracking-tighter cursor-pointer z-50"
          onMouseEnter={hoverEnter}
          onMouseLeave={mouseLeave}
          onClick={goHome}
        >
          HG.
        </motion.div>

        <div className="flex items-center gap-8 z-50">
          <motion.button 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            onClick={() => setIsCartOpen(true)}
            onMouseEnter={hoverEnter}
            onMouseLeave={mouseLeave}
            className="relative group"
          >
            <ShoppingBag className="w-6 h-6 stroke-[1.5px]" />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-clay text-cream text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            onClick={() => setIsMenuOpen(true)}
            onMouseEnter={hoverEnter}
            onMouseLeave={mouseLeave}
          >
            <Menu className="w-6 h-6 stroke-[1.5px]" />
          </motion.button>
        </div>
      </nav>

      {/* Main View Router */}
      <AnimatePresence mode='wait'>
        {currentView === 'home' ? (
          <motion.div
            key="home"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
             {/* Content Flow: Hero -> Shop (Featured) -> Narrative -> Manifesto -> Kitchen */}
            <Hero onHoverStart={textEnter} onHoverEnd={mouseLeave} />
            
            <Shop 
              products={PRODUCTS.slice(0, 3)} // Only show top 3 on home
              addToCart={addToCart}
              onHoverStart={hoverEnter}
              onHoverEnd={mouseLeave}
            />

            <Narrative />
            
            <Manifesto />
            
            <KitchenLab onHoverStart={textEnter} onHoverEnd={mouseLeave} />
          </motion.div>
        ) : (
          <motion.div
            key="products"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductsPage 
              products={PRODUCTS}
              addToCart={addToCart}
              onHoverStart={hoverEnter}
              onHoverEnd={mouseLeave}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - Always visible but conditionally styled borders? Keeping it simple. */}
      <footer className="bg-forest text-cream py-24 px-6 border-t border-cream/10 relative z-10">
         <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
                <h3 className="font-serif text-3xl mb-6 cursor-pointer" onClick={goHome}>Homestead<br/>Gristmill</h3>
                <p className="font-sans text-cream/60 text-sm max-w-xs">
                    Restoring the honest table, one stone-ground bag at a time.
                </p>
            </div>
            <div className="font-sans text-cream/80 space-y-4">
                <h4 className="uppercase text-xs tracking-widest text-gold mb-6">Connect</h4>
                <p className="cursor-pointer hover:text-gold transition-colors">Instagram</p>
                <p className="cursor-pointer hover:text-gold transition-colors">Journal</p>
                <p className="cursor-pointer hover:text-gold transition-colors">Our Farmers</p>
            </div>
             <div className="font-sans text-cream/80 space-y-4">
                <h4 className="uppercase text-xs tracking-widest text-gold mb-6">Visit</h4>
                <p>1294 Mill Road</p>
                <p>Waco, Texas 76705</p>
                <p>hello@honesttable.com</p>
            </div>
         </div>
         <div className="mt-24 text-center font-sans text-cream/20 text-xs">
            &copy; 2024 Homestead Gristmill. Slow by design.
         </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-forest/40 backdrop-blur-sm z-50"
             />
             <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-cream z-50 shadow-2xl p-8 flex flex-col"
             >
                <div className="flex justify-between items-center mb-12">
                    <h2 className="font-serif text-3xl text-forest">Your Sack</h2>
                    <button onClick={() => setIsCartOpen(false)} onMouseEnter={hoverEnter} onMouseLeave={mouseLeave}>
                        <X className="text-loam" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-8">
                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="font-sans text-loam/50">The sack is empty.</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-6 items-center">
                                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg grayscale opacity-80" />
                                <div>
                                    <h4 className="font-serif text-lg text-forest">{item.name}</h4>
                                    <p className="font-sans text-sm text-loam/60">{item.quantity} x ${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t border-loam/10 pt-8 mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-sans text-loam">Subtotal</span>
                        <span className="font-serif text-2xl text-forest">${subtotal.toFixed(2)}</span>
                    </div>
                    <button 
                        onMouseEnter={hoverEnter}
                        onMouseLeave={mouseLeave}
                        className="w-full bg-forest text-cream py-5 rounded-full font-sans uppercase tracking-widest hover:bg-loam transition-colors duration-500"
                    >
                        Checkout
                    </button>
                </div>
             </motion.div>
          </>
        )}
      </AnimatePresence>

       {/* Menu Overlay */}
       <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-forest z-50 flex items-center justify-center"
          >
             <button 
                onClick={() => setIsMenuOpen(false)} 
                className="absolute top-8 right-8 text-cream"
                onMouseEnter={hoverEnter}
                onMouseLeave={mouseLeave}
             >
                <X size={32} />
             </button>
             <div className="text-center space-y-8">
                {NAV_ITEMS.map((item) => (
                    <motion.div 
                        key={item.name}
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="font-serif text-5xl md:text-7xl text-cream hover:text-gold transition-colors duration-500 cursor-none pointer-events-auto"
                        onMouseEnter={textEnter}
                        onMouseLeave={mouseLeave}
                        onClick={() => handleNavClick(item)}
                    >
                        {item.name}
                    </motion.div>
                ))}
             </div>
          </motion.div>
        )}
       </AnimatePresence>
    </main>
  );
}
