
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Product, CursorVariant } from './types';
import { ShopifyProvider, useShopify } from './context/ShopifyContext';

// Components
import CustomCursor from './components/CustomCursor';
import Home from './components/Home';
import ProductsPage from './components/ProductsPage';
import Cart from './components/Cart';

const NAV_ITEMS = [
  { name: 'Our Story', id: 'story', action: 'scroll' },
  { name: 'Shop Flour', id: 'products', action: 'route', path: '/products' },
  { name: 'The Mill', id: 'mill', action: 'scroll' }
];

function AppContent() {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const { products: shopifyProducts, collections, cart, isMenuOpen, toggleMenu, closeMenu, openCart, addToCart: shopifyAddToCart } = useShopify();
  const navigate = useNavigate();
  const location = useLocation();

  const getCollectionProducts = useCallback((collection: any) => {
    if (!collection) return [];
    if (Array.isArray(collection.products)) return collection.products;
    if (Array.isArray(collection.products?.edges)) return collection.products.edges.map((edge: any) => edge?.node).filter(Boolean);
    return [];
  }, []);

  // Collection membership lookup for quick category detection
  const collectionProductLookup = useMemo(() => {
    const lookup = new Map<string, Set<string>>();

    collections.forEach((collection: any) => {
      if (!collection || !collection.handle) return;
      const handle = collection.handle.toLowerCase();
      const collectionProducts = getCollectionProducts(collection);
      if (collectionProducts.length === 0) return;

      const productIds = new Set<string>(collectionProducts.map((product: any) => product.id?.toString?.() || ''));
      lookup.set(handle, productIds);
    });

    return lookup;
  }, [collections, getCollectionProducts]);

  // Helper to map Shopify products to internal Product type
  const mapProduct = useCallback((p: any): Product => {
    const productId = p.id?.toString?.() || '';
    const isWheat = collectionProductLookup.get('wheat')?.has(productId);

    return {
      id: p.id,
      name: p.title,
      description: p.description || '',
      price: parseFloat(p.variants?.[0]?.price?.amount || '0'),
      image: p.images?.[0]?.src || 'https://picsum.photos/seed/flour/600/800', // Fallback image
      weight: p.variants?.[0]?.title || 'Standard',
      category: isWheat ? 'wheat' : p.productType?.toLowerCase().trim() || 'goods',
      variantId: p.variants?.[0]?.id
    };
  }, [collectionProductLookup]);

  // Map all products (re-compute when we have collections so categories can use collection membership)
  const mappedProducts: Product[] = useMemo(() => shopifyProducts.map(mapProduct), [shopifyProducts, mapProduct]);

  // Get Pantry products
  const pantryCollection = collections.find((c: any) =>
    c?.title?.toLowerCase?.() === 'pantry' || c?.handle?.toLowerCase?.() === 'pantry'
  );

  // Fallback: Filter by specific names if collection is missing
  // Prioritize the Donut Mix!
  const PANTRY_PRODUCT_NAMES = [
    "Apple Cider Cake Donut Mix",
    "Stoneground Polenta",
    "Homestead Porridge",
    "Gingerbread Mix",
    "Pancake Mix",
    "Biscuit Mix"
  ];

  // Logic: Use collection if found, OTHERWISE search by name
  let pantryProducts = [];

  if (pantryCollection) {
    const pantryCollectionProducts = getCollectionProducts(pantryCollection);
    if (pantryCollectionProducts.length > 0) {
      pantryProducts = pantryCollectionProducts.map(mapProduct);
    }
  } else {
    // Filter and sort based on the order in PANTRY_PRODUCT_NAMES
    pantryProducts = mappedProducts
      .filter(p => PANTRY_PRODUCT_NAMES.some(name => p.name.includes(name)))
      .sort((a, b) => {
        const indexA = PANTRY_PRODUCT_NAMES.findIndex(name => a.name.includes(name));
        const indexB = PANTRY_PRODUCT_NAMES.findIndex(name => b.name.includes(name));
        return indexA - indexB;
      });
  }

  // Always limit to 3 items to maintain layout
  const finalPantryProducts = (pantryProducts.length > 0 ? pantryProducts : mappedProducts).slice(0, 3);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleAddToCart = async (product: Product) => {
    if (product.variantId) {
      await shopifyAddToCart(product.variantId, 1);
      openCart();
    }
  };

  const handleNavClick = (item: any) => {
    closeMenu();

    if (item.action === 'route') {
      navigate(item.path);
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(item.id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      } else {
        const element = document.getElementById(item.id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const goHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalItems = cart?.lineItems?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;

  // Handlers for custom cursor
  const textEnter = () => setCursorVariant('text');
  const hoverEnter = () => setCursorVariant('hover');
  const mouseLeave = () => setCursorVariant('default');

  return (
    <main className="bg-cream min-h-screen w-full overflow-hidden relative">
      <CustomCursor variant={cursorVariant} isMenuOpen={isMenuOpen} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center transition-colors duration-500 ${location.pathname === '/products' ? 'text-forest' : 'text-cream mix-blend-difference'}`}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif font-bold text-xl tracking-tighter cursor-pointer z-50"
          onMouseEnter={hoverEnter}
          onMouseLeave={mouseLeave}
          onClick={goHome}
        >
          <img src="/logo.png" alt="Homestead Gristmill Logo" className="h-12 w-auto" />
        </motion.div>

        <div className="flex items-center gap-8 z-50">
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            onClick={openCart}
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
            onClick={toggleMenu}
            onMouseEnter={hoverEnter}
            onMouseLeave={mouseLeave}
          >
            <Menu className="w-6 h-6 stroke-[1.5px]" />
          </motion.button>
        </div>
      </nav>

      {/* Main View Router */}
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <Home
              products={finalPantryProducts}
              addToCart={handleAddToCart}
              onHoverStart={hoverEnter}
              onHoverEnd={mouseLeave}
            />
          } />
          <Route path="/products" element={
            <ProductsPage
              products={mappedProducts}
              addToCart={handleAddToCart}
              onHoverStart={hoverEnter}
              onHoverEnd={mouseLeave}
            />
          } />
        </Routes>
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-forest text-cream py-24 px-6 border-t border-cream/10 relative z-10">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-3xl mb-6 cursor-pointer" onClick={goHome}>Homestead<br />Gristmill</h3>
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
      <Cart onHoverStart={hoverEnter} onHoverEnd={mouseLeave} />

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
              onClick={closeMenu}
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

export default function App() {
  return (
    <ShopifyProvider>
      <Router>
        <AppContent />
      </Router>
    </ShopifyProvider>
  );
}
