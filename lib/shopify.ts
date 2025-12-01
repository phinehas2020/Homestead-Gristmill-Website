import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: import.meta.env.VITE_SHOPIFY_DOMAIN || 'mock-domain.myshopify.com',
    storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'mock-token',
    apiVersion: '2023-10'
});

export default client;
