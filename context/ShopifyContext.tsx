import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import client from '../lib/shopify';

interface ShopifyContextType {
    products: any[];
    cart: any;
    isCartOpen: boolean;
    isMenuOpen: boolean;
    toggleCart: () => void;
    closeCart: () => void;
    openCart: () => void;
    toggleMenu: () => void;
    closeMenu: () => void;
    addToCart: (variantId: string, quantity: number) => Promise<void>;
    removeLineItem: (lineItemId: string) => Promise<void>;
    updateLineItem: (lineItemId: string, quantity: number) => Promise<void>;
    checkoutUrl: string | null;
}

const ShopifyContext = createContext<ShopifyContextType | undefined>(undefined);

export const useShopify = () => {
    const context = useContext(ShopifyContext);
    if (!context) {
        throw new Error('useShopify must be used within a ShopifyProvider');
    }
    return context;
};

interface ShopifyProviderProps {
    children: ReactNode;
}

export const ShopifyProvider: React.FC<ShopifyProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [cart, setCart] = useState<any>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Fetch all products
        console.log("Fetching products from Shopify...");
        client.product.fetchAll().then((products) => {
            console.log("Fetched products:", products);
            setProducts(products);
        }).catch(err => {
            console.error("Failed to fetch products:", err);
        });

        // Initialize cart
        const checkoutId = localStorage.getItem('checkout_id');
        if (checkoutId) {
            client.checkout.fetch(checkoutId).then((checkout) => {
                setCart(checkout);
            });
        } else {
            client.checkout.create().then((checkout) => {
                localStorage.setItem('checkout_id', checkout.id as string);
                setCart(checkout);
            });
        }
    }, []);

    const addToCart = async (variantId: string, quantity: number) => {
        if (!cart) return;

        const lineItemsToAdd = [
            {
                variantId,
                quantity: parseInt(quantity.toString(), 10),
            },
        ];

        const newCheckout = await client.checkout.addLineItems(cart.id, lineItemsToAdd);
        setCart(newCheckout);
        setIsCartOpen(true);
    };

    const removeLineItem = async (lineItemId: string) => {
        if (!cart) return;
        const newCheckout = await client.checkout.removeLineItems(cart.id, [lineItemId]);
        setCart(newCheckout);
    };

    const updateLineItem = async (lineItemId: string, quantity: number) => {
        if (!cart) return;
        const lineItemsToUpdate = [
            {
                id: lineItemId,
                quantity: parseInt(quantity.toString(), 10),
            },
        ];
        const newCheckout = await client.checkout.updateLineItems(cart.id, lineItemsToUpdate);
        setCart(newCheckout);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const closeCart = () => setIsCartOpen(false);
    const openCart = () => setIsCartOpen(true);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <ShopifyContext.Provider
            value={{
                products,
                cart,
                isCartOpen,
                isMenuOpen,
                toggleCart,
                closeCart,
                openCart,
                toggleMenu,
                closeMenu,
                addToCart,
                removeLineItem,
                updateLineItem,
                checkoutUrl: cart?.webUrl || null,
            }}
        >
            {children}
        </ShopifyContext.Provider>
    );
};
