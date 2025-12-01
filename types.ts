
export interface Product {
    id: number | string;
    name: string;
    description: string;
    price: number;
    image: string;
    weight: string;
    category: 'wheat' | 'rye' | 'corn' | 'goods' | string;
    variantId?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export type CursorVariant = 'default' | 'hover' | 'text';
