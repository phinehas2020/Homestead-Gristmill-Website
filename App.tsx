
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { Product } from './types';
import { ShopifyProvider, useShopify } from './context/ShopifyContext';
import { COLLECTION_MAPPINGS, FALLBACK_PANTRY_NAMES } from './lib/collectionConfig';

// Components

import Home from './components/Home';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import StoryPage from './components/StoryPage';
import VisitPage from './components/VisitPage';
import NotFound from './components/NotFound';
import FAQ from './components/FAQ';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

const NAV_ITEMS = [
  { name: 'Our Story', id: 'story', action: 'route', path: '/story' },
  { name: 'Shop Flour', id: 'products', action: 'route', path: '/products' },
  { name: 'Visit', id: 'visit', action: 'route', path: '/visit' }
];

function AppContent() {
  const { products: shopifyProducts, collections, cart, isMenuOpen, toggleMenu, closeMenu, openCart, addToCart: shopifyAddToCart } = useShopify();
  const navigate = useNavigate();
  const location = useLocation();

  // Build a lookup of collection IDs keyed by category
  const collectionIdsByCategory = useMemo(() => {
    const map = new Map<string, Set<string>>();
    COLLECTION_MAPPINGS.forEach(({ category, ids }) => {
      if (!ids) return;
      if (!map.has(category)) map.set(category, new Set<string>());
      const set = map.get(category)!;
      ids.forEach(id => {
        if (id) set.add(id.toLowerCase());
      });
    });
    return map;
  }, []);

  // GraphQL helper: collection.products can be an array, a GraphModel connection with models, or edges
  const extractCollectionProducts = useCallback((collection: any) => {
    if (!collection || !collection.products) return [];
    const { products } = collection;

    if (Array.isArray(products)) return products;
    if (Array.isArray(products?.models)) return products.models;
    if (Array.isArray(products?.edges)) return products.edges.map((edge: any) => edge?.node).filter(Boolean);

    return [];
  }, []);

  // Normalize various handles/titles to our internal category keys using the shared mapping file
  const normalizeCategoryKey = useCallback((value: string) => {
    const key = value?.toLowerCase?.().trim() || '';
    if (!key) return '';
    const match = COLLECTION_MAPPINGS.find(mapping => {
      const handles = mapping.handles?.map(h => h.toLowerCase()) || [];
      const keywords = mapping.keywords?.map(k => k.toLowerCase()) || [];
      return handles.includes(key) || keywords.some(k => key.includes(k));
    });
    return match?.category || '';
  }, []);

  // Collection membership lookup for quick category detection
  const collectionProductLookup = useMemo(() => {
    const lookup = new Map<string, Set<string>>();

    collections.forEach((collection: any) => {
      if (!collection) return;

      const keys = [
        normalizeCategoryKey(collection.handle || ''),
        normalizeCategoryKey(collection.title || '')
      ].filter(Boolean);

      // Tag by explicit collection IDs from config
      const collectionId = collection?.id?.toString?.().toLowerCase?.() || '';
      if (collectionId) {
        for (const [category, idSet] of collectionIdsByCategory.entries()) {
          if (idSet.has(collectionId)) {
            keys.push(category);
          }
        }
      }

      if (keys.length === 0) return;

      const productsInCollection = extractCollectionProducts(collection);
      if (productsInCollection.length === 0) return;

      const productIds = productsInCollection
        .map((product: any) => product?.id?.toString?.() || '')
        .filter(Boolean);

      keys.forEach((key) => {
        if (!lookup.has(key)) lookup.set(key, new Set<string>());
        const set = lookup.get(key)!;
        productIds.forEach(id => set.add(id));
      });
    });

    return lookup;
  }, [collections, normalizeCategoryKey, extractCollectionProducts, collectionIdsByCategory]);

  // Helper to get optimized Shopify image URLs
  const getOptimizedImage = useCallback((url: string, width = 800) => {
    if (!url) return 'https://picsum.photos/seed/flour/600/800';
    if (!url.includes('cdn.shopify.com')) return url;

    // Use Shopify URL params for optimization
    // width: specific width
    // format: webp (modern format)
    // crop: center (optional)
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}width=${width}&format=webp`;
  }, []);

  // Helper to map Shopify products to internal Product type
  const mapProduct = useCallback((p: any): Product => {
    const productId = p.id?.toString?.() || '';

    // Check collection membership for category assignment
    const isWheat = collectionProductLookup.get('wheat')?.has(productId);
    const isGoods = collectionProductLookup.get('goods')?.has(productId);
    const isCorn = collectionProductLookup.get('corn')?.has(productId);
    const isRye = collectionProductLookup.get('rye')?.has(productId);

    // Determine category from collection membership first, then fall back to normalized productType
    let category = normalizeCategoryKey(p.productType || '') || 'other';
    if (isWheat) category = 'wheat';
    else if (isGoods) category = 'goods';
    else if (isCorn) category = 'corn';
    else if (isRye) category = 'rye';

    const mainImageUrl = p.images?.[0]?.src || '';

    return {
      id: p.id,
      name: p.title,
      description: p.description || '',
      price: parseFloat(p.variants?.[0]?.price?.amount || '0'),
      image: getOptimizedImage(mainImageUrl, 800),
      weight: p.variants?.[0]?.title || 'Standard',
      category,
      variantId: p.variants?.[0]?.id,
      variants: p.variants?.map((v: any) => ({
        id: v.id,
        title: v.title,
        price: parseFloat(v.price?.amount || '0'),
        image: getOptimizedImage(v.image?.src || mainImageUrl, 600)
      })) || [],
      handle: p.handle
    };
  }, [collectionProductLookup, normalizeCategoryKey, getOptimizedImage]);

  // Map all products (re-compute when we have collections so categories can use collection membership)
  const mappedProducts: Product[] = useMemo(() => shopifyProducts.map(mapProduct), [shopifyProducts, mapProduct]);

  // Get pantry product IDs from the collection lookup
  const pantryProductIds = collectionProductLookup.get('pantry');
  const pantryProductOrder = useMemo(() => {
    const pantryCollection = collections.find((collection: any) => {
      const matchesHandleOrTitle = normalizeCategoryKey(collection?.handle || collection?.title || '') === 'pantry';
      const collectionId = collection?.id?.toString?.().toLowerCase?.() || '';
      const matchesId = collectionIdsByCategory.get('pantry')?.has(collectionId);
      return matchesHandleOrTitle || matchesId;
    });
    if (!pantryCollection) return [];

    return extractCollectionProducts(pantryCollection)
      .map((product: any) => product?.id?.toString?.() || '')
      .filter(Boolean);
  }, [collections, normalizeCategoryKey, extractCollectionProducts, collectionIdsByCategory]);

  // Logic: Use collection product IDs to filter from all products
  let pantryProducts: Product[] = [];

  if (pantryProductIds && pantryProductIds.size > 0) {
    // Filter mapped products to only those in the Pantry collection
    pantryProducts = mappedProducts.filter(p => {
      const productId = p.id?.toString?.() || '';
      return pantryProductIds.has(productId);
    });

    // Preserve the order defined in the collection (best selling / manual order)
    if (pantryProductOrder.length > 0) {
      const orderIndex = new Map<string, number>();
      pantryProductOrder.forEach((id, idx) => orderIndex.set(id, idx));

      pantryProducts.sort((a, b) => {
        const idA = a.id?.toString?.() || '';
        const idB = b.id?.toString?.() || '';
        const idxA = orderIndex.get(idA) ?? Number.MAX_SAFE_INTEGER;
        const idxB = orderIndex.get(idB) ?? Number.MAX_SAFE_INTEGER;
        return idxA - idxB;
      });
    }
  }

  // Fallback: Filter by specific names if collection is empty
  if (pantryProducts.length === 0) {
    const PANTRY_PRODUCT_NAMES = FALLBACK_PANTRY_NAMES;
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

  const handleAddToCart = async (product: Product, quantity: number = 1) => {
    if (product.variantId) {
      await shopifyAddToCart(product.variantId, quantity);
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



  return (
    <main className="bg-forest min-h-screen w-full overflow-hidden relative">


      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 px-4 py-4 md:px-6 md:py-5 pt-[max(1rem,env(safe-area-inset-top))] flex justify-between items-center bg-cream/85 text-forest backdrop-blur-xl border-b border-forest/10 shadow-[0_10px_40px_-30px_rgba(32,24,16,0.6)] transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif font-bold text-xl tracking-tighter cursor-pointer z-50"

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
            className="relative group"
            aria-label="Open cart"
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

          <motion.a
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15 }}
            href="https://homesteadgristmill.com/account"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            aria-label="Account"
          >
            <User className="w-6 h-6 stroke-[1.5px]" />
          </motion.a>

          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            onClick={toggleMenu}
            aria-label="Open menu"
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
            />
          } />
          <Route path="/story" element={
            <StoryPage />
          } />
          <Route path="/products" element={
            <ProductsPage
              products={mappedProducts}
              addToCart={handleAddToCart}
            />
          } />
          <Route path="/product/:handle" element={
            <ProductDetail
              products={mappedProducts}
              addToCart={handleAddToCart}
            />
          } />
          <Route path="/visit" element={
            <VisitPage />
          } />
          <Route path="/faq" element={
            <FAQ />
          } />
          <Route path="/privacy" element={
            <PrivacyPolicy />
          } />
          <Route path="/terms" element={
            <TermsOfService />
          } />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-forest text-cream py-24 px-6 border-t border-cream/10 relative z-10">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <button className="font-serif text-3xl mb-6 cursor-pointer text-left" onClick={goHome}>
              <span className="block">Homestead</span>
              <span className="block">Gristmill</span>
            </button>
            <p className="font-sans text-cream/60 text-sm max-w-xs">
              Restoring the honest table, one stone-ground bag at a time.
            </p>
          </div>
          <div className="font-sans text-cream/80 space-y-4">
            <h4 className="uppercase text-xs tracking-widest text-gold mb-6">Connect</h4>
            <a href="https://instagram.com/homesteadgristmill" target="_blank" rel="noopener noreferrer" className="block cursor-pointer hover:text-gold transition-colors">Instagram</a>
            <a href="https://www.homesteadheritagetexas.com/blog/" target="_blank" rel="noopener noreferrer" className="block cursor-pointer hover:text-gold transition-colors">Journal</a>
            <button className="block cursor-pointer hover:text-gold transition-colors" onClick={() => navigate('/faq')}>FAQ</button>
          </div>
          <div className="font-sans text-cream/80 space-y-4">
            <button className="uppercase text-xs tracking-widest text-gold mb-6 cursor-pointer hover:text-white transition-colors block" onClick={() => navigate('/visit')}>Visit</button>
            <p className="text-sm">800 Dry Creek Road Suite B</p>
            <p className="text-sm">Waco, Texas 76705</p>

            <div className="pt-4">
              <h5 className="text-[10px] uppercase tracking-[0.2em] text-cream/40 mb-3">Newsletter</h5>
              <form
                className="flex gap-2"
                onSubmit={(e) => { e.preventDefault(); alert("Subscribed! Check your email to confirm."); }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="bg-cream/5 border border-cream/10 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-gold transition-colors"
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="bg-clay text-cream px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold hover:bg-gold hover:text-forest transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-24 text-center font-sans text-cream/20 text-xs flex flex-col md:flex-row justify-center items-center gap-4">
          <span>&copy; 2024 Homestead Gristmill. Slow by design.</span>
          <span className="hidden md:inline">•</span>
          <button className="cursor-pointer hover:text-cream/40 transition-colors" onClick={() => navigate('/privacy')}>Privacy Policy</button>
          <span className="hidden md:inline">•</span>
          <button className="cursor-pointer hover:text-cream/40 transition-colors" onClick={() => navigate('/terms')}>Terms of Service</button>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart />

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
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
            <nav className="text-center space-y-8" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <motion.button
                  key={item.name}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="block w-full font-serif text-5xl md:text-7xl text-cream hover:text-gold transition-colors duration-500 cursor-pointer pointer-events-auto"
                  onClick={() => handleNavClick(item)}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
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
