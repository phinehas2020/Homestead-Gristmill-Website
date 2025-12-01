import Client from 'shopify-buy';

const domain = import.meta.env.VITE_SHOPIFY_DOMAIN || 'mock-domain.myshopify.com';
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'mock-token';

console.log("Initializing Shopify Client with:", { domain, tokenPresent: !!token });

const client = Client.buildClient({
    domain,
    storefrontAccessToken: token,
    apiVersion: '2023-10'
});

export default client;
